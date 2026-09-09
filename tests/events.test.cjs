/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS test harness loads TypeScript without generating build files. */
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

const cache = new Map();
function load(name) {
  const file = path.resolve(__dirname, "../lib", name + ".ts");
  if (cache.has(file)) return cache.get(file).exports;
  const loadedModule = { exports: {} };
  cache.set(file, loadedModule);
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  vm.runInNewContext(code, {
    module: loadedModule, exports: loadedModule.exports, URLSearchParams, Date, Math, Object, Set, Map, Number, String, Array, JSON,
    require: id => id.startsWith(".") ? load(path.relative(path.resolve(__dirname, "../lib"), path.resolve(path.dirname(file), id))) : require(id),
  }, { filename: file });
  return loadedModule.exports;
}
const { isValidEventName, mapRowsToEvents, isValidProperties, isValidSessionId,
        MAX_PROPERTY_KEYS, MAX_VALUE_LENGTH, MAX_SESSION_ID_LENGTH } = load("events");
const { createRateLimiter } = load("rate-limit");

test("isValidEventName accepts every real event name", () => {
  const real = [
    "flow_started", "question_answered", "outcome_reached", "demand_checked",
    "readiness_checked", "bank_selected", "sheet_printed", "survey_answered",
    "landing_viewed", "actionable_result_viewed", "exported_to_email", "feedback_helpful",
  ];
  for (const name of real) assert.equal(isValidEventName(name), true, name);
});

test("isValidEventName rejects anything not in the list", () => {
  assert.equal(isValidEventName("made_up_event"), false);
  assert.equal(isValidEventName(""), false);
  assert.equal(isValidEventName("Flow_Started"), false); // case-sensitive, no silent coercion
});

test("mapRowsToEvents produces the shape aggregate() expects", () => {
  const rows = [
    {
      event: "actionable_result_viewed",
      session_id: "abc-123",
      properties: { resolution_source: "verdict", outcome: "nominee" },
      created_at: "2026-09-07T12:00:00.000Z",
    },
  ];
  const events = mapRowsToEvents(rows);
  assert.equal(events.length, 1);
  assert.equal(events[0].event, "actionable_result_viewed");
  assert.equal(events[0].properties.distinct_id, "abc-123");
  assert.equal(events[0].properties.resolution_source, "verdict");
  assert.equal(events[0].properties.outcome, "nominee");
  // Seconds since epoch, matching Mixpanel's own `time` property shape --
  // this is the exact contract lib/metrics.ts's timeOf() reads.
  assert.equal(events[0].properties.time, Math.floor(new Date(rows[0].created_at).getTime() / 1000));
});

test("mapRowsToEvents does not mutate the original properties object", () => {
  const original = { outcome: "nominee" };
  const rows = [{ event: "outcome_reached", session_id: "s1", properties: original, created_at: "2026-09-07T00:00:00.000Z" }];
  mapRowsToEvents(rows);
  assert.deepEqual(Object.keys(original), ["outcome"]);
});


/* ─── The /api/events write-side trust boundary (added 9 Sep 2026) ───
 *
 * /api/events is public and unauthenticated by necessity, so these
 * validators are the only thing bounding what one row can contain. They are
 * tested against the shapes a hostile caller would actually try, not only
 * the shapes our own client sends.
 */

test("isValidProperties accepts the real event shapes this app sends", () => {
  assert.ok(isValidProperties({}));
  assert.ok(isValidProperties({ branch: "new" }));
  assert.ok(isValidProperties({ resolution_source: "verdict", outcome: "nominee" }));
  assert.ok(isValidProperties({ helpful: true }));
  assert.ok(isValidProperties({ step: 3 }));
  assert.ok(isValidProperties({ believed_certificate_needed: "yes", outcome: "nominee" }));
});

test("isValidProperties rejects nesting, which is how a JSON dump would arrive", () => {
  assert.equal(isValidProperties({ nested: { a: 1 } }), false);
  assert.equal(isValidProperties({ list: [1, 2, 3] }), false);
  assert.equal(isValidProperties([{ a: 1 }]), false);
  assert.equal(isValidProperties(null), false);
  assert.equal(isValidProperties("a string"), false);
});

test("isValidProperties bounds row size: key count, key length, value length", () => {
  const tooManyKeys = {};
  for (let i = 0; i <= MAX_PROPERTY_KEYS; i++) tooManyKeys["k" + i] = "v";
  assert.equal(isValidProperties(tooManyKeys), false);

  assert.equal(isValidProperties({ ["k".repeat(65)]: "v" }), false);
  assert.equal(isValidProperties({ path: "x".repeat(MAX_VALUE_LENGTH + 1) }), false);
  assert.ok(isValidProperties({ path: "x".repeat(MAX_VALUE_LENGTH) }));
  assert.equal(isValidProperties({ "": "v" }), false);
});

test("isValidProperties rejects numbers JSON cannot represent", () => {
  assert.equal(isValidProperties({ n: NaN }), false);
  assert.equal(isValidProperties({ n: Infinity }), false);
  assert.ok(isValidProperties({ n: 0 }));
  assert.ok(isValidProperties({ n: -1.5 }));
});

test("isValidSessionId accepts a real UUID and rejects an unbounded string", () => {
  assert.ok(isValidSessionId("3f2504e0-4f89-11d3-9a0c-0305e82c3301"));
  assert.equal(isValidSessionId("x".repeat(MAX_SESSION_ID_LENGTH + 1)), false);
  assert.equal(isValidSessionId(""), false);
  assert.equal(isValidSessionId(undefined), false);
  assert.equal(isValidSessionId(123), false);
});

test("createRateLimiter allows up to the limit, then blocks", () => {
  const limited = createRateLimiter(3, 1000);
  assert.equal(limited("1.2.3.4", 0), false);
  assert.equal(limited("1.2.3.4", 0), false);
  assert.equal(limited("1.2.3.4", 0), false);
  assert.equal(limited("1.2.3.4", 0), true, "fourth call inside the window is blocked");
});

test("createRateLimiter keys are independent, so one caller cannot block another", () => {
  const limited = createRateLimiter(1, 1000);
  assert.equal(limited("a", 0), false);
  assert.equal(limited("a", 0), true);
  assert.equal(limited("b", 0), false, "a different IP has its own allowance");
});

test("createRateLimiter forgets hits once the window has passed", () => {
  const limited = createRateLimiter(1, 1000);
  assert.equal(limited("a", 0), false);
  assert.equal(limited("a", 500), true, "still inside the window");
  assert.equal(limited("a", 1001), false, "window elapsed, allowance restored");
});

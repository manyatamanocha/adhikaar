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
const { isValidEventName, mapRowsToEvents } = load("events");

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

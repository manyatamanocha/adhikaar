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
    module: loadedModule, exports: loadedModule.exports, require: id => require(id), Buffer,
  }, { filename: file });
  return loadedModule.exports;
}
const { signAdminToken, verifyAdminToken, safeEqual } = load("admin-auth");

const SECRET = "test-secret-do-not-use-in-prod";

test("a freshly signed token verifies against the same secret", () => {
  const token = signAdminToken(Date.now() + 60_000, SECRET);
  assert.equal(verifyAdminToken(token, SECRET), true);
});

test("an expired token is rejected", () => {
  const token = signAdminToken(Date.now() - 1000, SECRET);
  assert.equal(verifyAdminToken(token, SECRET), false);
});

test("verifying against the wrong secret is rejected", () => {
  const token = signAdminToken(Date.now() + 60_000, SECRET);
  assert.equal(verifyAdminToken(token, "a-different-secret"), false);
});

test("a tampered payload is rejected even with the right secret", () => {
  const token = signAdminToken(Date.now() + 60_000, SECRET);
  const [, sig] = token.split(".");
  const tampered = `${Date.now() + 999_999_999}.${sig}`;
  assert.equal(verifyAdminToken(tampered, SECRET), false);
});

test("a malformed token is rejected, not thrown on", () => {
  assert.equal(verifyAdminToken("not-a-real-token", SECRET), false);
  assert.equal(verifyAdminToken("", SECRET), false);
});

test("verification is pinned to an explicit clock, not wall-clock time", () => {
  const expiresAt = 1_000_000;
  const token = signAdminToken(expiresAt, SECRET);
  assert.equal(verifyAdminToken(token, SECRET, 999_999), true);
  assert.equal(verifyAdminToken(token, SECRET, 1_000_001), false);
});

test("safeEqual matches on equal strings, rejects on any difference", () => {
  assert.equal(safeEqual("abc", "abc"), true);
  assert.equal(safeEqual("abc", "abd"), false);
  assert.equal(safeEqual("abc", "abcd"), false);
  assert.equal(safeEqual("", ""), true);
});

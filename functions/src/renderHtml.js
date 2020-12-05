const mustache = require("mustache");
const assert = require("assert");
/**
 * テンプレート処理
 * @param {String} html Mustache形式HTML
 * @param {Object} param バインドする値
 */
module.exports = function (html = null, param = null) {
  // 必須チェック
  assert(html !== null, "引数htmlには値が必要。");
  assert(param !== null, "引数paramには値が必要。");
  // let result = mustache.render(html, param, {}, ["[[", "]]"]);
  let result = mustache.render(html, param);
  return result;
};

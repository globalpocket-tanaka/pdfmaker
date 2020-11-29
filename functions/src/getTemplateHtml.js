const fs = require("fs-extra");
const assert = require('assert');
const path = require("path");
/**
 * テンプレートHTMLの文字列を返す。
 * @param {String} templateId テンプレートのID
 */
module.exports = function (templateId=null) {
    // 必須チェック
    assert(templateId!=null,"引数templateIdには値が必要。");
    let templatePath = path.join(__dirname,"../template/", templateId + ".html");
    console.log(templatePath);
    assert(fs.existsSync(templatePath),"引数templateIdに該当するテンプレートは無い。");
    let result = fs.readFileSync(templatePath, 'utf8');
    return result;
}

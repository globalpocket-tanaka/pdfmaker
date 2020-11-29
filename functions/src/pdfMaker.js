const assert = require('assert');
const getTemplateHtml = require("./getTemplateHtml");
const renderHtml = require("./renderHtml");
const makePdf = require("./makePdf");
/**
 * PDFMakerのビジネスロジック。
 * @param {String} templateId テンプレートのID
 * @param {Object} param バインドする値
 * @param {Object} option PDF生成オプション
 */
module.exports = async function (templateId=null,param={},option={}) {
    // 必須チェック
    assert(templateId!=null,"引数templateIdには値が必要。");
    // テンプレートを取得
    let html = getTemplateHtml(templateId);
    // テンプレートからHTMLを作成
    html = renderHtml(html, param);
    // HTMLからPDFを作成
    let result = await makePdf(html,option);
    return result;
}
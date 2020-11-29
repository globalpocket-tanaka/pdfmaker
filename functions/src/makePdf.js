const puppeteer = require('puppeteer');
const assert = require('assert');
/**
 * ヘッドレスChromeでPDF作成
 * @param {String} html HTML文字列（外部参照なし）
 * @param {Object} option PDF生成オプション
 */
module.exports = async function (html=null,option={}) {
    // 必須チェック
    assert(html!=null,"引数htmlには値が必要。");
    const browser = await puppeteer.launch({
        // headless: false,
        slowMo: 300,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(html);
    // PDF作成処理
    option.printBackground = true;
    let result = await page.pdf(option);
    browser.close();
    return result;
}
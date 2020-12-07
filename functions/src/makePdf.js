const assert = require("assert");
const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer");
const path = require("path");
/**
 * ヘッドレスChromeでPDF作成
 * @param {String} html HTML文字列（外部参照なし）
 * @param {Object} option PDF生成オプション
 */
module.exports = async function (html = null, option = {}) {
  // 必須チェック
  assert(html !== null, "引数htmlには値が必要。");
  let fontDirPath = path.join(__dirname, "../fonts/");
  await chromium.font(path.join(fontDirPath, "NotoColorEmoji.ttf"));
  await chromium.font(path.join(fontDirPath, "NotoSansCJKjp-Regular.ttf"));
  let exePath = await chromium.executablePath;
  console.log(exePath);
  let browser = await puppeteer.launch({
    ignoreDefaultArgs: ["--disable-extensions"],
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: exePath,
    headless: true,
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();
  await page.setContent(html);
  // PDF作成処理
  let result = await page.pdf(option);
  browser.close();
  return result;
};

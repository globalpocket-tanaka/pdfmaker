const assert = require("assert");
const chromium = require("chrome-aws-lambda");
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
  await chromium.font(path.join(fontDirPath, "NNotoSansCJKjp-Regular.ttf"));
  let browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();
  await page.setContent(html);
  // PDF作成処理
  option.printBackground = true;
  let result = await page.pdf(option);
  browser.close();
  return result;
};

const assert = require("assert");
const chromium = require("chrome-aws-lambda");
const origin_puppeteer = require("puppeteer");
const path = require("path");
/**
 * ヘッドレスChromeでPDF作成
 * @param {String} html HTML文字列（外部参照なし）
 * @param {Object} option PDF生成オプション
 * @param {Boolean} isChromium Chromium を使うか。
 */
module.exports = async function (html = null, option = {}, isChromium = false) {
  // 必須チェック
  assert(html !== null, "引数htmlには値が必要。");
  let puppeteer = null;
  if (chromium.headless || isChromium) {
    puppeteer = chromium.puppeteer;
  } else {
    puppeteer = origin_puppeteer;
  }
  let exePath = await chromium.executablePath;
  // console.log(exePath);
  let browser = await puppeteer.launch({
    // ignoreDefaultArgs: ["--disable-extensions"],
    args: [
      ...chromium.args,
      "--disable-web-security",
      "--lang=ja",
      "--disable-web-security",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-first-run",
      "--no-sandbox",
      "--no-zygote",
      "--single-process",
    ],
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

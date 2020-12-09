const assert = require("assert");
const functions = require("firebase-functions");
const runtimeOpts = {
  timeoutSeconds: 10,
  memory: "1GB",
};
/**
 * 渡された情報からPDFを作成してbase64文字列で返します。
 * @param {String} templateId テンプレートのID
 * @param {Object} param テンプレートにバインドする値
 * @param {Object} option PDF生成オプション
 */
exports.pdfMaker = functions
  .runWith(runtimeOpts)
  .region("asia-northeast1")
  .https.onCall(async (data, context) => {
    ////////////////////////////////////////////
    // 準備
    ////////////////////////////////////////////
    assert(data, "dataパラメータがありません。");
    assert(data.templateId, "templateIdパラメータがありません。");
    assert(data.param, "paramパラメータがありません。");
    let templateId = data.templateId;
    let param = data.param;
    let option = data.option
      ? data.option
      : {
          format: "A4",
          scale: 1,
          printBackground: true,
          displayHeaderFooter: false,
          margin: {
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
          },
        };
    ////////////////////////////////////////////
    // HTMLからPDFを作成
    ////////////////////////////////////////////
    const pdfMaker = require("./src/pdfMaker");
    try {
      let result = await pdfMaker(templateId, param, option);
      functions.logger.info("pdfmaker Finish!", { structuredData: true });
      return result;
    } catch (error) {
      functions.logger.info("pdfmaker Failed!", { structuredData: true });
      functions.logger.error(error);
      throw error;
    }
  });

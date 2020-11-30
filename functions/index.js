const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.pdfMaker = functions.region("asia-northeast1").https.onRequest((request, response) => {
  ////////////////////////////////////////////
  // 準備
  ////////////////////////////////////////////
  let templateId = request.body["templateId"] ? request.body["templateId"] : null;
  let param = request.body["param"] ? request.body["param"] : {};
  let option = request.body["option"] ? request.body["option"] : {};
  ////////////////////////////////////////////
  // HTMLからPDFを作成して結果を返す
  ////////////////////////////////////////////
  const pdfMaker = require("./src/pdfMaker");
  pdfMaker(templateId, param, option)
    .then((result) => {
      response.send(result);
      functions.logger.info("pdfmaker Finish!", { structuredData: true });
      return null;
    })
    .catch((error) => {
      functions.logger.info("pdfmaker Failed!", { structuredData: true });
      functions.logger.error(error);
      // response.error(500);
      response.send(result);
      return null;
    });
});

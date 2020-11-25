const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.rirekisho = functions.https.onRequest((request, response) => {
    functions.logger.info("rirekisho Start!", {structuredData: true});

    ////////////////////////////////////////////
    // テンプレート処理
    ////////////////////////////////////////////
    let html = request.body['template'];
    let param = request.body['param'];
    html = mustache.render(html, param);  

    ////////////////////////////////////////////
    // ヘッドレスChromeでPDF作成
    ////////////////////////////////////////////
    let option = request.body['option'];
    option.printBackground = true;
    puppeteer.launch({
        // headless: false,
        slowMo: 300,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    }).then(async (browser) => {
        ////////////////////////////////////////////
        // 完了時
        ////////////////////////////////////////////
        const page = await browser.newPage();
        await page.setContent(html);
        // PDF作成処理
        let result = await page.pdf(option);
        browser.close();
        response.send(result);
        functions.logger.info("rirekisho Finish!", {structuredData: true});
    });
});

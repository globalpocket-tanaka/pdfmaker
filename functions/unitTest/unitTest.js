/* eslint-env mocha */
/* eslint-disable */
/**
 * functions/src内の自動テストを行う。
 */
/// 共通変数 //////////////////////////////////////////////////////////////
const assert = require("assert");
const fs = require("fs-extra");
const path = require("path");
const sharp = require("sharp");
const puppeteer = require("puppeteer");
const projectRootDir = path.join(__dirname, "../../");
const outPutDirPath = path.join(projectRootDir, ".out/");
const functionsSrcDir = path.join(projectRootDir, "functions/src/");
let targetFileName = "";
/////////////////////////////////////////////////////////////////////////
targetFileName = "getTemplateHtml";
describe(targetFileName, () => {
  /// テスト対象 ////////////////////
  let target = require(path.join(functionsSrcDir, targetFileName));
  /// テスト処理 ////////////////////
  it("引数なし", (done) => {
    try {
      target();
    } catch (error) {
      assert(error.message === "引数templateIdには値が必要。", "想定外の例外");
      done();
    }
  });
  /// テスト処理 ココまで /////////////
  /// テスト処理 ////////////////////
  it("引数templateIdに該当なし", (done) => {
    try {
      target("_");
    } catch (error) {
      assert(error.message === "引数templateIdに該当するテンプレートは無い。", "想定外の例外");
      done();
    }
  });
  /// テスト処理 ココまで /////////////
  /// テスト処理 ////////////////////
  it("正常系テスト", (done) => {
    let result = target("unitTest/1");
    assert(result === "UnitTest{{result}}\n", "想定外の例外");
    done();
  });
  /// テスト処理 ココまで /////////////
});
/////////////////////////////////////////////////////////////////////////
targetFileName = "makePdf";
describe(targetFileName, () => {
  /// テスト対象 ////////////////////
  let target = require(path.join(functionsSrcDir, targetFileName));
  /// テスト処理 ////////////////////
  it("引数なし", (done) => {
    target().catch((error) => {
      assert(error.message === "引数htmlには値が必要。", "想定外の例外");
      done();
    });
  });
  /// テスト処理 ココまで /////////////
  /// テスト処理 ////////////////////
  it("引数htmlのみ", (done) => {
    target("<html><body>TEST</body></html>")
      .then((result) => {
        assert(result);
      })
      .then(done, done);
  });
  /// テスト処理 ココまで /////////////
  /// テスト処理 ////////////////////
  it("引数全部あり", (done) => {
    target("<html><body>TEST</body></html>", {})
      .then((result) => {
        assert(result);
      })
      .then(done, done);
  });
  /// テスト処理 ココまで /////////////
});
/////////////////////////////////////////////////////////////////////////
targetFileName = "renderHtml";
describe(targetFileName, () => {
  /// テスト対象 ////////////////////
  let target = require(path.join(functionsSrcDir, targetFileName));
  /// テスト処理 ////////////////////
  it("引数なし", (done) => {
    try {
      target();
    } catch (error) {
      assert(error.message === "引数htmlには値が必要。", "想定外の例外");
      done();
    }
  });
  /// テスト処理 ココまで /////////////
  /// テスト処理 ////////////////////
  it("引数htmlのみ", (done) => {
    try {
      target("<html><body>{{message}}</body></html>");
    } catch (error) {
      assert(error.message === "引数paramには値が必要。", "想定外の例外");
      done();
    }
  });
  /// テスト処理 ココまで /////////////
  /// テスト処理 ////////////////////
  it("引数paramにプロパティなし", (done) => {
    let result = target("<html><body>{{message}}</body></html>", {});
    assert(result === "<html><body></body></html>");
    done();
  });
  /// テスト処理 ココまで /////////////
  /// テスト処理 ////////////////////
  it("引数全部あり", (done) => {
    let result = target("<html><body>{{message}}</body></html>", {
      message: "hoge",
    });
    assert(result === "<html><body>hoge</body></html>");
    done();
  });
  /// テスト処理 ココまで /////////////
});
/////////////////////////////////////////////////////////////////////////
targetFileName = "toJpgByImageBuffer";
describe(targetFileName, () => {
  /// テスト対象 ////////////////////
  let target = require(path.join(functionsSrcDir, targetFileName));
  /// テスト処理 ////////////////////
  it("引数なし", (done) => {
    target().catch((error) => {
      assert(error.message === "引数bufferには値が必要。", "想定外の例外");
      done();
    });
  });
  /// テスト処理 ココまで /////////////
  /// テスト処理 ////////////////////
  it("jpeg", (done) => {
    let imgPath = path.join(__dirname, "syoumeisyashin_woman.jpg");
    let buffer = fs.readFileSync(imgPath);
    target(buffer)
      .then((result) => {})
      .then(done, done);
  });
  /// テスト処理 ココまで /////////////
  /// テスト処理 ////////////////////
  it("png", (done) => {
    let imgPath = path.join(__dirname, "syoumeisyashin_man.png");
    let buffer = fs.readFileSync(imgPath);
    target(buffer)
      .then((result) => {})
      .then(done, done);
  });
  /// テスト処理 ココまで /////////////
  /// テスト処理 ////////////////////
  it("heic", (done) => {
    let imgPath = path.join(__dirname, "iphone_photo.heic");
    let buffer = fs.readFileSync(imgPath);
    target(buffer)
      .then((result) => {})
      .then(done, done);
  });
  /// テスト処理 ココまで /////////////
});
/////////////////////////////////////////////////////////////////////////
targetFileName = "pdfMaker";
describe(targetFileName, () => {
  /// テスト対象 ////////////////////
  let target = require(path.join(functionsSrcDir, targetFileName));
  fs.mkdirSync(outPutDirPath, { recursive: true });
  /// テスト処理 ////////////////////
  it("引数なし", (done) => {
    target().catch((error) => {
      assert(error.message === "引数templateIdには値が必要。", "想定外の例外");
      done();
    });
  });
  /// テスト処理 ココまで /////////////
  /// テスト処理 ////////////////////
  it("引数templateIdのみ", (done) => {
    target("unitTest/2")
      .then((result) => {
        assert(result);
        var decode = Buffer(result, "base64");
        fs.writeFile(outPutDirPath + "引数templateIdのみ.pdf", decode);
      })
      .then(done, done);
  });
  /// テスト処理 ココまで /////////////
  /// テスト処理 ////////////////////
  it("paramあり", (done) => {
    target("unitTest/2", { result: "成功！👍" })
      .then((result) => {
        assert(result);
        var decode = Buffer(result, "base64");
        fs.writeFile(outPutDirPath + "paramあり.pdf", decode);
      })
      .then(done, done);
  });
  /// テスト処理 ココまで /////////////
  /// テスト処理 ////////////////////
  it("オプションあり", (done) => {
    target("unitTest/2", { result: "成功！👍" }, { format: "A4" })
      .then((result) => {
        assert(result);
        var decode = Buffer(result, "base64");
        fs.writeFile(outPutDirPath + "オプションあり.pdf", decode);
      })
      .then(done, done);
  });
  /// テスト処理 ココまで /////////////
});
/////////////////////////////////////////////////////////////////////////
/**
 * テンプレートテスト。pdfMakerの結合テスト。テンプレートからPDFを作成する。
 */
function testTemplate(templateFileName) {
  /// テスト対象のパス
  let funcPdfMakerPath = path.join(functionsSrcDir, "pdfMaker");
  let funcPdfMaker = require(funcPdfMakerPath);
  let paramPath = path.join(projectRootDir, "public/default_param", templateFileName + ".json");
  let param = require(paramPath);
  describe(templateFileName, () => {
    /// テスト処理 ////////////////////
    it(templateFileName, (done) => {
      funcPdfMaker(templateFileName, param.param, param.option)
        .then((result) => {
          assert(result);
          var decode = Buffer(result, "base64");
          fs.writeFile(outPutDirPath + templateFileName + ".pdf", decode);
        })
        .then(done, done);
    });
  });
}
/////////////////////////////////////////////////////////////////////////
/// テンプレートテスト
testTemplate("rirekisho/1");
/////////////////////////////////////////////////////////////////////////
/// テンプレートテスト
testTemplate("rirekisho/a4_jis");
/////////////////////////////////////////////////////////////////////////

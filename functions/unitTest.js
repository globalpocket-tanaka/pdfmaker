/* eslint-env mocha */
const assert = require("assert");
const fs = require("fs-extra");
const path = require("path");
const sharp = require("sharp");
describe("getTemplateHtml", () => {
  let target = require("./src/getTemplateHtml");
  it("引数なし", (done) => {
    try {
      target();
    } catch (error) {
      assert(error.message === "引数templateIdには値が必要。", "想定外の例外");
      done();
    }
  });
  it("引数templateIdに該当なし", (done) => {
    try {
      target("_");
    } catch (error) {
      assert(error.message === "引数templateIdに該当するテンプレートは無い。", "想定外の例外");
      done();
    }
  });
  it("正常系テスト", (done) => {
    let result = target("unitTest/1");
    assert(result === "UnitTest{{result}}\n", "想定外の例外");
    done();
  });
});
describe("makePdf", () => {
  let target = require("./src/makePdf");
  it("引数なし", (done) => {
    target().catch((error) => {
      assert(error.message === "引数htmlには値が必要。", "想定外の例外");
      done();
    });
  });
  it("引数htmlのみ", (done) => {
    target("<html><body>TEST</body></html>")
      .then((result) => {
        assert(result);
      })
      .then(done, done);
  });
  it("引数全部あり", (done) => {
    target("<html><body>TEST</body></html>", {})
      .then((result) => {
        assert(result);
      })
      .then(done, done);
  });
});
describe("renderHtml", () => {
  let target = require("./src/renderHtml");
  it("引数なし", (done) => {
    try {
      target();
    } catch (error) {
      assert(error.message === "引数htmlには値が必要。", "想定外の例外");
      done();
    }
  });
  it("引数htmlのみ", (done) => {
    try {
      target("<html><body>{{message}}</body></html>");
    } catch (error) {
      assert(error.message === "引数paramには値が必要。", "想定外の例外");
      done();
    }
  });
  it("引数paramにプロパティなし", (done) => {
    let result = target("<html><body>{{message}}</body></html>", {});
    assert(result === "<html><body></body></html>");
    done();
  });
  it("引数全部あり", (done) => {
    let result = target("<html><body>{{message}}</body></html>", {
      message: "hoge",
    });
    assert(result === "<html><body>hoge</body></html>");
    done();
  });
});
describe("pdfMaker", () => {
  let target = require("./src/pdfMaker");
  let outPutDirPath = ".out/";
  fs.mkdirSync(outPutDirPath, { recursive: true });
  it("引数なし", (done) => {
    target().catch((error) => {
      assert(error.message === "引数templateIdには値が必要。", "想定外の例外");
      done();
    });
  });
  it("引数templateIdのみ", (done) => {
    target("unitTest/2")
      .then((result) => {
        assert(result);
        fs.writeFile(outPutDirPath + "引数templateIdのみ.pdf", result);
      })
      .then(done, done);
  });
  it("paramあり", (done) => {
    target("unitTest/2", { result: "成功！👍" })
      .then((result) => {
        assert(result);
        fs.writeFile(outPutDirPath + "paramあり.pdf", result);
      })
      .then(done, done);
  });
  it("オプションあり", (done) => {
    target("unitTest/2", { result: "成功！👍" }, { format: "A4" })
      .then((result) => {
        assert(result);
        fs.writeFile(outPutDirPath + "オプションあり.pdf", result);
      })
      .then(done, done);
  });
  it("rirekisho1", (done) => {
    let paramPath = path.join(__dirname, "template/rirekisho/1.test.json");
    let param = require(paramPath);
    target("rirekisho/1", param, {
      format: "A4",
      scale: 1,
      printBackground: true,
      displayHeaderFooter: false,
      // margin: 0,
      margin: {
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
      },
    })
      .then((result) => {
        assert(result);
        fs.writeFile(outPutDirPath + "rirekisho1.pdf", result);
      })
      .then(done, done);
  });
});
describe("toBase64ByBuffer", () => {
  let target = require("./src/toBase64ByBuffer");
  it("引数なし", (done) => {
    target().catch((error) => {
      assert(error.message === "引数inBufferには値が必要。", "想定外の例外");
      done();
    });
  });
  it("jpeg", (done) => {
    let imgPath = path.join(__dirname, "test/syoumeisyashin_woman.jpg");
    let buffer = fs.readFileSync(imgPath);
    target(buffer)
      .then((result) => {})
      .then(done, done);
  });
  it("png", (done) => {
    let imgPath = path.join(__dirname, "test/syoumeisyashin_man.png");
    let buffer = fs.readFileSync(imgPath);
    target(buffer)
      .then((result) => {})
      .then(done, done);
  });
  it("heic", (done) => {
    let imgPath = path.join(__dirname, "test/iphone_photo.heic");
    let buffer = fs.readFileSync(imgPath);
    target(buffer)
      .then((result) => {})
      .then(done, done);
  });
});

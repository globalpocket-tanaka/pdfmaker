/* eslint-env mocha */
const assert = require('assert');
describe("getTemplateHtml", () => {
    let target = require('./src/getTemplateHtml');
    it('引数なし', done => {
        try{
            target();
        }catch(error){
            assert(error.message==="引数templateIdには値が必要。","想定外の例外");
            done();
        }
    });
    it('引数templateIdに該当なし', done => {
        try{
            target("_");
        }catch(error){
            assert(error.message==="引数templateIdに該当するテンプレートは無い。","想定外の例外");
            done();
        }
    });
    it('正常系テスト', done => {
        let result = target('unitTest');
        assert(result==="UnitTest{{result}}","想定外の例外");
        done();
    });
});
describe("makePdf", () => {
    let target = require('./src/makePdf');
    it('引数なし', done => {
        target().catch(error => {
            assert(error.message==="引数htmlには値が必要。","想定外の例外");
            done();
        });
    });
    it('引数htmlのみ', done => {
        target('<html><body>TEST</body></html>').then(result => {
            assert(result);
        }).then(done, done);
    });
    it('引数全部あり', done => {
        target('<html><body>TEST</body></html>',{}).then(result => {
            assert(result);
        }).then(done, done);
    });
});
describe("renderHtml", () => {
    let target = require('./src/renderHtml');
    it('引数なし', done => {
        try{
            target();
        }catch(error){
            assert(error.message==="引数htmlには値が必要。","想定外の例外");
            done();
        }
    });
    it('引数htmlのみ', done => {
        try{
            target('<html><body>{{message}}</body></html>');
        }catch(error){
            assert(error.message==="引数paramには値が必要。","想定外の例外");
            done();
        }
    });
    it('引数paramにプロパティなし', done => {
        let result = target('<html><body>{{message}}</body></html>',{});
        assert(result==='<html><body></body></html>');
        done();
    });
    it('引数全部あり', done => {
        let result = target('<html><body>{{message}}</body></html>',{message:"hoge"});
        assert(result==='<html><body>hoge</body></html>');
        done();
    });
});
describe("pdfMaker", () => {
    let target = require('./src/pdfMaker');
    it('引数なし', done => {
        target().catch(error => {
            assert(error.message==="引数templateIdには値が必要。","想定外の例外");
            done();
        });
    });
    it('引数templateIdのみ', done => {
        target('unitTest').then(result => {
            assert(result);
        }).then(done, done);
    });
    it('paramあり', done => {
        target('unitTest',{result:"Success"}).then(result => {
            assert(result);
        }).then(done, done);
    });
    it('オプションあり', done => {
        target('unitTest',{result:"Success"},{format: 'A4'}).then(result => {
            assert(result);
        }).then(done, done);
    });
});
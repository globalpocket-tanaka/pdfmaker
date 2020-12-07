/**
 * 非推奨
 */
const assert = require("assert");
const sharp = require("sharp");
const convert = require("heic-convert");
module.exports = async function (inBuffer = null) {
  assert(inBuffer !== null, "引数inBufferには値が必要。");
  try {
    inBuffer = await sharp(inBuffer).toFormat("png").toBuffer();
    let result = inBuffer.toString("base64");
    return result;
  } catch (e) {
    console.log(e);
    inBuffer = await convert({
      buffer: inBuffer, // the HEIC file buffer
      format: "JPEG", // output format
      quality: 1, // the jpeg compression quality, between 0 and 1
    });
    // let buffer = await sharp(inBuffer).toFormat("png").toBuffer();
    let result = inBuffer.toString("base64");
    return result;
  }
};

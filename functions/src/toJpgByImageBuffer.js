const assert = require("assert");
const sharp = require("sharp");
const convert = require("heic-convert");
/**
 * 画像BufferをJPEG形式のBufferに変換します。
 * @param {Buffer} buffer 画像のBuffer
 */
module.exports = async function (buffer = null) {
  assert(buffer !== null, "引数bufferには値が必要。");
  try {
    buffer = await sharp(buffer).toFormat("jpg").toBuffer();
    let result = buffer.toString("base64");
    return result;
  } catch (e) {
    // console.log(e);
    buffer = await convert({
      buffer: buffer, // the HEIC file buffer
      format: "JPEG", // output format
      quality: 1, // the jpeg compression quality, between 0 and 1
    });
    return buffer;
  }
};

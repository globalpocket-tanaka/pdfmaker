/**
 * Base64とMIMEコンテンツタイプを指定してファイルをダウンロードする。
 *
 * @param {String} base64 Base64の文字列
 * @param {String} mime MIMEコンテンツタイプの文字列
 * @param {String} fileName ファイル名の文字列
 */
function doDownloadFileByBase64(base64, mime, fileName) {
  let atag = document.createElement("a");
  atag.style.display = "none";
  atag.href = `data:${mime};base64,${base64}`;
  atag.download = fileName;
  atag.click();
  atag.remove();
}

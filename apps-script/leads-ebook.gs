// Recebe os leads da landing do e-book e grava uma linha por lead na aba "Leads Ebook".
// Publicar como app da web: Executar como "Eu", acesso "Qualquer pessoa".
var SHEET_NAME = "Leads Ebook";

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    var p = e.parameter;
    // Colunas da aba: Nome | Email | Numero
    sheet.appendRow([p.nome || "", p.email || "", "'" + (p.whatsapp || "")]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

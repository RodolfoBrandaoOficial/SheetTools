function convertBase64ToImages() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getRange("A2:B").getValues();
  var folderName = "base64automacaoestoque"; // Nome da pasta no Google Drive

  // Obtenha a pasta no Google Drive
  var folders = DriveApp.getFoldersByName(folderName);
  var folder;
  if (folders.hasNext()) {
    folder = folders.next();
  } else {
    folder = DriveApp.createFolder(folderName);
  }

  for (var i = 0; i < data.length; i++) {
    var base64Value = data[i][0];
    var assValue = data[i][1];

    if (base64Value && !assValue) {
      // Remove "data:image/png;base64," from the base64 string
      var base64Data = base64Value.replace("data:image/png;base64,", "");

      // Decode the base64 string to bytes
      var imageBytes = Utilities.base64Decode(base64Data);

      // Create a blob from the bytes
      var blob = Utilities.newBlob(imageBytes, "image/png");

      // Create a file in Google Drive with a sequential name
      var imageName = "image_" + (i + 2) + ".png"; // i + 2 para compensar o deslocamento
      folder.createFile(blob.setName(imageName));
      
      // Get the URL of the image
      var imageUrl = folder.getFilesByName(imageName).next().getUrl();

      // Update the cell in the "Ass" column with the image URL
      sheet.getRange(i + 2, 2).setValue(imageUrl);
    }
  }
}

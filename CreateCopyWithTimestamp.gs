function makeCopy() {

// generates the timestamp and stores in variable formattedDate as year-month-date hour-minute-second
var formattedDate = Utilities.formatDate(new Date(), "GMT", "yyyy-MM-dd' 'HH:mm:ss");

// gets the name of the original file and appends the word "copy" followed by the timestamp stored in formattedDate
var name = SpreadsheetApp.getActiveSpreadsheet().getName() + " Copy " + formattedDate;

// gets the destination folder by their ID. REPLACE xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx with your folder's ID that you can get by opening the folder in Google Drive and checking the URL in the browser's address bar
var destination = DriveApp.getFolderById("1r0_NPrjbWwhq_TXoZkQvn74RF549WroD");

// gets the current Google Sheet file
var file = DriveApp.getFileById(SpreadsheetApp.getActiveSpreadsheet().getId())

// makes copy of "file" with "name" at the "destination"
file.makeCopy(name, destination);
}

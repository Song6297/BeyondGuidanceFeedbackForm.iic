// Google Apps Script for Workshop Feedback Form
// This script receives form data and saves it to Google Sheets

function doPost(e) {
  try {
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);
    
    // Get current timestamp
    var timestamp = new Date();
    
    // Prepare row data
    var rowData = [
      timestamp,
      data.q1 || '',           // Overall satisfaction
      data.q2 || '',           // Met expectations
      data.q2_explanation || '', // Explanation
      data.q3 || '',           // Relevance to goals
      data.q4 || '',           // Most useful session
      data.q5 || '',           // Facilitator rating
      data.q6 || '',           // Engaging and interactive
      data.q7 || '',           // Confidence to apply
      data.q8 || '',           // Biggest takeaway
      data.q9 || '',           // Improvements
      data.q10 || ''           // Would recommend
    ];
    
    // Append the row to the sheet
    sheet.appendRow(rowData);
    
    // Get the last row number
    var lastRow = sheet.getLastRow();
    
    // Format the new row
    var dataRange = sheet.getRange(lastRow, 1, 1, rowData.length);
    dataRange.setBorder(true, true, true, true, true, true, '#e0e0e0', SpreadsheetApp.BorderStyle.SOLID);
    dataRange.setVerticalAlignment('middle');
    dataRange.setWrap(true);
    
    // Center align rating columns
    sheet.getRange(lastRow, 2).setHorizontalAlignment('center'); // Q1
    sheet.getRange(lastRow, 3).setHorizontalAlignment('center'); // Q2
    sheet.getRange(lastRow, 5).setHorizontalAlignment('center'); // Q3
    sheet.getRange(lastRow, 7).setHorizontalAlignment('center'); // Q5
    sheet.getRange(lastRow, 8).setHorizontalAlignment('center'); // Q6
    sheet.getRange(lastRow, 9).setHorizontalAlignment('center'); // Q7
    sheet.getRange(lastRow, 12).setHorizontalAlignment('center'); // Q10
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        'result': 'success',
        'message': 'Feedback submitted successfully!'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        'result': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function to verify the script works
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'Apps Script is working!'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Function to set up the spreadsheet headers (run this once)
function setupSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Set sheet name
  sheet.setName('Workshop Feedback Responses');
  
  // Set up headers
  var headers = [
    'Timestamp',
    'Q1: Overall Satisfaction (1-5)',
    'Q2: Met Expectations',
    'Q2: Explanation',
    'Q3: Relevance (1-5)',
    'Q4: Most Useful Session',
    'Q5: Facilitator Rating (1-5)',
    'Q6: Engaging & Interactive',
    'Q7: Confidence to Apply',
    'Q8: Biggest Takeaway',
    'Q9: Improvements',
    'Q10: Would Recommend'
  ];
  
  // Clear existing content and set headers
  sheet.clear();
  sheet.appendRow(headers);
  
  // Format header row
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#10b981');
  headerRange.setFontColor('#ffffff');
  headerRange.setFontSize(11);
  headerRange.setHorizontalAlignment('center');
  headerRange.setVerticalAlignment('middle');
  headerRange.setWrap(true);
  
  // Add borders to header
  headerRange.setBorder(true, true, true, true, true, true, '#1a1a1a', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
  
  // Set column widths
  sheet.setColumnWidth(1, 180);  // Timestamp
  sheet.setColumnWidth(2, 150);  // Q1
  sheet.setColumnWidth(3, 150);  // Q2
  sheet.setColumnWidth(4, 300);  // Q2 Explanation
  sheet.setColumnWidth(5, 150);  // Q3
  sheet.setColumnWidth(6, 300);  // Q4
  sheet.setColumnWidth(7, 150);  // Q5
  sheet.setColumnWidth(8, 150);  // Q6
  sheet.setColumnWidth(9, 150);  // Q7
  sheet.setColumnWidth(10, 300); // Q8
  sheet.setColumnWidth(11, 300); // Q9
  sheet.setColumnWidth(12, 150); // Q10
  
  // Freeze header row
  sheet.setFrozenRows(1);
  
  // Set row height for header
  sheet.setRowHeight(1, 50);
  
  // Add alternating row colors (set up for future rows)
  var rule1 = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=MOD(ROW(),2)=0')
    .setBackground('#f5f1e8')
    .setRanges([sheet.getRange('A2:L1000')])
    .build();
  
  var rules = sheet.getConditionalFormatRules();
  rules.push(rule1);
  sheet.setConditionalFormatRules(rules);
  
  Logger.log('Sheet setup complete with table formatting!');
}

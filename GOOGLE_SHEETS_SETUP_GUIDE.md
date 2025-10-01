# Google Sheets Integration Setup Guide
## Workshop Feedback Form - Beyond Guidance

Follow these steps to connect your feedback form to Google Sheets.

---

## 📋 Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"+ Blank"** to create a new spreadsheet
3. Name it: **"Workshop Feedback - Beyond Guidance"**
4. Keep this tab open

---

## 🔧 Step 2: Open Apps Script Editor

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. A new tab will open with the Apps Script editor
3. You'll see a default `Code.gs` file

---

## 📝 Step 3: Add the Script Code

1. **Delete** all the default code in `Code.gs`
2. **Copy** all the code from the file `google-apps-script.js` (in your project folder)
3. **Paste** it into the Apps Script editor
4. Click the **Save** icon (💾) or press `Ctrl+S`
5. Name your project: **"Feedback Form Handler"**

---

## 🎯 Step 4: Set Up the Sheet Headers

1. In the Apps Script editor, find the function dropdown (top toolbar)
2. Select **`setupSheet`** from the dropdown
3. Click the **Run** button (▶️)
4. **First time only**: You'll see an authorization prompt:
   - Click **"Review permissions"**
   - Choose your Google account
   - Click **"Advanced"** → **"Go to Feedback Form Handler (unsafe)"**
   - Click **"Allow"**
5. Go back to your Google Sheet tab
6. You should now see formatted headers in row 1:
   - Timestamp
   - Q1: Overall Satisfaction (1-5)
   - Q2: Met Expectations
   - Q2: Explanation
   - Q3: Relevance (1-5)
   - Q4: Most Useful Session
   - Q5: Facilitator Rating (1-5)
   - Q6: Engaging & Interactive
   - Q7: Confidence to Apply
   - Q8: Biggest Takeaway
   - Q9: Improvements
   - Q10: Would Recommend

---

## 🚀 Step 5: Deploy as Web App

1. In the Apps Script editor, click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **"Web app"**
4. Configure the deployment:
   - **Description**: "Feedback Form v1"
   - **Execute as**: **Me** (your email)
   - **Who has access**: **Anyone**
5. Click **Deploy**
6. **Copy the Web App URL** that appears (it looks like: `https://script.google.com/macros/s/...../exec`)
7. Click **Done**

---

## 🔗 Step 6: Connect Your Form to Google Sheets

1. Open the file: `c:\Users\yasee\BGFEED\script.js`
2. Find line 283 (around line 283):
   ```javascript
   const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Replace `'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'` with your Web App URL:
   ```javascript
   const scriptURL = 'https://script.google.com/macros/s/YOUR_ACTUAL_URL/exec';
   ```
4. **Save the file** (`Ctrl+S`)

---

## ✅ Step 7: Test the Form

1. Open `index.html` in your browser
2. Fill out the feedback form completely
3. Click **"Submit Feedback"**
4. Wait for the success message
5. Go back to your Google Sheet
6. **Refresh the page** (F5)
7. You should see a new row with:
   - Current timestamp
   - All your form responses

---

## 📊 What Gets Saved

Each form submission creates a new row with:

| Column | Data |
|--------|------|
| A | Timestamp (automatic) |
| B | Q1: Overall satisfaction rating (1-5) |
| C | Q2: Met expectations (Yes/No/Partially) |
| D | Q2: Explanation (optional text) |
| E | Q3: Relevance rating (1-5) |
| F | Q4: Most useful session (optional text) |
| G | Q5: Facilitator rating (1-5) |
| H | Q6: Engaging & interactive (Yes/No/Somewhat) |
| I | Q7: Confidence to apply (Yes/No/Not sure) |
| J | Q8: Biggest takeaway (optional text) |
| K | Q9: Improvements (optional text) |
| L | Q10: Would recommend (Yes/No/Maybe) |

---

## 🔒 Security & Privacy

- ✅ Data is stored in your Google account
- ✅ Only you can access the spreadsheet
- ✅ The script runs under your permissions
- ✅ No third-party services involved
- ✅ HTTPS encrypted transmission

---

## 🛠️ Troubleshooting

### Problem: Form submits but no data in sheet
**Solution:**
1. Check if the Web App URL is correct in `script.js`
2. Make sure you deployed as "Anyone" can access
3. Check the Apps Script execution logs:
   - Apps Script editor → **Executions** (left sidebar)

### Problem: Authorization error
**Solution:**
1. Re-run the `setupSheet` function
2. Complete the authorization process again
3. Make sure you clicked "Allow" for all permissions

### Problem: Old data not showing
**Solution:**
1. Refresh your Google Sheet (F5)
2. Check if you're looking at the correct sheet tab

### Problem: Form shows success but data is wrong
**Solution:**
1. Check the field names in the Apps Script match the HTML form
2. Verify all `name` attributes in the HTML form

---

## 📱 Viewing Responses

### On Desktop:
- Open your Google Sheet anytime
- Data updates in real-time
- Use filters and sorting to analyze responses

### On Mobile:
- Download the **Google Sheets app**
- Sign in with your Google account
- Open "Workshop Feedback - Beyond Guidance"
- View responses on the go

---

## 📈 Bonus: Create Charts & Analytics

1. In Google Sheet, select your data
2. Click **Insert** → **Chart**
3. Choose chart type (pie, bar, line, etc.)
4. Customize and add to your sheet
5. Share insights with your team!

---

## 🔄 Updating the Script

If you need to modify the script later:

1. Go to Apps Script editor
2. Make your changes
3. Click **Save**
4. Click **Deploy** → **Manage deployments**
5. Click the pencil icon ✏️ to edit
6. Change version to "New version"
7. Click **Deploy**
8. **Important**: The URL stays the same, no need to update `script.js`

---

## 📞 Need Help?

If you encounter any issues:
1. Check the Apps Script execution logs
2. Verify all steps were completed
3. Make sure the Web App URL is correctly pasted
4. Test with a simple form submission

---

## ✨ Success Checklist

- [ ] Google Sheet created
- [ ] Apps Script code pasted and saved
- [ ] `setupSheet` function run successfully
- [ ] Headers visible in Google Sheet
- [ ] Web App deployed
- [ ] Web App URL copied
- [ ] URL pasted in `script.js` (line 283)
- [ ] `script.js` saved
- [ ] Test submission successful
- [ ] Data visible in Google Sheet

---

**🎉 Congratulations!** Your feedback form is now connected to Google Sheets!

All workshop feedback will automatically be saved and organized for easy analysis.

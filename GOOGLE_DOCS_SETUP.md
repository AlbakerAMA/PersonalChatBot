# Google Docs Integration Setup & Troubleshooting

## Current Issue
The chatbot is receiving a 404 error when trying to access the Google Drive document with ID: `1eRrZTiykgduJkYsrNdnwUrqYq7kwmqcQL0NP5HikELg`

**Service Account Email:** `chatbot@n8n-gmail-integration-462717.iam.gserviceaccount.com`

## Step-by-Step Solution

### Step 1: Verify Document ID
1. Go to your Google Drive document
2. The URL should look like: `https://docs.google.com/document/d/1eRrZTiykgduJkYsrNdnwUrqYq7kwmqcQL0NP5HikELg/edit`
3. The document ID is the long string between `/d/` and `/edit` in the URL
4. Verify this matches your `GOOGLE_FOLDER_ID` in `.env.local`

### Step 2: Share Document with Service Account
1. **Open your Google Document**
2. **Click the "Share" button** (top-right corner)
3. **Add the service account email:** `chatbot@n8n-gmail-integration-462717.iam.gserviceaccount.com`
4. **Set permissions to "Viewer" or "Editor"** (Viewer is sufficient for reading)
5. **Click "Send"**

### Step 3: Verify Service Account Permissions
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **IAM & Admin → Service Accounts**
3. Find your service account: `chatbot@n8n-gmail-integration-462717.iam.gserviceaccount.com`
4. Verify it has these APIs enabled:
   - Google Drive API
   - Google Docs API

### Step 4: Check API Enablement
1. In Google Cloud Console, go to **APIs & Services → Library**
2. Search and ensure these APIs are **enabled**:
   - **Google Drive API**
   - **Google Docs API**
   - **Google Sheets API** (if using sheets)

### Step 5: Test Document Access
After completing the above steps, test the chatbot again. The AI should now be able to access your Google Document content.

## Alternative Solutions

### Option 1: Make Document Public (Less Secure)
1. Open your Google Document
2. Click "Share" → "Change to anyone with the link"
3. Set to "Viewer" permissions
4. This makes the document accessible without explicit sharing

### Option 2: Use a Different Document
1. Create a new test document in Google Drive
2. Add some sample content
3. Share it with the service account
4. Update the `GOOGLE_FOLDER_ID` in `.env.local` with the new document ID

### Option 3: Use a Folder Instead
1. Create a folder in Google Drive
2. Add your documents to the folder
3. Share the entire folder with the service account
4. Update the code to handle folder access (requires modification)

## Verification Steps

### Test 1: Manual Verification
1. Visit: `https://drive.google.com/file/d/1eRrZTiykgduJkYsrNdnwUrqYq7kwmqcQL0NP5HikELg/view`
2. Check if you can access the document
3. Verify the sharing settings show your service account email

### Test 2: Service Account Access
The chatbot will automatically test access when you send a message. Look for these responses:
- ✅ **Success:** Content from your Google Doc
- ❌ **404 Error:** Document not found/accessible
- ❌ **403 Error:** Permission denied

## Common Issues & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| 404 Not Found | Document not shared with service account | Follow Step 2 above |
| 403 Forbidden | Service account lacks permissions | Check sharing permissions |
| Invalid ID | Wrong document ID in environment | Verify document ID from URL |
| API Disabled | Google APIs not enabled | Enable required APIs in Cloud Console |

## Environment Variables Check

Ensure your `.env.local` file has the correct values:
```env
GOOGLE_CLIENT_EMAIL=chatbot@n8n-gmail-integration-462717.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n[YOUR_KEY]\n-----END PRIVATE KEY-----"
GOOGLE_FOLDER_ID=1eRrZTiykgduJkYsrNdnwUrqYq7kwmqcQL0NP5HikELg
```

## Quick Test
After making changes, send a message to the chatbot like "What's in my document?" and it should return content from your Google Doc instead of an error message.

---

**Need Help?** The chatbot will provide detailed error messages to help you troubleshoot specific issues.
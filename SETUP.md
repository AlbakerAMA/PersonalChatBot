# Setup Instructions

## Prerequisites
1. Node.js (v16 or higher)
2. Google Cloud Platform account
3. GPT-OSS API access

## Google Docs Setup

### 1. Create Google Service Account
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google Drive API and Google Docs API
4. Go to IAM & Admin → Service Accounts
5. Create a new service account
6. Download the JSON key file

### 2. Configure Google Drive Access
1. Extract `client_email` from the JSON key file
2. Copy the `private_key` from the JSON key file
3. Share your Google Drive folder/document with the service account email
4. Copy the folder/document ID from the Google Drive URL

### 3. Update Environment Variables
Update `.env.local` with your actual values:
```
GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n
GOOGLE_FOLDER_ID=your_google_folder_or_document_id
GPT_OSS_API_URL=https://your-gpt-oss-endpoint/api/v1/chat
GPT_OSS_API_KEY=your_gpt_oss_api_key
```

## GPT-OSS Setup
1. Obtain your GPT-OSS API endpoint URL
2. Get your API key
3. Update the `.env.local` file with these values

## Installation & Running
1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Open http://localhost:3000

## Deployment
This project is ready to deploy on Vercel with automated GitHub Actions:

### Manual Deployment
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Automated Deployment (Recommended)
1. **Setup Vercel CLI locally:**
   ```bash
   npm i -g vercel
   vercel login
   vercel link
   ```

2. **Get Vercel Project Information:**
   ```bash
   # Get your organization ID
   vercel teams list
   
   # Get your project ID (after linking)
   cat .vercel/project.json
   ```

3. **Generate Vercel Token:**
   - Go to [Vercel Account Settings](https://vercel.com/account/tokens)
   - Create a new token with appropriate scope

4. **Configure GitHub Secrets:**
   In your GitHub repository, go to Settings → Secrets and variables → Actions, and add:
   - `VERCEL_TOKEN`: Your Vercel API token
   - `VERCEL_ORG_ID`: Your Vercel organization/team ID
   - `VERCEL_PROJECT_ID`: Your Vercel project ID

5. **Add Environment Variables to Vercel:**
   In your Vercel dashboard, add the same environment variables:
   - `GOOGLE_CLIENT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
   - `GOOGLE_FOLDER_ID`
   - `GPT_OSS_API_URL`
   - `GPT_OSS_API_KEY`

6. **Deploy:**
   Push to the `main` branch, and GitHub Actions will automatically deploy to Vercel

### Workflow Features
- Automatic deployment on push to main branch
- Node.js 18 with npm caching for faster builds
- Build verification before deployment
- Production deployment to Vercel

## Troubleshooting
- Ensure Google service account has access to your documents
- Verify GPT-OSS API endpoint is accessible
- Check environment variables are properly formatted
- Ensure private key has proper line breaks (\\n)
- For deployment issues, check GitHub Actions logs and Vercel deployment logs

### Google Docs Access Issues
If you get a 404 error when the chatbot tries to access your Google Drive document:

1. **Share the document** with your service account email: `chatbot@n8n-gmail-integration-462717.iam.gserviceaccount.com`
2. **Set permissions** to "Viewer" or "Editor"
3. **Verify the document ID** in your `GOOGLE_FOLDER_ID` environment variable
4. **Check APIs are enabled** in Google Cloud Console:
   - Google Drive API
   - Google Docs API

For detailed troubleshooting steps, see `GOOGLE_DOCS_SETUP.md`
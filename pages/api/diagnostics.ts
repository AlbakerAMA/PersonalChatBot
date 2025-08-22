import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const diagnostics = {
    timestamp: new Date().toISOString(),
    environmentVariables: {
      hasGoogleClientEmail: !!process.env.GOOGLE_CLIENT_EMAIL,
      hasGooglePrivateKey: !!process.env.GOOGLE_PRIVATE_KEY,
      hasGoogleFolderId: !!process.env.GOOGLE_FOLDER_ID,
      hasGptOssApiUrl: !!process.env.GPT_OSS_API_URL,
      hasGptOssApiKey: !!process.env.GPT_OSS_API_KEY,
    },
    googleConfig: {
      clientEmail: process.env.GOOGLE_CLIENT_EMAIL || 'Not configured',
      folderId: process.env.GOOGLE_FOLDER_ID || 'Not configured',
      privateKeyFormat: process.env.GOOGLE_PRIVATE_KEY 
        ? process.env.GOOGLE_PRIVATE_KEY.startsWith('-----BEGIN PRIVATE KEY-----') 
          ? 'Properly formatted' 
          : 'Missing PEM headers'
        : 'Not configured'
    },
    gptOssConfig: {
      apiUrl: process.env.GPT_OSS_API_URL || 'Not configured',
      hasApiKey: !!process.env.GPT_OSS_API_KEY
    },
    troubleshooting: {
      documentAccessUrl: process.env.GOOGLE_FOLDER_ID 
        ? `https://drive.google.com/file/d/${process.env.GOOGLE_FOLDER_ID}/view`
        : 'Document ID not configured',
      sharingInstructions: process.env.GOOGLE_CLIENT_EMAIL
        ? `Share your Google Doc with: ${process.env.GOOGLE_CLIENT_EMAIL}`
        : 'Service account email not configured'
    }
  };

  res.status(200).json(diagnostics);
}
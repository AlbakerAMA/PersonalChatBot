// Direct Google Drive API integration
export async function loadGoogleDocs() {
  try {
    console.log('Loading Google Docs via Google Drive API...');
    
    // Get access token from service account
    const { GoogleAuth } = require('google-auth-library');
    
    const auth = new GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL!,
        private_key: process.env.GOOGLE_PRIVATE_KEY!,
        type: 'service_account',
      },
      scopes: [
        'https://www.googleapis.com/auth/drive.readonly',
        'https://www.googleapis.com/auth/documents.readonly'
      ],
    });
    
    const authClient = await auth.getClient();
    const accessToken = await authClient.getAccessToken();
    
    if (!accessToken.token) {
      throw new Error('Failed to get access token');
    }
    
    console.log('Successfully authenticated with Google APIs');
    
    // First, get information about the file/folder
    const fileInfoResponse = await fetch(
      `https://www.googleapis.com/drive/v3/files/${process.env.GOOGLE_FOLDER_ID}?fields=id,name,mimeType`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken.token}`,
        },
      }
    );
    
    if (!fileInfoResponse.ok) {
      throw new Error(`Google Drive API error: ${fileInfoResponse.status} - ${fileInfoResponse.statusText}`);
    }
    
    const fileInfo = await fileInfoResponse.json();
    console.log('File info:', fileInfo);
    
    let content = '';
    let source = fileInfo.name || 'Unknown document';
    
    // Handle Google Docs specifically
    if (fileInfo.mimeType === 'application/vnd.google-apps.document') {
      // Export as plain text
      const exportResponse = await fetch(
        `https://www.googleapis.com/drive/v3/files/${process.env.GOOGLE_FOLDER_ID}/export?mimeType=text/plain`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken.token}`,
          },
        }
      );
      
      if (exportResponse.ok) {
        content = await exportResponse.text();
        console.log(`Successfully loaded Google Doc: ${source} (${content.length} characters)`);
      } else {
        throw new Error(`Failed to export Google Doc: ${exportResponse.status}`);
      }
    } else {
      // For other file types, try to get as text
      const downloadResponse = await fetch(
        `https://www.googleapis.com/drive/v3/files/${process.env.GOOGLE_FOLDER_ID}?alt=media`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken.token}`,
          },
        }
      );
      
      if (downloadResponse.ok) {
        content = await downloadResponse.text();
        console.log(`Successfully loaded file: ${source} (${content.length} characters)`);
      } else {
        throw new Error(`Failed to download file: ${downloadResponse.status}`);
      }
    }
    
    if (!content.trim()) {
      content = 'This document appears to be empty or the content could not be extracted.';
    }
    
    return [{
      pageContent: content,
      metadata: { 
        source: source,
        fileId: fileInfo.id,
        mimeType: fileInfo.mimeType,
        type: 'google_drive_file'
      }
    }];
    
  } catch (error) {
    console.error('Error loading Google Docs:', error);
    throw error;
  }
}

export async function searchGoogleDocuments(query: string) {
  try {
    // Load documents from Google Drive
    const docs = await loadGoogleDocs();
    
    if (docs.length === 0) {
      return 'No documents found in the specified Google Drive location.';
    }
    
    // Simple keyword search across all documents
    const relevantDocs = docs.filter(doc => 
      doc.pageContent.toLowerCase().includes(query.toLowerCase())
    );
    
    if (relevantDocs.length > 0) {
      // Return the content of relevant documents
      const docContents = relevantDocs.map(doc => {
        const source = doc.metadata?.source || 'Unknown source';
        return `Source: ${source}\n${doc.pageContent}`;
      });
      
      return docContents.join('\n\n---\n\n');
    }
    
    // If no direct matches, return a summary of all available documents
    const allContent = docs.map(doc => {
      const source = doc.metadata?.source || 'Unknown source';
      // Return first 1000 characters of each document
      const preview = doc.pageContent.substring(0, 1000) + (doc.pageContent.length > 1000 ? '...' : '');
      return `Source: ${source}\n${preview}`;
    });
    
    return `No direct matches found for "${query}". Here's what's available in your Google Drive:\n\n${allContent.join('\n\n---\n\n')}`;
    
  } catch (error) {
    console.error('Error searching Google documents:', error);
    
    // Provide helpful error messages based on the error type
    if (error instanceof Error) {
      if (error.message.includes('404')) {
        return `Google Docs Error: The document with ID ${process.env.GOOGLE_FOLDER_ID} was not found or is not accessible to the service account. Please check:\n1. The document ID is correct\n2. The document is shared with ${process.env.GOOGLE_CLIENT_EMAIL}\n3. The service account has proper permissions`;
      } else if (error.message.includes('403')) {
        return `Google Docs Error: Access denied. Please ensure the Google Drive document is shared with the service account email: ${process.env.GOOGLE_CLIENT_EMAIL}`;
      } else if (error.message.includes('DECODER')) {
        return `Google Docs Error: Authentication issue with the private key format. Please check your GOOGLE_PRIVATE_KEY environment variable formatting.`;
      }
    }
    
    return `Error accessing Google Docs: ${error instanceof Error ? error.message : 'Unknown error'}. Please check your Google Drive configuration and ensure the document is shared with your service account.`;
  }
}

// Simple document simulation for testing
export function getSimulatedDocuments() {
  return [
    {
      content: 'Welcome to our AI chatbot. This is a sample document that demonstrates how the system works.',
      metadata: { source: 'sample-doc-1' }
    },
    {
      content: 'This chatbot can answer questions about your documents. Configure Google Docs integration for real document access.',
      metadata: { source: 'sample-doc-2' }
    }
  ];
}

export function searchSimulatedDocuments(query: string) {
  const docs = getSimulatedDocuments();
  // Simple keyword search for demo purposes
  const relevantDocs = docs.filter(doc => 
    doc.content.toLowerCase().includes(query.toLowerCase())
  );
  
  if (relevantDocs.length > 0) {
    return relevantDocs.map(doc => doc.content).join('\n\n');
  }
  
  return 'No relevant documents found. Please configure Google Docs integration for full functionality.';
}
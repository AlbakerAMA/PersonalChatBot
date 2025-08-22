# 🤖 Next.js AI Agent with Google Docs + GPT-OSS

A powerful AI chatbot that integrates with your Google Drive documents to provide intelligent, context-aware responses using OpenRouter's GPT models. Built with Next.js, this application can read and understand content from your Google Docs to answer questions and provide assistance.

![Next.js](https://img.shields.io/badge/Next.js-15.5.0-black)
![React](https://img.shields.io/badge/React-18+-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)
![Google Drive API](https://img.shields.io/badge/Google%20Drive-API-green)
![OpenRouter](https://img.shields.io/badge/OpenRouter-GPT-purple)

## ✨ Features

### 🎯 Core Functionality
- **📄 Google Docs Integration**: Direct access to your Google Drive documents
- **🧠 AI-Powered Responses**: Uses OpenRouter's GPT models for intelligent conversations
- **🔍 Context-Aware Search**: Searches through your documents to find relevant information
- **💬 Interactive Chat UI**: Clean, responsive chat interface with loading states
- **🔐 Secure Authentication**: Google service account integration for document access

### 🛠️ Technical Features
- **⚡ Next.js Frontend**: Modern React-based web application
- **🔌 API Routes**: RESTful API endpoints for chat and diagnostics
- **📱 Responsive Design**: Works on desktop and mobile devices
- **🚀 Auto-Deployment**: GitHub Actions integration with Vercel
- **🔧 Error Handling**: Comprehensive error messages and fallback mechanisms
- **📊 Diagnostics**: Built-in configuration verification tools

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Google Cloud Platform account
- OpenRouter API access
- Git

### 1. Clone & Install
```bash
git clone <repository-url>
cd PersonalChatBot
npm install
```

### 2. Environment Configuration
Create a `.env.local` file with your credentials:
```env
GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_CONTENT\n-----END PRIVATE KEY-----"
GOOGLE_FOLDER_ID=your_google_document_id
GPT_OSS_API_URL=https://openrouter.ai/api/v1/chat/completions
GPT_OSS_API_KEY=your_openrouter_api_key
```

### 3. Google Docs Setup
1. **Share your Google Document** with your service account email
2. **Set permissions** to "Viewer" or "Editor"
3. **Verify document access** using the diagnostic endpoint

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to use the chatbot.

## 📖 Documentation

- **[SETUP.md](SETUP.md)** - Detailed setup and configuration guide
- **[GOOGLE_DOCS_SETUP.md](GOOGLE_DOCS_SETUP.md)** - Google Docs integration troubleshooting
- **API Diagnostics** - Visit `/api/diagnostics` to verify your configuration

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|---------|
| `GOOGLE_CLIENT_EMAIL` | Service account email from Google Cloud | ✅ |
| `GOOGLE_PRIVATE_KEY` | Service account private key (PEM format) | ✅ |
| `GOOGLE_FOLDER_ID` | Google Drive document ID to access | ✅ |
| `GPT_OSS_API_URL` | OpenRouter API endpoint URL | ✅ |
| `GPT_OSS_API_KEY` | OpenRouter API key | ✅ |

### Supported Document Types
- Google Docs (`.gdoc`)
- Plain text files (`.txt`)
- Other text-based formats accessible via Google Drive API

## 🚀 Deployment

### Automated Deployment (Recommended)
This project includes automated deployment to Vercel via GitHub Actions:

1. **Push to `main` branch** triggers automatic deployment
2. **Configure GitHub Secrets**:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
3. **Set Vercel Environment Variables** (same as `.env.local`)

### Manual Deployment
```bash
npm run build
npm start
```

## 🛠️ Development

### Project Structure
```
├── components/           # React components
│   └── ChatBox.tsx      # Main chat interface
├── lib/                 # Utility functions
│   └── googleDocs.ts    # Google Drive API integration
├── pages/               # Next.js pages and API routes
│   ├── api/             # API endpoints
│   │   ├── chat.ts      # Main chat API
│   │   └── diagnostics.ts # Configuration diagnostics
│   ├── _app.tsx         # App configuration
│   └── index.tsx        # Home page
├── styles/              # CSS styles
│   └── globals.css      # Global styles
└── .env.local          # Environment variables (local)
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

## 🔍 Troubleshooting

### Common Issues

#### 🚫 "Document not found" (404 Error)
- Verify the document ID in `GOOGLE_FOLDER_ID`
- Ensure the document is shared with your service account
- Check that the document exists and is accessible

#### 🔐 "Access denied" (403 Error)
- Share the document with your service account email
- Verify service account has proper permissions
- Check that Google Drive API is enabled

#### 🔑 Authentication Errors
- Ensure `GOOGLE_PRIVATE_KEY` has proper PEM format
- Verify service account credentials are correct
- Check that the private key includes header/footer

### Diagnostic Tools
- **Configuration Check**: `GET /api/diagnostics`
- **Error Messages**: The chatbot provides detailed error descriptions
- **Server Logs**: Check terminal output for detailed error information

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [troubleshooting guide](GOOGLE_DOCS_SETUP.md)
2. Verify your configuration with `/api/diagnostics`
3. Review the detailed setup instructions in [SETUP.md](SETUP.md)
4. Check server logs for error details

## 🔮 Future Enhancements

- [ ] Support for multiple Google Drive folders
- [ ] Advanced document search with vector embeddings
- [ ] Support for Google Sheets integration
- [ ] Custom AI model selection
- [ ] Document upload via drag-and-drop
- [ ] Real-time document synchronization

---

**Made with ❤️ using Next.js, Google Drive API, and OpenRouter**
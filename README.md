# PurrPal Chatbot 🐱🤖

AI-powered chatbot untuk platform **PurrPal** yang membantu pemilik kucing di Indonesia dengan konsultasi kesehatan, perawatan, dan tips harian menggunakan **Google Vertex AI Gemini 2.0 Flash**.

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Vertex AI](https://img.shields.io/badge/Vertex%20AI-Gemini%202.0%20Flash-blue.svg)](https://cloud.google.com/vertex-ai)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 📋 Daftar Isi

- [Overview](#overview)
- [Features](#features) 
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Integration Guide](#integration-guide)
- [Development](#development)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Cost Optimization](#cost-optimization)
- [Contributing](#contributing)

## 🎯 Overview

PurrPal Chatbot adalah komponen AI yang dirancang khusus untuk menjawab pertanyaan seputar:

- 🏥 **Kesehatan kucing** - Deteksi gejala awal dan saran perawatan
- 🍽️ **Nutrisi & makanan** - Rekomendasi diet dan feeding schedule  
- 🎾 **Perilaku kucing** - Memahami tingkah laku dan cara mengatasi masalah
- 💊 **Perawatan harian** - Tips grooming, kebersihan, dan maintenance
- 🚨 **Emergency guidance** - Kapan harus ke dokter hewan

### Mengapa Gemini 2.0 Flash?

- 💰 **Paling ekonomis**: $0.075 per 1M input tokens
- ⚡ **Response cepat**: < 2 detik average response time
- 🇮🇩 **Bahasa Indonesia**: Native language support
- 🧠 **Context-aware**: Memahami konteks percakapan kucing
- 🔄 **Streaming support**: Real-time response generation

## ✨ Features

### Core Capabilities
- **Smart Q&A**: Menjawab pertanyaan spesifik tentang kucing
- **Context Awareness**: Memahami konteks conversation flow
- **Bahasa Indonesia**: Optimized untuk pengguna Indonesia
- **Safety First**: Selalu menyarankan konsultasi dokter hewan untuk kasus serius
- **Streaming Response**: Support untuk real-time text generation

### Technical Features
- **Git Submodule Ready**: Mudah diintegrasikan sebagai submodule
- **RESTful API**: Simple HTTP endpoints untuk integrasi
- **Error Handling**: Robust error management dan fallback responses
- **Health Monitoring**: Built-in health check endpoints
- **Configurable**: Environment-based configuration
- **Production Ready**: Logging, monitoring, dan security features

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Google Cloud Project dengan Vertex AI enabled
- Service Account dengan Vertex AI User permissions

### 1-Minute Setup

```bash
# Clone repository
git clone https://github.com/your-org/purrpal-chatbot.git
cd purrpal-chatbot

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env dengan project details Anda

# Add service account key
# Download dari Google Cloud Console > IAM > Service Accounts
cp path/to/service-account-key.json ./

# Test chatbot
npm start
```

## 📦 Installation

### As Standalone Application

```bash
git clone https://github.com/your-org/purrpal-chatbot.git
cd purrpal-chatbot
npm install
```

### As Git Submodule (Recommended untuk PurrPal)

```bash
# Di repo utama PurrPal
git submodule add https://github.com/your-org/purrpal-chatbot.git chatbot
cd chatbot
npm install

# Update submodule (future updates)
git submodule update --remote chatbot
```

### Dependencies

```json
{
  "@google-cloud/vertexai": "^1.0.0",
  "dotenv": "^16.0.0"
}
```

## ⚙️ Configuration

### Environment Variables

Create `.env` file:

```bash
# Required
GOOGLE_CLOUD_PROJECT=your-project-id
GOOGLE_CLOUD_LOCATION=us-central1
VERTEX_AI_MODEL=gemini-2.0-flash-001
SERVICE_ACCOUNT_KEY_PATH=./service-account-key.json

# Optional
CHATBOT_MAX_TOKENS=8192
CHATBOT_TEMPERATURE=0.7
CHATBOT_TOP_P=0.95
CHATBOT_TOP_K=40
```

### Google Cloud Setup

1. **Enable APIs**:
   ```bash
   gcloud services enable aiplatform.googleapis.com
   ```

2. **Create Service Account**:
   ```bash
   gcloud iam service-accounts create purrpal-chatbot \
     --display-name="PurrPal Chatbot Service Account"
   ```

3. **Grant Permissions**:
   ```bash
   gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
     --member="serviceAccount:purrpal-chatbot@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
     --role="roles/aiplatform.user"
   ```

4. **Download Key**:
   ```bash
   gcloud iam service-accounts keys create service-account-key.json \
     --iam-account=purrpal-chatbot@YOUR_PROJECT_ID.iam.gserviceaccount.com
   ```

## 💻 Usage

### Basic Usage

```javascript
const { chatbot } = require('./src/chatbot');

async function main() {
  // Initialize chatbot
  await chatbot.initialize();
  
  // Generate response
  const response = await chatbot.generateResponse(
    'Kucing saya tidak mau makan, kenapa ya?'
  );
  
  console.log(response);
  // {
  //   "success": true,
  //   "message": "Ada beberapa alasan kucing tidak mau makan...",
  //   "timestamp": "2025-06-10T08:45:00.000Z",
  //   "source": "vertex-ai"
  // }
}
```

### Streaming Response

```javascript
const response = await chatbot.generateStreamingResponse(
  'Bagaimana cara merawat kucing yang baru lahir?'
);
```

### Health Check

```javascript
const health = await chatbot.healthCheck();
console.log(health);
// {
//   "status": "healthy",
//   "message": "Chatbot is working properly",
//   "model": "gemini-2.0-flash-001",
//   "test_response": true
// }
```

## 📚 API Reference

### Class: `PurrPalChatbot`

#### Methods

##### `initialize()`
Inisialisasi koneksi ke Vertex AI.

```javascript
await chatbot.initialize();
```

**Returns**: `Promise<boolean>`

##### `generateResponse(message)`
Generate response dari user message.

```javascript
const response = await chatbot.generateResponse('user message');
```

**Parameters**:
- `message` (string): User input message (max 500 characters)

**Returns**: `Promise<Object>`
```javascript
{
  success: boolean,
  message: string,
  timestamp: string,
  source: string,
  error?: string
}
```

##### `generateStreamingResponse(message)`
Generate streaming response untuk real-time experience.

```javascript
const response = await chatbot.generateStreamingResponse('user message');
```

**Parameters**: Same as `generateResponse()`
**Returns**: Same format, but content streams in real-time

##### `healthCheck()`
Check status kesehatan chatbot.

```javascript
const health = await chatbot.healthCheck();
```

**Returns**: `Promise<Object>`
```javascript
{
  status: 'healthy' | 'not_initialized' | 'error',
  message: string,
  model?: string,
  test_response?: boolean
}
```

### Error Handling

Semua methods menggunakan try-catch dan return error response:

```javascript
{
  success: false,
  message: "User-friendly error message",
  error: "Technical error details",
  timestamp: "2025-06-10T08:45:00.000Z"
}
```

## 🔗 Integration Guide

### Express.js Integration

```javascript
// routes/chatbot.js
const express = require('express');
const { chatbot } = require('../chatbot/src/chatbot');
const router = express.Router();

// Initialize chatbot on startup
chatbot.initialize().catch(console.error);

// Chat endpoint
router.post('/chat', async (req, res) => {
  try {
    const { message, userId } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await chatbot.generateResponse(message);
    
    // Log conversation for analytics
    console.log(`User ${userId}: ${message}`);
    console.log(`Bot: ${response.message}`);
    
    res.json(response);
    
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Chatbot temporarily unavailable'
    });
  }
});

// Streaming endpoint
router.post('/chat/stream', async (req, res) => {
  try {
    const { message } = req.body;
    
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');
    
    const response = await chatbot.generateStreamingResponse(message);
    res.json(response);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
router.get('/health', async (req, res) => {
  try {
    const health = await chatbot.healthCheck();
    res.json(health);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

module.exports = router;
```

### Frontend Integration (React)

```javascript
// utils/chatbot.js
const API_BASE = process.env.REACT_APP_API_URL;

export async function sendMessage(message) {
  try {
    const response = await fetch(`${API_BASE}/api/chatbot/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Chat error:', error);
    return {
      success: false,
      message: 'Koneksi bermasalah. Silakan coba lagi.'
    };
  }
}

// components/ChatBot.jsx
import { useState } from 'react';
import { sendMessage } from '../utils/chatbot';

export function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setMessages(prev => [...prev, { type: 'user', text: input }]);
    
    const response = await sendMessage(input);
    
    setMessages(prev => [...prev, { 
      type: 'bot', 
      text: response.message,
      success: response.success 
    }]);
    
    setInput('');
    setLoading(false);
  };

  return (
    <div className="chatbot">
      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.type}`}>
            {msg.text}
          </div>
        ))}
      </div>
      
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tanya tentang kucing Anda..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          disabled={loading}
        />
        <button onClick={handleSend} disabled={loading}>
          {loading ? 'Mengetik...' : 'Kirim'}
        </button>
      </div>
    </div>
  );
}
```

### Next.js API Integration

```javascript
// pages/api/chatbot.js (atau app/api/chatbot/route.js untuk App Router)
import { chatbot } from '../../../chatbot/src/chatbot';

// Initialize once
let initialized = false;

export default async function handler(req, res) {
  if (!initialized) {
    await chatbot.initialize();
    initialized = true;
  }

  if (req.method === 'POST') {
    try {
      const { message } = req.body;
      const response = await chatbot.generateResponse(message);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
```

## 🛠️ Development

### Project Structure

```
purrpal-chatbot/
├── src/
│   ├── chatbot.js          # Main chatbot class
│   ├── config.js           # Configuration management
│   └── utils.js            # Utility functions
├── tests/
│   └── chatbot.test.js     # Unit tests
├── .env.example            # Environment template
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

### Scripts

```bash
# Development
npm start           # Run production mode
npm test            # Run tests
npm run test:watch  # Run tests with watching

# Utilities  
npm run lint        # Check code style
npm run format      # Format code
npm run docs        # Generate documentation
```

### Adding New Features

1. **Extend `PurrPalChatbot` class** di `src/chatbot.js`
2. **Add tests** di `tests/`
3. **Update documentation** di `docs/`
4. **Add examples** di `examples/`

### Code Style

```javascript
// Use async/await
async function example() {
  const result = await chatbot.generateResponse('message');
  return result;
}

// Handle errors properly
try {
  const response = await chatbot.generateResponse(message);
  return formatResponse(response);
} catch (error) {
  console.error('Error:', error.message);
  return createErrorResponse(error);
}

// Use environment configuration
const config = {
  model: process.env.VERTEX_AI_MODEL || 'gemini-2.0-flash-001',
  temperature: parseFloat(process.env.CHATBOT_TEMPERATURE) || 0.7
};
```

## 🧪 Testing

### Run Tests

```bash
# All tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

### Test Structure

```javascript
// tests/chatbot.test.js
describe('PurrPal Chatbot', () => {
  let chatbot;

  beforeAll(async () => {
    chatbot = new PurrPalChatbot();
    // Mock Vertex AI for testing
  });

  test('should initialize successfully', async () => {
    const result = await chatbot.initialize();
    expect(result).toBe(true);
  });

  test('should generate valid response', async () => {
    const response = await chatbot.generateResponse('Test message');
    expect(response.success).toBe(true);
    expect(response.message).toBeDefined();
  });
});
```

### Integration Testing

```bash
# Test dengan real Vertex AI (requires setup)
NODE_ENV=test npm test

# Test dengan mock (default)
npm test
```

## 🐛 Troubleshooting

### Common Issues

#### ❌ "Permission denied" Error
```bash
# Check service account permissions
gcloud projects get-iam-policy YOUR_PROJECT_ID \
  --flatten="bindings[].members" \
  --filter="bindings.members:serviceAccount:YOUR_SERVICE_ACCOUNT"

# Add missing role
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:YOUR_SERVICE_ACCOUNT" \
  --role="roles/aiplatform.user"
```

#### ❌ "Model not found" Error
```bash
# List available models
gcloud ai models list --region=us-central1 --filter="displayName:gemini"

# Try different region
GOOGLE_CLOUD_LOCATION=us-east1
```

#### ❌ "Project undefined" Error
```bash
# Check environment variables
node -e "console.log(process.env.GOOGLE_CLOUD_PROJECT)"

# Verify .env file location
ls -la .env
cat .env
```

#### ❌ Initialization Failed
```bash
# Check service account key
node -e "console.log(JSON.parse(require('fs').readFileSync('./service-account-key.json')).project_id)"

# Test authentication
gcloud auth activate-service-account --key-file=service-account-key.json
```

### Debug Mode

```bash
# Enable debug logging
DEBUG=purrpal:* npm start

# Check configuration
node -e "require('./src/config'); console.log('Config loaded successfully')"
```

### Health Check

```bash
# Quick health check
curl -X GET http://localhost:3000/api/chatbot/health

# Full diagnostics
node examples/diagnostics.js
```

## 💰 Cost Optimization

### Pricing (Gemini 2.0 Flash)

- **Input**: $0.075 per 1M tokens
- **Output**: $0.30 per 1M tokens
- **Average chat session**: ~500 tokens = $0.0002 (sangat murah!)

### Cost-Saving Tips

1. **Input sanitization**: Limit input to 500 characters
2. **Response caching**: Cache common responses
3. **Request batching**: Batch multiple questions
4. **Monitoring**: Track usage dengan Google Cloud Monitoring

```javascript
// Cost monitoring
const response = await chatbot.generateResponse(message);
console.log(`Tokens used: ~${message.length + response.message.length}`);
```

### Monthly Cost Estimation

| Usage | Cost/Month |
|-------|------------|
| 1K messages | ~$0.20 |
| 10K messages | ~$2.00 |
| 100K messages | ~$20.00 |

## 📄 License

MIT License - lihat [LICENSE](LICENSE) file untuk details.

## 🤝 Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`  
5. Open Pull Request

Lihat [CONTRIBUTING.md](docs/CONTRIBUTING.md) untuk guidelines lengkap.

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-org/purrpal-chatbot/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/purrpal-chatbot/discussions)
- **Email**: dev@purrpal.com

## 🎯 Roadmap

- [ ] **Multi-language support** (English, Javanese)
- [ ] **Voice input/output** integration
- [ ] **Image analysis** untuk cat health diagnosis
- [ ] **Integration dengan veterinary APIs**
- [ ] **Conversation memory** untuk better context
- [ ] **Analytics dashboard** untuk usage monitoring

---

**Made with ❤️ for cat lovers everywhere**

*PurrPal Chatbot - Making cat care accessible to everyone, everywhere in Indonesia.*
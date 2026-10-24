# Nexxi - NexxTechs AI Chatbot Server

**Nexxi** is the official AI counselor and website assistant for NexxTechs IT Training Institute.

---

## 📁 Project Structure

```
nexxtechss/
├── server/
│   ├── .env.example       # Environment template
│   ├── .env               # Your live credentials (API key, model, port)
│   ├── knowledge.js       # Verified course details, batches, durations & prompt
│   ├── package.json       # Backend dependencies
│   ├── server.js          # Express API server (/health, /api/chat)
│   └── README.md          # Setup & Deployment Guide
├── widget/
│   ├── demo.html          # Interactive test page with sample questions
│   └── nexx-chat.js       # Lightweight, zero-dependency embeddable chat widget
└── frontend/public/
    ├── demo.html          # Accessible directly on http://localhost:3000/demo.html
    └── nexx-chat.js       # Served on live site
```

---

## ⚡ 1. Local Setup

### Step 1: Set Anthropic API Key
1. Go to [console.anthropic.com](https://console.anthropic.com/).
2. Create an API key under **API Keys**.
3. Under **Plans & Billing**, set a monthly spend limit (e.g., $5 or $10) for safety.
4. Open `server/.env` and paste your key:
```env
PORT=3001
ANTHROPIC_API_KEY=sk-ant-api03-YOUR_KEY_HERE
CLAUDE_MODEL=claude-3-5-haiku-20241022
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000,http://localhost:5173,https://www.nexxtechs.com
```

### Step 2: Install & Start Server
```bash
cd server
npm install
npm start
```
The server will run on `http://localhost:3001`.

---

## 🧪 2. Testing Locally

1. Make sure your server is running (`http://localhost:3001`).
2. Open your browser and go to:
   - **http://localhost:3000/demo.html** (via existing frontend server)
   - OR run: `npx serve -l 3005 widget` and open `http://localhost:3005/demo.html`
3. Click on the floating **Nexxi** icon at the bottom right.
4. Try asking:
   - *"Data Analytics course ke batch timing aur duration kya hai?"*
   - *"Fees kitni hai?"* (Bot will direct to call/WhatsApp without inventing fake prices)
   - *"Kya demo class milti hai?"*

---

## 🚀 3. Deploying to Production (Render or Railway)

### Option A: Deploy on Render (Recommended - Free & Easy)
1. Push your repository to GitHub.
2. Sign in to [render.com](https://render.com) and click **New + > Web Service**.
3. Select your repository.
4. Set the following settings:
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Under **Environment Variables**, add:
   - `ANTHROPIC_API_KEY`: *(your real key from console.anthropic.com)*
   - `CLAUDE_MODEL`: `claude-3-5-haiku-20241022`
   - `ALLOWED_ORIGINS`: `https://www.nexxtechs.com,https://nexxtechs.com`
6. Click **Deploy Web Service**. You will get a URL like `https://nexxi-chat-api.onrender.com`.

### Option B: Deploy on Railway
1. Go to [railway.app](https://railway.app) and click **New Project > Deploy from GitHub repo**.
2. Set **Root Directory** to `/server`.
3. Under **Variables**, add:
   - `ANTHROPIC_API_KEY`: *(your key)*
   - `CLAUDE_MODEL`: `claude-3-5-haiku-20241022`
   - `ALLOWED_ORIGINS`: `https://www.nexxtechs.com,https://nexxtechs.com`
4. Under **Settings > Networking**, click **Generate Domain**.

---

## 🌐 4. Live Site Integration

Add this snippet to your website before the closing `</body>` tag (replace `https://YOUR-BACKEND.onrender.com` with your deployed backend URL):

```html
<!-- Nexxi AI Chat Widget -->
<script src="https://www.nexxtechs.com/nexx-chat.js"
        data-api="https://YOUR-BACKEND.onrender.com/api/chat"
        data-brand="NexxTechs"
        data-bot-name="Nexxi"
        data-color="#84CC16"
        data-phone="+919217179762"></script>
```

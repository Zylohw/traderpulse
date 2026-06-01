# TraderPulse - AI SaaS Dashboard

A modern AI-powered trading dashboard with gamification features, built with Next.js and FastAPI.

## Features

- **AI-Powered Trading Dashboard**: Real-time trading insights and analytics
- **Gamification System**: XP points, levels, badges, and progress tracking
- **Decoupled Architecture**: Next.js frontend + FastAPI backend
- **Modern UI**: Built with Tailwind CSS and Lucide icons
- **Production Ready**: Configured for Vercel (frontend) and Cloud Run (backend)

## Tech Stack

### Frontend
- Next.js 14 with TypeScript
- Tailwind CSS
- Lucide React (icons)
- Vitest (testing)

### Backend
- FastAPI
- Python 3.11
- Uvicorn (ASGI server)

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd TraderPlus
```

2. Install frontend dependencies
```bash
npm install
```

3. Install backend dependencies
```bash
cd backend
pip install -r requirements.txt
```

4. Configure environment variables
```bash
cp .env.example .env
cp backend/.env.example backend/.env
```

5. Start the development servers

Frontend (Next.js):
```bash
npm run dev
```

Backend (FastAPI):
```bash
cd backend
uvicorn main:app --reload
```

The frontend will be available at `http://localhost:3000`
The backend will be available at `http://localhost:8000`

## Gamification System

The dashboard includes a comprehensive gamification system:

- **XP Points**: Earn experience points through trading activities
- **Levels**: Progress through levels as you gain XP
- **Badges**: Unlock achievements and badges
- **Progress Bar**: Visual progress tracking to next level

### Badge System
- First Steps: 100 XP
- Rising Star: 500 XP
- Master Trader: 1000 XP

## Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Configure build settings (already set in vercel.json)
3. Deploy

### Backend (Cloud Run)
1. Build the Docker image
```bash
gcloud builds submit --tag gcr.io/PROJECT_ID/traderpulse-backend
```

2. Deploy to Cloud Run
```bash
gcloud run deploy traderpulse-backend --image gcr.io/PROJECT_ID/traderpulse-backend --platform managed --region us-central1 --allow-unauthenticated
```

## Testing

Run the test suite:
```bash
npm test
```

## Project Structure

```
TraderPlus/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   └── test/            # Test setup
├── backend/              # FastAPI backend
│   ├── main.py          # FastAPI application
│   └── requirements.txt # Python dependencies
├── public/              # Static assets
└── package.json         # Node dependencies
```

## License

MIT

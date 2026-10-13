# FinResearch

FinResearch is a full-stack financial research application built with **Next.js** and **FastAPI**. It provides a structured research pipeline where a company name can be submitted from the frontend and processed through modular backend research components.

## Tech Stack

### Frontend
- Next.js 14
- React
- TypeScript
- Tailwind CSS

### Backend
- Python
- FastAPI
- Pydantic
- Uvicorn

## Architecture

```text
User
  │
  ▼
Next.js Frontend
  │
  │ HTTP REST API
  ▼
FastAPI Backend
  │
  ▼
Research Service
  │
  ├── Company Overview
  ├── SEC Filings
  ├── Litigation
  ├── News & Sentiment
  ├── Knowledge Base / RAG
  ├── Risk Analysis
  └── Pitchbook
```

## Features

- Company research interface
- REST API built with FastAPI
- Modular research service architecture
- Concurrent execution of research modules
- Backend health-check endpoint
- CORS configuration for frontend/backend communication
- Error isolation between research modules
- Structured JSON research responses
- Next.js frontend with loading, error and result states

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Backend health check |
| POST | `/research` | Run research for a company |

### Research Request

```json
{
  "company": "Apple"
}
```

### Current Research Modules

The project currently contains the architecture for:

- Company Overview
- SEC Filings / EDGAR
- Litigation
- News & Sentiment
- Knowledge Base / RAG
- Risk Analysis
- Pitchbook

Some modules are currently placeholders for future data-source integrations.

## Running Locally

### Backend

```bash
cd backend

python -m venv .venv
```

Windows:

```bash
.venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start FastAPI:

```bash
uvicorn app.main:app --reload --port 8000
```

Backend:

```text
http://localhost:8000
```

Health check:

```text
http://localhost:8000/health
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
```

Create:

```text
.env.local
```

with:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

Then:

```bash
npm run dev
```

Frontend:

```text
http://localhost:3000
```

## Project Status

The application currently implements the full frontend-to-backend research pipeline and modular research architecture. External data-source integrations such as SEC EDGAR, news, litigation, RAG and automated risk analysis can be added as subsequent modules.

## Future Improvements

- SEC EDGAR integration
- News API integration
- Litigation data integration
- Vector database and RAG pipeline
- Financial statement extraction
- Automated risk scoring
- Pitchbook generation
- Authentication and rate limiting
- Persistent research history

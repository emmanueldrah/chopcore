# Ferako - Local Commerce Marketplace

Ferako is a multi-vendor local commerce marketplace serving Ho and the Volta Region, Ghana.

## Tech Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS, Zustand, React Query
- **Backend**: FastAPI, SQLAlchemy 2.0, PostgreSQL
- **Infrastructure**: Supabase (Auth, DB, Storage, Realtime)
- **Payments**: Internal Adapter (Mocked)
- **SMS**: Internal Adapter (Hubtel)

## Getting Started

### Backend
1. `cd backend`
2. `pip install -r requirements.txt`
3. `uvicorn main:app --reload --port 8000`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## Project Structure
- `backend/app/models`: SQLAlchemy data models
- `backend/app/api`: FastAPI routers and endpoints
- `frontend/src/modules`: Role-based feature modules (Buyer, Vendor, Admin)
- `frontend/src/components/ui`: Base accessible design system components

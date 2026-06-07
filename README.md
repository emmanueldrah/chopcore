# ChopCore - Restaurant Management System

ChopCore is a comprehensive restaurant management system designed for four food business types: Fast Food, Sit-down Restaurant, Chop Bar, and Catering. It is available as a cross-platform desktop app (Electron) and a web app (Docker).

## Key Features

- **Mode-Aware System**: UI and API adapt based on the selected business type.
- **POS & Table Management**: Visual floor plan with drag-and-drop.
- **Real-time KDS**: WebSocket-based kitchen display with aging indicators.
- **Inventory & Recipes**: Automatic stock deduction on order completion.
- **Regional Support**: GHS ₵ currency, Ghana VAT (15%), and local payment methods (MTN MoMo, Vodafone Cash).

## Development Setup

### Backend
1. Navigate to `backend/`
2. Install dependencies: `pip install -r requirements.txt`
3. Run FastAPI: `python main.py` (Runs on http://localhost:8768)

### Frontend
1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`

## Build Commands

### Desktop
- Windows: `npm run dist:win`
- Linux: `npm run dist:linux`

### Web (Docker)
- `docker-compose up --build`

## Credentials
- Default Super Admin: (Configured during Setup Wizard)

## Business Modes
Once set during the first-launch wizard, the business mode can only be reset by a Super Admin.

## KDS (Kitchen Display System)
The KDS is designed to run on a separate monitor or tablet. Navigate to `/kitchen` in your browser or Electron window.

# Backend Build
FROM python:3.11-slim as backend

WORKDIR /app
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .
COPY scripts/ .

# Frontend Build
FROM node:20-slim as frontend

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Final Image
FROM python:3.11-slim

WORKDIR /app
COPY --from=backend /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=backend /usr/local/bin /usr/local/bin
COPY --from=backend /app/backend /app/backend
COPY --from=frontend /app/dist /app/frontend

EXPOSE 8768
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8768"]

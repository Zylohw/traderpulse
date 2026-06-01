# Frontend Dockerfile (Next.js)
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Backend Dockerfile (FastAPI)
FROM python:3.11-slim AS backend-builder

WORKDIR /app/backend

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .

# Production image
FROM node:18-alpine

WORKDIR /app

COPY --from=frontend-builder /app/frontend/public ./public
COPY --from=frontend-builder /app/frontend/.next ./.next
COPY --from=frontend-builder /app/frontend/node_modules ./node_modules
COPY --from=frontend-builder /app/frontend/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]

🚀 Redis Rate Limiter – Spring Boot + Redis + React Stock Tracker

A complete end-to-end system demonstrating:

✅ Rate Limiting using Spring Boot + Redis
✅ Token Bucket Algorithm
✅ Admin Dashboard for Monitoring Requests
✅ React Stock Tracker Frontend using Finnhub API
✅ Live Stock Prices + Charts
✅ Redis running via Docker

This project is ideal for learning API rate limiting, Redis, Spring Boot REST development, and React front-end integration.

🔧 Tech Stack
Backend

Spring Boot (Java)

Redis (Docker)

Token Bucket Rate Limiter

REST APIs

Finnhub Stock Price Fetching

Request Logging

Frontend

React + Vite

Tailwind CSS

Recharts (Stock charts)

Interactive rate-limit testing UI

📌 Features
🟥 1. Redis Token Bucket Rate Limiter

Per-user rate limiting

Token refill logic

Redis storage for tokens

Optional request logging

Handles high concurrency efficiently

🟦 2. Spring Boot API Endpoints
Test rate limit
GET /test?userId=<id>


200 → Request allowed

429 → Request blocked due to rate limit

Response clearly indicates whether the user was limited.

Admin Dashboard APIs

Total requests

Blocked requests

Request history

Useful for monitoring rate-limit behavior

🟩 3. React Stock Tracker

Used to test rate limiting visually.

Features

Input: User ID + Stock Symbol

Calls Spring Boot rate limiter first

If allowed → fetches real-time stock price from Finnhub

Displays:

Current price

Daily high/low

Charts (7-day, 1-month, etc.)

Shows history for each user separately

🟨 4. History Tracking

The frontend stores:

User ID

Stock symbol

Status (Success / Error / Rate Limited)

Price (if successful)

History is filtered by the current user, so each user sees only their own activity.

🟪 5. Admin Dashboard

A dedicated section for:

Viewing request logs

Tracking blocked requests

Observing per-user rate limit behavior

Perfect for demonstrating rate limiting visually.

🏗️ Project Structure
Redis_Rate_Limiter/
│
├── backend/
│   ├── Controller/
│   ├── RateLimiter/
│   ├── Config/
│   ├── Model/
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── api.js
│   │   ├── components/
│   │   └── StockChart.jsx
│   └── package.json
│
└── docker-compose.yml

🐳 Running the Project
1️⃣ Start Redis using Docker
docker compose up -d

2️⃣ Start Spring Boot backend
mvn spring-boot:run


Backend runs at:

http://localhost:8080

3️⃣ Start React frontend
npm install
npm run dev


📈 API Example
Request
GET http://localhost:8080/test?userId=john

Example Allowed Response (200)
Request allowed for user: john | Tokens left: 8

Example Blocked Response (429)
Rate limit exceeded for user: john

🌟 Future Enhancements

Visual Redis inspector

Advanced analytics on dashboard

Multiple API rate limits

JWT authentication

Real-time stock streaming



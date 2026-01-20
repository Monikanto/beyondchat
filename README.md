# BeyondChats – AI Article Aggregator

A full-stack web application that scrapes articles from BeyondChats, stores them in a database, and displays **original articles alongside AI-enhanced versions** for comparison.

This project was built as part of an internship assignment to demonstrate backend scraping, database design, API development, frontend integration, and deployment.

---

## Live Demo

- **Frontend**: https://beyondchat.vercel.app  
- **Backend API**: https://beyondchat-4.onrender.com  (it takes to wake up beacuse of free tier might not work that can boke whole site)
- **Articles API**: https://beyondchat-4.onrender.com/articles  

>  Note: Backend is hosted on Render free tier. The first request may take ~30 seconds due to cold start.

---

##  Features

- Scrapes articles from BeyondChats blog
- Stores articles in MongoDB with versioning
- Supports **original** and **AI-enhanced** article versions
- Graceful fallback if AI rewriting fails
- Clean React UI with Tailwind CSS
- Side-by-side comparison of original vs updated articles
- Fully deployed frontend and backend

---

##  Architecture Overview
Frontend (React + Tailwind)
|
| HTTP (REST API)
v
Backend (Node.js + Express)
|
v
MongoDB Atlas


---

##  Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Fetch API

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- Cheerio (for scraping)

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## Project Structure

beyondchat/
├── backend/
│ ├── src/
│ │ ├── server.js
│ │ ├── models/
│ │ ├── routes/
│ │ └── services/
│ ├── package.json
│ └── .env (not committed)
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── api/
│ │ └── main.jsx
│ ├── tailwind.config.js
│ └── package.json
│
└── README.md


---

##  How It Works

1. **Scraping**
   - The backend scrapes articles from BeyondChats using Cheerio.
   - Extracted data includes title, content, publish date, and source URL.

2. **Storage**
   - Articles are stored in MongoDB.
   - Each article has a `version` field (`original` or `updated`).
   - Updated articles reference the original using `parentArticleId`.

3. **AI Enhancement**
   - An optional AI rewrite pipeline is implemented.
   - If the AI provider is unavailable or rate-limited, the system falls back to original content.

4. **Frontend Display**
   - The frontend fetches articles from the backend API.
   - Original and updated articles are shown side-by-side for comparison.

---

##  AI Rewrite Note (Important)

AI rewriting depends on external LLM providers, which may be unavailable due to:
- API changes
- Rate limits
- Quota restrictions

To handle this, the system is designed to:
- Never crash if AI rewriting fails
- Always display original content
- Treat AI rewriting as an **optional enhancement layer**

This reflects real-world production design.

---

##  Local Setup (Optional)

###Git glone the repo and follow the below steps

### Backend
```bash
cd backend
npm install
npm run dev

MONGO_URI=your_mongodb_atlas_uri or localhost url

```
### frontend
```bash
cd frontend
npm install
npm run dev
```




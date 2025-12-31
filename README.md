# AxonGPT


AxonGPT is a simple AI-powered chat application built with **React (Vite)** on the frontend and a **Node.js + Express** backend.  
It uses **OpenAI GPT-4.0 Mini** to generate intelligent responses in real time.

This project focuses on clean **frontend–backend communication**, **OpenAI API integration**, and **secure environment variable usage**.

---

## 🚀 Features

- AI chat powered by OpenAI GPT-4.0 Mini  
- Simple and clean React (Vite) frontend  
- Node.js + Express backend  
- MongoDB integration  
- Secure API key handling using `.env`  

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite), JavaScript, CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **AI:** OpenAI GPT-4.0 Mini API  

---

## 📂 Project Structure

```

AxonGPT/
├── frontend/   # React (Vite) frontend
├── backend/    # Node.js + Express backend
└── README.md

---

## 🔐 Environment Variables

Create a `.env` file inside the **backend** folder:

```env
OPENAI_API_KEY=your_openai_api_key
MONGODB_URL=your_mongodb_connection_string
````

> ⚠️ Never commit the `.env` file to GitHub.

---

## ⚙️ Run Locally

### Start Backend

```bash
cd backend
npm install
npm start
```

Backend runs on:

```
http://localhost:8080
```

---

### Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on a **different local port** (shown in the terminal by Vite).


---

## 🔄 How It Works

1. User enters a prompt in the frontend
2. Frontend sends a request to the backend
3. Backend:

   * Communicates with MongoDB (if needed)
   * Sends the prompt to OpenAI GPT-4.0 Mini
4. AI response is returned and displayed

---

## 🚧 Future Improvements

*  User model

## ✨ Author

**Payal**
Built as a portfolio project 🚀


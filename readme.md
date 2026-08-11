# ResumeAI — AI Resume Analyzer

ResumeAI is a full-stack AI-powered resume analyzer built to help users understand the strengths and weaknesses of their resumes and receive actionable feedback for improvement.

Users can upload a PDF resume, extract its content, analyze it using AI, and view a structured report containing a resume score, summary, strengths, weaknesses, missing skills, and suggestions.

> **Note:** ResumeAI was built primarily as a learning project to practice full-stack development, authentication, file uploads, database operations, API development, and AI integration.

---

## ✨ Features

* User registration and login
* JWT-based authentication
* Access and refresh token handling
* Email verification
* Forgot and reset password
* Protected frontend routes
* Protected backend routes
* PDF resume upload
* Drag & drop file upload
* File type and size validation
* Cloudinary resume storage
* Resume text extraction
* AI-powered resume analysis
* Resume score out of 100
* AI-generated summary
* Strengths and weaknesses
* Missing skills detection
* Actionable suggestions
* Saved analysis results
* View previously uploaded resumes
* Delete resumes
* Profile page
* Responsive UI
* Loading and error states

---

## 🛠️ Tech Stack

### Frontend

* React
* React Router
* Vite
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Multer
* Cloudinary

### AI

* Ollama 
* Structured JSON responses

### Development Tools

* Git
* GitHub
* Postman
* VS Code
* npm

---

## 🔄 Application Flow

```text
Register
   ↓
Email Verification
   ↓
Login
   ↓
Dashboard
   ↓
Upload Resume
   ↓
Store PDF in Cloudinary
   ↓
Extract Resume Text
   ↓
AI Analysis
   ↓
Save Analysis in MongoDB
   ↓
Display Results
   ↓
View Previous Resumes
```

---

## 🤖 Resume Analysis

The AI analyzes the extracted resume content and returns structured feedback.

Example:

```json
{
  "score": 80,
  "summary": "Strong backend-focused resume with good project experience.",
  "strengths": [
    "Strong Node.js experience",
    "Good REST API development experience"
  ],
  "weaknesses": [
    "Limited deployment experience"
  ],
  "missingSkills": [
    "System Design",
    "Redis"
  ],
  "suggestions": [
    "Add measurable achievements to projects",
    "Include more deployment experience"
  ]
}
```

The analysis is stored in the database, so refreshing the Results page retrieves the existing analysis instead of generating a new AI response.

---

## 🔐 Authentication

ResumeAI uses JWT-based authentication with access and refresh tokens.

```text
Login
  ↓
JWT Tokens
  ↓
HTTP-only Cookies
  ↓
Protected API Requests
  ↓
JWT Verification Middleware
  ↓
Authenticated User
```

Frontend routes are also protected.

If an unauthenticated user attempts to access a protected page:

```text
Protected Page
      ↓
Authentication Check
      ↓
Not Authenticated
      ↓
Redirect to Login
```

---

## 📤 Resume Upload

Users can upload resumes using:

* File selection
* Drag & drop

### Validation

* PDF files only
* Maximum file size: 5 MB

Uploaded resumes are stored using Cloudinary.

---

## 📚 API Routes

### Authentication

```text
POST   /users/register
POST   /users/login
POST   /users/logout
GET    /users/get-current-user
POST   /users/verify-email
POST   /users/forgot-password
POST   /users/reset-password
POST   /users/refresh-token
```

### Resume

```text
POST   /resumes/upload
GET    /resumes/my-resumes
GET    /resumes/:resumeId
POST   /resumes/:resumeId/results
GET    /resumes/:resumeId/results
DELETE /resumes/:resumeId
```

---

## 📁 Project Structure

```text
ResumeAI/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── api/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   └── app.js
│   │
│   └── package.json
│
└── README.md
```

---

## ⚙️ Environment Variables

### Backend

Create a `.env` file in the backend:

```env
PORT=7000

MONGODB_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=your_access_token_expiry

REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=your_refresh_token_expiry

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

```

### Frontend

Create a `.env` file:

```env
VITE_API_URL=http://localhost:7000/api/v1
```

Never commit `.env` files to GitHub.

Add them to `.gitignore`:

```text
.env
.env.*
node_modules/
```

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>

cd ResumeAI
```

### 2. Setup Backend

```bash
cd backend

npm install

npm run dev
```

### 3. Setup Frontend

Open another terminal:

```bash
cd frontend

npm install

npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

The backend will run on:

```text
http://localhost:7000
```

---

## 🧪 Testing

API endpoints can be tested using Postman.

Recommended testing flow:

```text
Register
   ↓
Verify Email
   ↓
Login
   ↓
Upload Resume
   ↓
Extract Text
   ↓
Analyze Resume
   ↓
View Results
   ↓
View My Resumes
   ↓
Delete Resume
   ↓
Logout
```

---

## 🔒 Security

The application currently includes:

* JWT authentication
* HTTP-only authentication cookies
* Protected API routes
* Protected frontend routes
* User-specific resume authorization
* Input validation
* File type validation
* File size validation
* Centralized error handling

---

## ⚠️ Development Note

ResumeAI is primarily a **learning project** and is not intended to be used as a production authentication or resume-management service.

The authentication system is functional for development and learning purposes but has not been fully hardened for production use.

The project may not currently include production-level protections such as:

* Rate limiting
* Advanced anti-abuse protection
* Complete identity verification
* Comprehensive security auditing
* Production monitoring

**Do not use real passwords or sensitive personal information when testing the application.**

---

## 🔮 Future Improvements

* ATS score and optimization
* Job description matching
* Resume vs. job comparison
* AI-powered resume rewriting
* Resume templates
* Multiple resume versions
* Job recommendations
* Resume analytics
* Rate limiting
* Automated testing
* Production deployment
* Improved security hardening

---

## 🌐 Live Demo

Add your deployed application here once available:

```text
https://your-live-demo-url.com
```

---

## 👨‍💻 Author

**Lakshya Rana**

B.Tech Computer Science & Engineering

Built as a learning project using React, Node.js, Express, MongoDB, Cloudinary, and AI.

---

⭐ If you found this project useful, consider giving the repository a star.

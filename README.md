# Code Progress Tracker & Contest Aggregator

This project aims to provide a **unified platform** for programmers and competitive coders to **track their coding progress**, **analyze their growth**, and **stay updated on upcoming contests** from multiple platforms such as **Codeforces**, **LeetCode**, **CodeChef**, and **AtCoder**.  
It also integrates **AI-powered tools** for resume analysis, interview preparation, and personalized learning support.

---

## 🧠 Motivation

In the world of competitive programming and software development, coders often face the challenge of tracking their activities across multiple platforms.  
This project offers a **centralized hub** where users can:

- Track their coding performance automatically.  
- Get real-time contest updates from multiple sites.  
- Set personal goals and receive reminders.  
- Analyze resumes and prepare for interviews using AI tools.  
- Receive guidance from an AI-powered chatbot.

By combining progress tracking, analytics, and career readiness tools, this platform fosters **structured practice** and **career growth**.

---

## 🏗️ System Architecture

The architecture consists of:

- **Frontend:** React.js-based user interface for dashboards, analytics, and modules.  
- **Backend:** Node.js + Express.js for API communication and logic handling.  
- **Database:** MongoDB for storing user data, progress details, and contest information.  
- **Integration:** APIs and web scraping from Codeforces, LeetCode, CodeChef, and AtCoder.

### Core Flow:
1. User logs in via secure authentication.
2. System fetches coding activity and contest data.
3. Dashboard visualizes stats, progress, and insights.
4. AI modules analyze resumes and conduct mock interviews.
5. Users receive real-time reminders and notifications.

---

## 🧩 Modules Overview

### 1. **User Authentication Module**
Secure login, registration, and session handling using JWT with options like:
- Password encryption (`bcrypt` / `argon2`)
- Email verification
- Two-Factor Authentication (2FA)
- OTP-based password reset

---

### 2. **Question Tracking Module**
- Fetches user data from coding sites via APIs.  
- Displays progress by difficulty (Easy/Medium/Hard).  
- Provides topic-wise insights and goal-setting tools.  
- Features badges and streak tracking for motivation.

---

### 3. **Contest Aggregator Module**
- Central calendar for contests across platforms.  
- Search and filter contests by platform, date, or duration.  
- Set reminders via email/SMS/push notifications.  
- Integrates with Google/Outlook calendar.

---

### 4. **Analytics & Insights Module**
- Skill profiling and performance tracking.  
- Peer comparison and weekly reports.  
- AI recommendations (e.g., *“Focus more on DP problems”*).  
- Visual charts and summaries.

---

### 5. **Resume Analyzer Module**
- Upload resumes (PDF/DOCX).  
- NLP-based analysis for structure, content, and keyword optimization.  
- Job-role-based suggestions (e.g., SDE, Data Analyst).  
- ATS compatibility check and downloadable corrected version.

---

### 6. **AI Interview Module**
- Mock interviews for technical and behavioral rounds.  
- Real-time interaction using voice or text.  
- Evaluation on logic, communication, and confidence.  
- Instant AI-generated feedback and tips.

---

### 7. **AI Chatbot Assistant**
- Personalized learning guidance using GPT/Dialogflow.  
- Daily challenges and motivational prompts.  
- Assistance with navigating the platform.  
- Answers programming-related questions.

---

## ⚙️ System Requirements

### Software
- **Frontend:** React.js, HTML, CSS, JavaScript  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Version Control:** GitHub  
- **Deployment:** Vercel  
- **APIs:** Codeforces, LeetCode, CodeChef, AtCoder  

### Hardware
- **Processor:** Intel i3 or higher  
- **RAM:** 8GB+  
- **Storage:** 50GB free  
- **Internet:** Stable connection for API integration  

---

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ShreyasGadave/CodeGlide.git
   cd code-progress-tracker

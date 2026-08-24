# 🚀 CodeSphere — Developer Collaboration Platform

<div align="center">

![CodeSphere Banner](https://img.shields.io/badge/CodeSphere-Developer%20Collaboration-6366F1?style=for-the-badge&logo=code&logoColor=white)

**"One workspace for planning, coding, and collaborating."**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-Real--time-010101?style=flat-square&logo=socket.io&logoColor=white)](https://socket.io/)
[![License](https://img.shields.io/badge/License-MIT-F59E0B?style=flat-square)](LICENSE)

[Live Demo](#) · [Report Bug](../../issues) · [Request Feature](../../issues)

</div>

---

## 📋 About

**CodeSphere** is a comprehensive full-stack developer collaboration platform that brings together the best features of **GitHub**, **Trello**, **Discord**, and **Notion** into one unified workspace. It empowers teams to plan projects, manage tasks with Kanban boards, communicate in real-time, share files, and track productivity — all from a single, beautifully designed interface.

Built as a production-grade MERN stack application with real-time WebSocket communication, role-based access control, and a premium glassmorphism UI.

---

## ✨ Features

### 🏠 Dashboard
- Active projects overview with progress tracking
- Tasks due today & assigned tasks widgets
- Team members online (real-time)
- Weekly productivity chart
- Recent activity timeline

### 📋 Kanban Task Board
- **6-column workflow**: Backlog → To Do → In Progress → Review → Testing → Completed
- Drag-and-drop task cards between columns
- Task details: priority, labels, checklists, time tracking, comments, attachments
- Quick inline task creation

### 💬 Real-time Chat
- Private 1:1 messaging & team channels
- Typing indicators & online presence
- File sharing with image preview
- Read receipts & emoji support
- Message search

### 📁 Workspace Management
- Create & manage team workspaces
- Invite/remove members with role-based access
- Workspace-level files, calendar & settings
- **Roles**: Guest, Member, Admin

### 📊 Analytics Dashboard
- Tasks completed over time
- Team contribution charts
- Productivity metrics & scores
- Project completion tracking
- Weekly activity heatmap

### 📅 Calendar
- Monthly/weekly/daily views
- Deadline tracking & meeting events
- Personal reminders & holidays
- Color-coded event types

### 🔔 Notification System
- Real-time push notifications via WebSocket
- Task assigned, completed, comments, deadlines, member events
- Mark read/unread with filter options

### 🔐 Authentication & Security
- JWT-based authentication (access + refresh tokens)
- Email verification with OTP
- Password reset flow
- Role-based access control (RBAC)
- Rate limiting & input validation

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| React 18 + Vite | SPA framework with fast HMR |
| Tailwind CSS v3 | Utility-first styling with dark mode |
| React Router v6 | Client-side routing |
| Framer Motion | Animations & page transitions |
| @dnd-kit | Drag-and-drop for Kanban board |
| Axios | HTTP client for API calls |
| Lucide React | Beautiful icon library |
| Socket.IO Client | Real-time communication |

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database & ODM |
| JWT + bcrypt | Authentication & password hashing |
| Socket.IO | WebSocket server for real-time features |
| Nodemailer | Email service (verification, password reset) |
| Cloudinary | Cloud file storage |
| express-rate-limit | API rate limiting |
| express-validator | Request validation |

---

## 📁 Project Structure

```
codesphere/
├── client/                      # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/          # Button, Input, Modal, Avatar, Badge
│   │   │   ├── dashboard/       # StatCard, ActivityFeed, ProjectCard
│   │   │   ├── task/            # TaskCard, KanbanColumn, TaskDetailModal
│   │   │   ├── chat/            # MessageBubble, ChatInput, ConversationItem
│   │   │   └── workspace/       # MemberCard, FileCard
│   │   ├── context/             # AuthContext, ThemeContext
│   │   ├── hooks/               # useAuth, useTheme, useSocket
│   │   ├── layouts/             # AuthLayout, MainLayout, DashboardLayout
│   │   ├── pages/               # 15+ pages
│   │   ├── services/            # API layer (Axios)
│   │   └── utils/               # Constants, helpers, validators
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                      # Express Backend
│   ├── src/
│   │   ├── config/              # DB, Cloudinary, Email configs
│   │   ├── controllers/         # 9 route controllers
│   │   ├── middleware/           # Auth, RBAC, validation, error handling
│   │   ├── models/              # 11 Mongoose models
│   │   ├── routes/              # 9 API route files
│   │   ├── services/            # Auth, email, file services
│   │   ├── sockets/             # Socket.IO handlers
│   │   └── utils/               # ApiError, logger, helpers
│   └── .env.example
│
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/atlas) free tier)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/codesphere.git
   cd codesphere
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB URI, JWT secrets, etc.
   ```

3. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   ```

4. **Configure Environment Variables** (`server/.env`)
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://your-connection-string
   JWT_SECRET=your-super-secret-jwt-key
   JWT_REFRESH_SECRET=your-refresh-secret-key
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   CLIENT_URL=http://localhost:5173
   ```

5. **Run Development Servers**
   ```bash
   # Terminal 1 — Backend
   cd server && npm run dev

   # Terminal 2 — Frontend
   cd client && npm run dev
   ```

6. **Open** → [http://localhost:5173](http://localhost:5173)

---

## 🎨 Design System

| Element | Value |
|---------|-------|
| **Primary** | `#6366F1` (Indigo) |
| **Accent** | `#06B6D4` (Cyan) |
| **Success** | `#10B981` (Emerald) |
| **Warning** | `#F59E0B` (Amber) |
| **Danger** | `#F43F5E` (Rose) |
| **Dark BG** | `#0F172A` (Slate 900) |
| **Font** | Inter (Google Fonts) |
| **Style** | Glassmorphism + Gradients |
| **Animations** | Framer Motion |

---

## 📡 API Endpoints

| Module | Method | Endpoint | Auth |
|--------|--------|----------|------|
| **Auth** | POST | `/api/auth/register` | No |
| | POST | `/api/auth/login` | No |
| | POST | `/api/auth/logout` | Yes |
| | POST | `/api/auth/forgot-password` | No |
| | POST | `/api/auth/reset-password` | No |
| | POST | `/api/auth/verify-otp` | No |
| **Users** | GET | `/api/users` | Yes |
| | GET | `/api/users/:id` | Yes |
| | PUT | `/api/users/:id` | Yes |
| | DELETE | `/api/users/:id` | Yes |
| **Workspaces** | CRUD | `/api/workspaces` | Yes |
| **Projects** | CRUD | `/api/projects` | Yes |
| **Tasks** | CRUD | `/api/tasks` | Yes |
| **Messages** | CRUD | `/api/messages` | Yes |
| **Notifications** | GET/PUT/DELETE | `/api/notifications` | Yes |
| **Files** | POST/GET/DELETE | `/api/files` | Yes |
| **Dashboard** | GET | `/api/dashboard/stats` | Yes |

---

## 🗺️ Roadmap

- [x] Authentication (JWT, OTP, Password Reset)
- [x] Landing Page with glassmorphism design
- [x] Dashboard with activity feed & stats
- [x] Workspace management
- [x] Project management
- [x] Kanban task board with drag-and-drop
- [x] Real-time chat (Socket.IO)
- [x] Calendar with events
- [x] Notification system
- [x] Analytics dashboard
- [x] Admin panel
- [x] User profile & settings
- [ ] GitHub integration
- [ ] AI task prioritization
- [ ] Voice & video calls
- [ ] Live collaborative code editor
- [ ] Sprint management
- [ ] Docker deployment
- [ ] Microservices architecture

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/your-profile)

---

<div align="center">

**⭐ Star this repo if you found it helpful!**

Made with ❤️ and lots of ☕

</div>

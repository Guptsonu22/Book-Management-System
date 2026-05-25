# 📚 BookShelf — Book Management System

A modern, full-featured **Book Management System** built with **React + Vite**, backed by **MockAPI** for real CRUD operations. Clean UI, dark mode, real-time search, and genre filtering.

> 🚀 **Live Demo**: [https://book-management-system-rouge.vercel.app](https://book-management-system-rouge.vercel.app)  
> 🐙 **GitHub**: [https://github.com/yourusername/book-management-system](https://github.com/yourusername/book-management-system)

---

## ✨ Features

| Feature | Description |
|---|---|
| 📋 **Book List** | Responsive card grid showing title, author, genre, year |
| ➕ **Add Book** | Validated form to add books via POST API |
| ✏️ **Edit Book** | Pre-filled form with PUT API update |
| 🗑️ **Delete Book** | Confirmation modal + DELETE API call |
| 🔍 **Search** | Real-time search by title or author |
| 🏷️ **Genre Filter** | Dropdown filter across 10 genres |
| 🌙 **Dark Mode** | System-aware, persisted to localStorage |
| 📱 **Responsive** | Mobile-first, works on all screen sizes |
| 🔔 **Toast Alerts** | Success/error notifications for all actions |
| 💡 **Empty State** | Contextual UI for no books / no search results |
| ⚡ **Loading States** | Spinner + inline loading indicators |
| ❌ **Error Handling** | Retry button on API failures |

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Routing**: React Router DOM v6
- **HTTP**: Axios with interceptors
- **Styling**: Tailwind CSS v3 + custom design tokens
- **Icons**: React Icons (Feather)
- **Notifications**: React Toastify
- **API**: MockAPI.io (hosted REST mock)
- **Deployment**: Vercel

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx       # Top navigation with dark mode toggle
│   ├── BookCard.jsx     # Individual book card with actions
│   ├── BookForm.jsx     # Reusable Add/Edit form with validation
│   ├── SearchBar.jsx    # Real-time search input
│   ├── GenreFilter.jsx  # Genre dropdown filter
│   ├── ConfirmModal.jsx # Delete confirmation dialog
│   ├── Spinner.jsx      # Loading spinner + full page loader
│   └── EmptyState.jsx   # No results UI
├── pages/
│   ├── Home.jsx         # Main book list page
│   ├── AddBook.jsx      # Add book page
│   └── EditBook.jsx     # Edit book page
├── services/
│   └── api.js           # Axios instance + all API calls
├── hooks/
│   └── useBooks.js      # Custom hook for book state management
├── App.jsx              # Root component with routing & dark mode
├── main.jsx             # Entry point
└── index.css            # Global styles + Tailwind base
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/book-management-system.git
cd book-management-system
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the API

The app uses **MockAPI** as its backend. The default MockAPI URL is pre-configured in `.env`.

To use your own MockAPI:
1. Go to [mockapi.io](https://mockapi.io) and create a free account
2. Create a new project
3. Add a resource called `books` with these fields:
   - `title` (string)
   - `author` (string)
   - `genre` (string)
   - `year` (number)
   - `description` (string)
4. Copy the base URL and update `.env`:

```env
VITE_API_BASE_URL=https://your-project-id.mockapi.io/api/v1
```

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for production

```bash
npm run build
npm run preview
```

---

## 🌐 Deploying to Vercel

### Option A: Vercel CLI (Recommended)

```bash
npm install -g vercel
vercel login
vercel --prod
```

When prompted:
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

Set the environment variable in Vercel dashboard:
- `VITE_API_BASE_URL` = your MockAPI URL

### Option B: Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Repository
3. Set `VITE_API_BASE_URL` in Environment Variables
4. Deploy

---

## 📡 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/books` | Fetch all books |
| `GET` | `/books/:id` | Fetch single book |
| `POST` | `/books` | Create a new book |
| `PUT` | `/books/:id` | Update existing book |
| `DELETE` | `/books/:id` | Delete a book |

**Book Schema:**
```json
{
  "id": "1",
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Fiction",
  "year": 1925,
  "description": "A story of the fabulously wealthy Jay Gatsby...",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

---

## 🎨 Genres Supported

Fiction • Sci-Fi • Education • Biography • Mystery • Fantasy • History • Romance • Technology • Other

---

## 📝 License

MIT License — feel free to use this project for your portfolio or learning.

---

Made with ❤️ using React + Vite

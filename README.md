# BookShelf - Book Management System 📚

A modern and responsive Book Management System built using React and Tailwind CSS with full CRUD functionality, real-time search/filtering, dark mode, and smooth UI interactions.

## 🔗 Live Demo
**Live Demo:** https://book-management-system-tau.vercel.app

## ✨ Features

| Feature | Status |
|--------|--------|
| Add Books | ✅ |
| Edit Books | ✅ |
| Delete Books | ✅ |
| Search Functionality | ✅ |
| Genre Filtering | ✅ |
| Responsive Design | ✅ |
| Dark Mode | ✅ |
| Toast Notifications | ✅ |

## 🛠️ Tech Stack

- **Frontend**: React 18 (Vite)
- **Styling**: Tailwind CSS v3
- **Routing**: React Router v6
- **Icons**: React Icons (Feather)
- **Notifications**: React Toastify
- **Backend / API**: `json-server` (local mock API)
- **Deployment**: Vercel

## 📸 Screenshots

### Home Page
<img width="1917" height="911" alt="Home Page" src="https://github.com/user-attachments/assets/53dc1605-0572-42bf-9812-4519b3915fe0" />

### Add Book Form
<img width="1918" height="922" alt="Add Book" src="https://github.com/user-attachments/assets/75928932-1d96-4a46-a156-7596983e5e6b" />

### Edit Book Modal / Form
<img width="1910" height="907" alt="Edit Book" src="https://github.com/user-attachments/assets/b3ffc445-25a8-458c-a7cb-79cf440056b5" />

### Delete Confirmation Modal
<img width="1918" height="912" alt="Delete Modal" src="https://github.com/user-attachments/assets/c11ba129-b8f7-47e9-91da-55a68bdd7093" />

## 🚀 Setup Instructions

Follow these steps to run the project locally.

### 1. Install Dependencies

Make sure you have Node.js installed. Run the following command in the project directory:

```bash
npm install
```

### 2. Start the Application

The project uses `concurrently` to run both the React Vite server and the local `json-server` with a single command.

```bash
npm run dev
```

- The local API server will start on `http://localhost:3001` using `db.json` for data.
- The React application will automatically open or be available at `http://localhost:5173` (or whichever port Vite assigns).

> **Note on API Configuration**: The API requests are proxied via Vite to avoid CORS issues in development (configured in `vite.config.js`).

## 🔌 API Information

This project uses `json-server` as a mock backend API for handling CRUD operations locally. When deployed to Vercel (a static host), the app intelligently falls back to a simulated Mock API using `localStorage` to ensure full CRUD functionality remains working for reviewers without requiring a separate backend deployment.

## 💡 Production-Ready Improvements Implemented

- Added Hover Animations on Cards (Premium lift and shadow effect).
- Empty State (Clear messaging when no books match search).
- Loading Spinners & Skeleton Grid Loading.
- Sticky Navbar (`z-50`) with backdrop blur.
- Debounced search UX (with "Searching..." indicator) to prevent excessive API calls.
- Proper Form Validation (Title, Author, Genre, and Publication Year).
- Fixed card heights with `line-clamp-3` for descriptions to maintain a clean grid.
- Page title updates dynamically (`document.title`).
- Fully mobile-responsive layouts.

## 📁 Folder Structure

```
src/
 ├── components/
 ├── pages/
 ├── services/
 ├── hooks/
 ├── utils/
 ├── index.css
 └── App.jsx
```

## 👨‍💻 Author

**Sonu Gupta**  
GitHub: https://github.com/Guptsonu22

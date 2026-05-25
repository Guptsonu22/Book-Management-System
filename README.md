# BookShelf - Book Management System 📚

A modern, responsive React application for managing a collection of books. Built for a technical assignment.

## 🔗 Live Demo
> **[View Live Application Here](https://your-deployed-url.vercel.app)** *(Replace this with your deployed link)*

## ✨ Features

- **Full CRUD Operations**: View, Add, Edit, and Delete books.
- **Search & Filter**: Real-time debounced search by title/author, and filtering by genre.
- **Modern UI**: Clean design, dark mode support, glassmorphism effects, and CSS animations.
- **Skeleton Loading**: Premium animated loading states.
- **Validation**: Comprehensive form validation including empty fields and year range validation.
- **Notifications**: Toast notifications for success/error feedback.
- **Responsive**: Fully optimized for mobile, tablet, and desktop views.

## 🛠️ Tech Stack

- **Frontend**: React 18 (Vite)
- **Styling**: Tailwind CSS v3
- **Routing**: React Router v6
- **Icons**: React Icons (Feather)
- **Notifications**: React Toastify
- **Backend / API**: `json-server` (local mock API)

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

## 📸 Screenshots

*(Replace the paths below with your actual screenshot images before submitting)*

### Home Page
![Home Page](./screenshots/home.png)

### Add Book Form
![Add Book Form](./screenshots/add-book.png)

### Edit Book Modal / Form
![Edit Book Form](./screenshots/edit-book.png)

### Delete Confirmation Modal
![Delete Confirmation](./screenshots/delete-modal.png)

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

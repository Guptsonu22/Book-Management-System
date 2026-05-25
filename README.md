# BookShelf - Book Management System 📚

A modern, responsive React application for managing a collection of books. Built for a technical assignment.

## 🔗 Live Demo
> **[View Live Application Here](https://book-management-system-tau.vercel.app/)** 

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

### Home Page
![Home Page](<img width="1917" height="911" alt="1" src="https://github.com/user-attachments/assets/53dc1605-0572-42bf-9812-4519b3915fe0" />
)

### Add Book Form
![Add Book Form](<img width="1918" height="922" alt="2" src="https://github.com/user-attachments/assets/75928932-1d96-4a46-a156-7596983e5e6b" />
)

### Edit Book Modal / Form
![Edit Book Form](<img width="1910" height="907" alt="3" src="https://github.com/user-attachments/assets/b3ffc445-25a8-458c-a7cb-79cf440056b5" />
)

### Delete Confirmation Modal
![Delete Confirmation](<img width="1918" height="912" alt="4" src="https://github.com/user-attachments/assets/c11ba129-b8f7-47e9-91da-55a68bdd7093" />
)

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

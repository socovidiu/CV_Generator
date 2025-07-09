# CV Builder Frontend

This is the frontend application for the CV Generator project. Built with **React**, it provides a user-friendly interface to create, preview, and export professional resumes as PDFs.

## ✨ Features

- 📝 Dynamic form inputs for CV sections (personal info, education, experience, skills)
- 🔍 Live resume preview as you type
- 📄 Export the resume to PDF
- 🎨 Clean and responsive UI

## 🚀 Getting Started

### 1. Install Dependencies

Navigate into the frontend folder and install the required packages:

```bash
cd cv-builder-frontend
npm install
```

### Run the App

```bash
npm start
```

This will start the app at http://localhost:3000.

### Project structure

```
cv-builder-frontend/
│
├── public/               # Static assets
├── src/
│   ├── api/               # API utility functions
│   ├── assets/            # Images and static resources
│   ├── components/        # Reusable components (e.g., InputField, ResumePreview)
│   ├── pages/             # Pages like CV builder
│   ├── types/             # TypeScript interfaces and types
│   ├── App.tsx            # Main App component
│   ├── main.tsx           # Entry point for the React app
│   ├── App.css            # App-wide styles
│   └── index.css          # Tailwind and base styles
│
├── package.json
└── README.md
```

### 🛠️ Technologies Used
- React + Vite – UI library
- JavaScript/TypeScript – App logic
= TailwindCSS – Styling

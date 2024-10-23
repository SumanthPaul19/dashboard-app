# Dashboard App

This project is a personal dashboard application built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to register, login, create and manage notes, and upload/download documents. It also includes functionality to edit and delete notes and documents, providing a storage solution for personal notes and files.

# Start the application based on your path [It starts the UI](Ex: \dashboard-app\ ) : npm start 
# Start the backend server based on your path(Ex:\dashboard-app\backend\ ) : node server.js

Project Setup

Before you begin, ensure you have met the following requirements:

You have installed Node.js and npm.
You have installed MongoDB (either local or through MongoDB Atlas).
You have installed Git.
Cloning the Repository
bash
Copy code
git clone 
cd dashboard-app
Installing Dependencies
Run the following command to install both frontend and backend dependencies:

bash
Copy code
# Navigate to the backend and install dependencies
cd backend
npm install

# Navigate to the frontend and install dependencies
cd ../
npm install

Setting Up Environment Variables
In the backend/ directory, create a .env file to configure your MongoDB connection:

# plaintext & Copy code
MONGODB_URI=<Your MongoDB connection URI>
PORT=5000

Ensure you have a directory called uploads/ in the backend directory for storing uploaded documents.

Available Scripts
In the project directory, you can run:

The frontend will be accessible at http://localhost:3000
The backend will be accessible at http://localhost:5000

# Key Features:
User Authentication: Users can register and login to the application.
Notes Management: Users can create, edit, and delete personal notes.
File Management: Users can upload documents, download them, and delete them from the system.
Storage: Notes and documents are securely stored in MongoDB.


# The project structure follows the standard MERN stack separation of concerns:

dashboard-app/
├── backend/                 # Contains the backend Express server and API
│   ├── models/              # Mongoose models (User, Note, Document)
│   ├── routes/              # API routes (auth.js, notes.js, documents.js)
│   ├── uploads/             # Folder to store uploaded documents
│   └── server.js            # Express server entry point
├── src/                     # Contains the frontend React application
│   ├── components/          # Reusable UI components (Header, Footer, etc.)
│   ├── pages/               # Application pages (Login, Register, Home, etc.)
│   ├── App.js               # Main App entry point
│   └── index.js             # React entry point
└── .env                     # Environment variables for backend (not pushed to Git)


# API Endpoints

POST	/api/auth/register	Registers a new user
POST	/api/auth/login	Logs in an existing user
GET	/api/notes/:userId	Fetches notes for a user
POST	/api/notes	Creates a new note
PUT	/api/notes/:id	Updates an existing note
DELETE	/api/notes/:id	Deletes a note
GET	/api/documents/:userId	Fetches documents for a user
POST	/api/documents	Uploads a new document
GET	/api/documents/download/:id	Downloads a document
DELETE	/api/documents/:id	Deletes a document









Dashboard App

This project is a personal dashboard application built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to register, login, create and manage notes, and upload/download documents. It also includes functionality to edit and delete notes and documents, providing a storage solution for personal notes and files.

Start the application based on your path [It starts the UI](Ex: \dashboard-app\ ) : npm start 
Start the backend server based on your path(Ex:\dashboard-app\backend\ ) : node server.js

Project Setup
Prerequisites
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

plaintext
Copy code
MONGODB_URI=<Your MongoDB connection URI>
PORT=5000
Ensure you have a directory called uploads/ in the backend directory for storing uploaded documents.

Available Scripts
In the project directory, you can run:

npm run dev
Runs both the backend and frontend concurrently in development mode using concurrently.

The frontend will be accessible at http://localhost:3000
The backend will be accessible at http://localhost:5000

Key Features:
User Authentication: Users can register and login to the application.
Notes Management: Users can create, edit, and delete personal notes.
File Management: Users can upload documents, download them, and delete them from the system.
Storage: Notes and documents are securely stored in MongoDB.
Folder Structure
The project structure follows the standard MERN stack separation of concerns:



API Endpoints
Method	Endpoint	Description
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


Frontend Pages
Landing Page: Default page before user login.
Login Page: Allows users to authenticate.
Register Page: New user registration.
Home Page: Displays user’s notes and documents with full CRUD functionality.


Deployment:
To deploy the app for production, you can build the React frontend and serve it via the Express backend.

Step 1: Build the React frontend:
bash
Copy code
npm run build
This creates a build/ folder in the root directory.

Step 2: Serve the frontend via Express:
In backend/server.js, serve the static React files using this code:

js
Copy code
const path = require('path');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});


Learn More
Create React App Documentation
Express Documentation
MongoDB Documentation
React Documentation
















<!-- # Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify) -->

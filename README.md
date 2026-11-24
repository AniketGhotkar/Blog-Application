# MERN Blog Application

A full-stack Blog Application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). Users can register, log in, create blog posts, view posts, and manage their own content through a simple and user-friendly interface.

## Features

### Authentication & Authorization
- User registration and login.
- Password hashing using bcrypt.
- JWT-based authentication.
- Token storage and session management.
- Protected routes for authenticated users.
- Automatic logout when the JWT expires.

### Blog Management
- Create new blog posts.
- View all published posts.
- View individual post details.
- View posts created by the logged-in user.
- Edit existing posts.
- Delete your own posts.
- Authorization checks to ensure users can manage only their own posts.

### Frontend
- React.js functional components and Hooks.
- React Router for navigation.
- Context API for global authentication state.
- Tailwind CSS for styling.
- Fetch API for backend integration.
- Reusable components for displaying blog posts.

### Backend
- Node.js and Express.js REST API.
- MongoDB database integration using Mongoose.
- JWT authentication middleware.
- Centralized error handling.
- Async error handling using a custom asyncHandler.
- Input validation and post ownership verification.
- CORS configuration for frontend-backend communication.

## Technologies Used

| Category | Technologies |
|---|---|
| Frontend | React.js, JavaScript, Tailwind CSS |
| Routing | React Router DOM |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcrypt |
| API Testing | Thunder Client |
| Version Control | Git, GitHub |

## Project Structure

```text
Blog-Application/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── index.html
│
├── .gitignore
└── README.md
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/Blog-Application.git
cd Blog-Application
```

Replace `YOUR_USERNAME` with your GitHub username.

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend server:

```bash
npm start
```

Use your actual backend start script if it differs from `npm start`.

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The Vite development server will usually run at:

```text
http://localhost:5173
```

## API Endpoints

The following endpoints are implemented in the application. Protected routes require a valid JWT in the Authorization header.

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/users/register` | Register a new user |
| POST | `/users/login` | Log in a user |

### Blog Posts

| Method | Endpoint | Description |
|---|---|---|
| POST | `/posts/add` | Create a new post |
| GET | `/posts/get` | Get all posts |
| GET | `/posts/user` | Get logged-in user's posts |
| GET | `/posts/:id` | Get a specific post |
| PUT | `/posts/:id` | Update a post |
| PATCH | `/posts/:id` | Partially update a post |
| DELETE | `/posts/:id` | Delete a post |

### Authentication Header

For protected API requests:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

## Learning Outcomes

Through this project, I practiced:

- Building RESTful APIs using Express.js.
- Connecting React frontend with a Node.js backend.
- Implementing JWT authentication and authorization.
- Managing global state using React Context API.
- Implementing CRUD operations.
- Handling API errors and asynchronous operations.
- Protecting routes and validating user permissions.
- Using Git and GitHub for version control.

## Future Improvements

- Refresh token implementation.
- HttpOnly cookie-based authentication.
- Search and filter blog posts.
- Pagination.
- User profile management.
- Rich text editor for blog content.

## Author

**Aniket Ghotkar**

[GitHub](https://github.com/AniketGhotkar)

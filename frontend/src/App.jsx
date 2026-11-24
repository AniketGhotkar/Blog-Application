import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import PostCard from "./components/PostCard";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import PostDetails from "./pages/PostDetails";
import MyPosts from "./pages/MyPosts";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
         <BrowserRouter>
            <div className="min-h-screen bg-gray-100">
                <Navbar />

                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/posts" element={<ProtectedRoute><Posts /></ProtectedRoute>} />
                    <Route path="/posts/:id" element={<ProtectedRoute><PostDetails /></ProtectedRoute>} />
                    <Route path="/my-posts" element={<ProtectedRoute><MyPosts /></ProtectedRoute>} />
                    <Route path="/create-post" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
                    <Route path="/edit-post/:id" element={<ProtectedRoute><EditPost /></ProtectedRoute>} />
                </Routes>
            </div>
        </BrowserRouter>
  );
}

export default App;
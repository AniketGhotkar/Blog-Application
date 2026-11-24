
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token, logout } = useAuth();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const data = await response.json();

                if (response.status === 401) {
                    logout();
                    navigate("/login");
                    return;
                }

                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch post");
                }

                setTitle(data.title);
                setContent(data.content);

            } catch (err) {
                setError(err.message);
            }
        }

        fetchPost();
    }, [id, token, logout, navigate]);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/posts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ title, content })
            });

            const data = await response.json();

            if (response.status === 401) {
                logout();
                navigate("/login");
                return;
            }

            if (!response.ok) {
                throw new Error(data.message || "Failed to update post");
            }

            alert("Post updated successfully!");
            navigate("/my-posts");

        } catch (err) {
            setError(err.message);
        }
    }


    return (
        <div className="max-w-2xl mx-auto mt-10 px-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6">Edit Post</h1>

                {error && <p className="text-red-600">{error}</p>}

                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-3 rounded-lg" />

                    <textarea value={content} onChange={(e) => setContent(e.target.value)} className="border p-3 rounded-lg min-h-40" />

                    <button type="submit" className="bg-green-600 text-white p-3 rounded-lg">Update Post</button>
                </form>
            </div>
        </div>
    );
}

export default EditPost;

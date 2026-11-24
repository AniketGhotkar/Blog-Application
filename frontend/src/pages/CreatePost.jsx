import {useState} from "react";
import {useNavigate} from "react-router-dom";

function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");4
    const navigate = useNavigate();

async function handleSubmit(e){
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:3000/posts/add`, {
                method: "POST",
                headers: {
                    "Content-Type":  "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    title,
                    content
                })
            });

            if (response.status === 401) {
                logout();
                navigate("/login");
                return;
            }

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message || "Create Post failde");
            }

            setTitle("");
            setContent("");
            navigate("/my-posts");
        } catch (error) {
            {error && <p className="text-red-600">{error}</p>}
        }
    }
    return (
        <div className="max-w-2xl mx-auto mt-10 px-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Post</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter post title" className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500" required />

                    <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your thoughts..." className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500 min-h-40" required />

                    <button type="submit" className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 font-semibold">Publish Post</button>
                </form>
            </div>
        </div>
    )
}

export default CreatePost;
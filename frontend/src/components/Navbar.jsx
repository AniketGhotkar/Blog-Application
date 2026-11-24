
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Navbar() {
    const navigate = useNavigate();
    const { token, logout } = useAuth();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <nav className="bg-white shadow-md px-8 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-green-600">MyBlog</h1>

            <div className="flex items-center gap-6">
                <Link to="/">Home</Link>

                {!token ? (
                    <>
                        <Link to="/login">Login</Link>

                        <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Register</Link>
                    </>
                ) : (
                    <>
                        <Link to="/posts">All Posts</Link>
                        <Link to="/my-posts">My Posts</Link>
                        <Link to="/create-post" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Create Post</Link>
                        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Logout</button>
                    </>
                )
                }
            </div>
        </nav>
    );
}

export default Navbar;

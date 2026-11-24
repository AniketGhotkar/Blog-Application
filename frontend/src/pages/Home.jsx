
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";


function Home() {
    const { token } = useAuth();

    return (
        <div className="max-w-5xl mx-auto mt-16 px-8">
            <div className="bg-white p-10 rounded-lg shadow-md text-center">
                {token ? (
                    <>
                        <h1 className="text-4xl font-bold text-gray-800">Welcome Back to MyBlog!</h1>
                        <p className="text-gray-600 mt-4">You are successfully logged in. Start sharing your thoughts with the world.</p>
                        <div className="mt-8">
                            <Link to="/posts" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">Explore Posts</Link>
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className="text-4xl font-bold text-gray-800">Welcome to MyBlog</h1>
                        <p className="text-gray-600 mt-4">Share your thoughts, express your ideas, and explore interesting posts from others.</p>
                        <div className="flex justify-center gap-4 mt-8">
                            <Link to="/register" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Get Started</Link>
                            <Link to="/login" className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300">Login</Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Home;

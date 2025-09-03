import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    username: username, 
                    password: password,
                }),
            });

            if (response.ok) {
                throw new Error("Login gagal");
            }

            const data = await response.json();
            console.log("Login berhasil:", data);

            if (data.token) {
                localStorage.setItem("token", data.token);
            }


        }catch (error) {
            console.error("Error during login:", error);
        }
        
 

    };

    return (
        <>
            <div className=" bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
                            <input 
                                type="text" 
                                id="username" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                placeholder="Masukkan username"
                            />
                        </div>
                        <div className="mb-6 relative">
                            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                id="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                placeholder="Masukkan password"

                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-[45px] text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>

                        </div>
                        <button 
                            type="submit" 
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                        >
                            Login
                        </button>
                    </form>
                </div>
                
            </div>
        </>
    )
}

export default Login
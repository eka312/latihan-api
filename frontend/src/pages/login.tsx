import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Navigate } from "react-router-dom";



function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const token = localStorage.getItem("token");

    if (token) {
        return <Navigate to="/" replace/>;
    }



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      
        try {
          const res = await fetch("http://127.0.0.1:8000/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });
      
          const data = await res.json();
      
          if (data.token) {
            localStorage.setItem("token", data.token);
            window.location.href = "/";
          } else {
            alert(data.message || "Login gagal!");
          }
        } catch (err) {
          console.error("Error during login:", err);
        }
      };
        
 

    

    return (
        <>
            <div className=" bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                            <input 
                                type="text" 
                                id="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                placeholder="Masukkan email"
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
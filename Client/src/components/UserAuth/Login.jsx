import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
function LoginPage() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [Error, setError] = useState("");

  const api = "http://localhost:5000";
  // Function to handle user login
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(api + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // User is logged in
        login(data.token);
        navigate("/");
      } else {
        // Login failed
        console.error("Login failed:", data.error);
        setError("Login failed: " + data.error);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("loggedIn") == "true") {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="text-red-400">{Error}</div>
          <div className="max-w-md mx-auto">
            <div className="">
              <h1 className="hidden md:block font-bold text-md md:text-xl text-center">
                <i className="text-amber-600  font-mono">P</i>
                <i className="text-blue-500 font-mono">i</i>
                <i className="text-purple-600 font-mono">n</i>
                <i className="text-emerald-600 font-mono">-GO</i>
                <span className="text-teal-600">.</span>
                <h1 className="text-2xl font-semibold">
                  Log in to your account
                </h1>
              </h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Email address"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email Address
                  </label>
                </div>
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Password"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <button
                    className="bg-blue-500 text-white rounded-md px-2 py-1"
                    onClick={(e) => handleLogin(e)}
                  >
                    Submit
                  </button>
                </div>
              </div>
              <div className="my-2">
                Create new account?
                <Link to="/signup" className="text-blue-500">
                  {" "}
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

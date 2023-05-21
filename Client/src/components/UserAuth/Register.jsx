import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [base64, setBase64] = useState("https://robohash.org/pluto/set=set3");
  const inputRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Error, setError] = useState("");
  const navigate = useNavigate();

  function showPreview(event) {
    if (event.target.files.length > 0) {
      var src = URL.createObjectURL(event.target.files[0]);
      console.log(src);
      toDataURL(src).then((dataUrl) => {
        setBase64(dataUrl);
        console.log(base64);
      });
    }
  }
  const toDataURL = (url) =>
    fetch(url)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      );
  function handleButtonClick() {
    inputRef.current.click();
  }

  // Function to handle user signup
  const api = "http://localhost:5000";
  const handleSignup = async () => {
    try {
      const img = base64;
      console.log(base64, img);
      const response = await fetch(api + "/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ img, name, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // User is signed up and logged in
        console.log("User is signed up and logged in:", data);
        navigate("/login");
      } else {
        // Signup failed
        console.error("Signup failed:", data.error);
        setError(data.error);
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="flex justify-between">
              <h1 className="text-2xl font-semibold">Create new account</h1>
              <h1 className="hidden md:block font-bold text-md md:text-xl text-center">
                <i className="text-amber-600  font-mono">P</i>
                <i className="text-blue-500 font-mono">i</i>
                <i className="text-purple-600 font-mono">n</i>
                <i className="text-emerald-600 font-mono">-GO</i>
                <span className="text-teal-600">.</span>
              </h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="text-red-400">{Error}</div>
              <div className="py-8 flex items-center text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="col-span-6 ml-2 sm:col-span-4 md:mr-3 mx-3">
                  <input
                    type="file"
                    id="file"
                    accept="image/*"
                    className="hidden"
                    ref={inputRef}
                    onChange={(e) => {
                      showPreview(e);
                    }}
                  />

                  <label
                    className="block text-gray-700 text-sm font-bold mb-2 text-center"
                    htmlFor="photo"
                  >
                    Profile Photo
                  </label>
                  <div className="text-center" onClick={handleButtonClick}>
                    {base64 ? (
                      <img
                        src={base64}
                        className="w-40 h-40 m-auto rounded-full shadow-lg border"
                      />
                    ) : (
                      <img
                        src="https://images.unsplash.com/photo-1531316282956-d38457be0993?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
                        className="w-40 h-40 m-auto rounded-full shadow"
                      />
                    )}
                  </div>
                </div>
                <div>
                  <div className="relative my-4">
                    <input
                      autocomplete="off"
                      id="Name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setBase64("https://robohash.org/" + name + "/set=set3");
                      }}
                      required
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                    />
                    <label
                      for="Name"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Name
                    </label>
                  </div>
                  <div className="relative my-4">
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                    />
                    <label
                      for="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>
                  <div className="relative my-4">
                    <input
                      autocomplete="off"
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                    />
                    <label
                      for="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative my-2">
                    <button
                      className="bg-blue-500 text-white rounded-md px-2 py-1"
                      onClick={(e) => handleSignup(e)}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
              <div className="my-2">
                Already have an account?
                <Link to="/login" className="text-blue-500">
                  {" "}
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

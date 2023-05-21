import React, { useEffect, createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/UserAuth/Login";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import "./index.css";
import "./App.css";
import Account from "./components/Acoount";
import Footer from "./components/footer.jsx/footer";
import Register from "./components/UserAuth/Register";

export const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  login: () => {},
  logout: () => {},
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  function loginHandler(token) {
    setIsLoggedIn(true);
    sessionStorage.setItem("loggedIn", true);
    setToken(token);
    sessionStorage.setItem("token", token);
  }

  function logoutHandler() {
    setIsLoggedIn(false);
    sessionStorage.setItem("loggedIn", false);
    setToken(null);
    sessionStorage.setItem("token", null);
  }

  const authContextValue = {
    isLoggedIn: isLoggedIn,
    token: token,

    login: loginHandler,
    logout: logoutHandler,
  };

  useEffect(() => {
    const Session_token = sessionStorage.getItem("token");
    const Session_loggedin = sessionStorage.getItem("loggedIn");
    setIsLoggedIn(Session_loggedin);
    setToken(Session_token);
  }, []);

  return (
    <AuthContext.Provider value={authContextValue}>
      <BrowserRouter>
        <div className="bg-blue-50">
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/Account" element={<Account />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;

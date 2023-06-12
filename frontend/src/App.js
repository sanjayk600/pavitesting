import { useEffect, useState } from "react";
import { reactLocalStorage } from "reactjs-localstorage";

import "./App.css";
// import Login from "./components/Login";
import { useStateValue } from "./context/StateProvider";
import { Homepage, ViewLectures, LoginPage, FeedbackPage } from "./pages";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const user = reactLocalStorage.getObject("user");
    if (user?.type) {
      dispatch({
        type: "SET_USER",
        user: user,
      });
    }
  }, []);

  return !user ? (
    // <Login />
    <LoginPage />
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/:id" element={<Homepage />} />
        <Route path="/viewLectures" element={<ViewLectures />} />
        <Route path="/feedback" element={<FeedbackPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

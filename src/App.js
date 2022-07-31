import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import ChattingMain from "./pages/ChattingMain";
import Profile from "./pages/Profile";
import AuthProvider from "./context/auth";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/ChattingMain" element={<ChattingMain />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;

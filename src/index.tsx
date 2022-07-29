import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Main from "./pages/Main";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

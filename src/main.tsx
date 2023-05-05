import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AllContextContainer from "./contexts";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AllContextContainer>
      <App />
    </AllContextContainer>
  </React.StrictMode>
);

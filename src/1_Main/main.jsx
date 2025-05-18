import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "../App/AppMain.jsx";
import BookPage from "../App/BookPage.jsx";
// import CeuEstrelado from "../CeuEstreladoBackground/CeuEstrelado.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
    <App/>
    </>
  </StrictMode> 
);

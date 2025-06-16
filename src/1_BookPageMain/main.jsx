import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import CafurnaGame from "../GameCode/Cafurna/gameCafurna";
import CoruripeGame from "../GameCode/Coruripe/gameCoruripe";
import BookPage from "../SpecificBookPage/page"
import Header from "../header/Header";
import Footer from "../footer/Footer";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
      <Header/>
      <CafurnaGame/>
      <CoruripeGame/>
      <Footer/>	
    </>
  </StrictMode>
);

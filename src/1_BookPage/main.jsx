import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import CafurnaGame from "../GameCode/Cafurna/gameCafurna";
import CoruripeGame from "../GameCode/Coruripe/gameCoruripe";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CafurnaGame/>
    <CoruripeGame/>
  </StrictMode>
);

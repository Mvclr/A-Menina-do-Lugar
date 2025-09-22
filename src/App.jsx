import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useApp } from "./context/AppContext.js";
import { AppProvider } from "./context/AppProvider.jsx";
import { SocketProvider } from "./context/SocketProvider.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import HomePage from "./pages/MainPage.jsx";
import GamePage from "./pages/GamePage.jsx";
import ItemPage from "./pages/ItemPage.jsx";

function AppRoutes() {
  const { loading } = useApp();

  if (loading) {
    return <LoadingSpinner size="lg" text="Carregando..." />;
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/games" element={<GamePage />} />
      <Route path="/item/:id" element={<ItemPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AppProvider>
          <SocketProvider>
            <AppRoutes />
          </SocketProvider>
        </AppProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
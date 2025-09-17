import React from "react";
import Header from "./pagesComponents/Header.jsx";
import CombinedSections from "./mainPageComponents/indexPage.jsx";
import Footer from "./pagesComponents/Footer.jsx";

// Página Principal
const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <CombinedSections />
      <Footer />
    </div>
  );
};

export default HomePage;

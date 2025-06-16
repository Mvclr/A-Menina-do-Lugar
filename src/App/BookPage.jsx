import Header from "../header/Header";
import Footer from "../footer/Footer";
import Book from "../books/Books";
import AboutUs from "../AboutUs/AboutUs";
import CoruripeGame from "../GameCode/Coruripe/gameCoruripe";
import CafurnaGame from "../GameCode/Cafurna/gameCafurna";



function BookPage() {
  return (
    <>
      <Header />
      <CafurnaGame/>
      <Footer/>
    </>
  );
}

export default BookPage;

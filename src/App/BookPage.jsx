import Header from "../header/Header";
import Footer from "../footer/Footer";
import Book from "../books/books";
import AboutUs from "../AboutUs/AboutUs";
import FallingLeaves from "../FallingLeaves/FallingLeaves";
import JogoCocada from "../GameCode/game";
function BookPage() {
  return (
    <>
      <Header />
      <JogoCocada/>
      <Footer />
    </>
  );
}

export default BookPage;

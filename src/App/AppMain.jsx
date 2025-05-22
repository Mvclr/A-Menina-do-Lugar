import Header from "../header/Header";
import Footer from "../footer/Footer";
import Book from "../books/Books";
import AboutUs from "../AboutUs/AboutUs";
import ContactUs from "../ContactUs/ContactUs";
function App() {
  return (
    <>
      <Header />
      <AboutUs/>
      <Book/>
      <ContactUs/>
      <Footer />
    </>
  );
}

export default App;

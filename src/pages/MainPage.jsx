import React from 'react';
import Header from './pagesComponents/Header.jsx';
import AboutSection from './mainPageComponents/AboutSection';
import ItemsSection from './mainPageComponents/ItemsSection';
import ContactSection from './mainPageComponents/ContactSection';
import Footer from './pagesComponents/Footer.jsx';

// Página Principal
const HomePage = ({ setCurrentPage, setSelectedItem }) => {
  return (
    <div className="min-h-screen">
      <Header currentPage="home" setCurrentPage={setCurrentPage} />
      <AboutSection />
      <ItemsSection setCurrentPage={setCurrentPage} setSelectedItem={setSelectedItem} />
      <ContactSection />
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
};

// // Componente Principal da App
// const App = () => {
//   const [currentPage, setCurrentPage] = useState('home');
//   const [selectedItem, setSelectedItem] = useState(null);

//   return (
//     <div className="App">
//       {currentPage === 'home' && (
//         <HomePage 
//           setCurrentPage={setCurrentPage} 
//           setSelectedItem={setSelectedItem}
//         />
//       )}
//       {currentPage === 'item' && (
//         <ItemPage 
//           item={selectedItem} 
//           setCurrentPage={setCurrentPage}
//         />
//       )}
//     </div>
//   );
// };
export default HomePage;

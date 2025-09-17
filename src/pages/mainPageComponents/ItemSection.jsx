import React from 'react';
import { useApp } from '../../context/AppContext';

const ItemsSection = () => {
  const { items, navigateToItem } = useApp();

  const handleItemClick = (item) => {
    navigateToItem(item.id);
  };

  return (
    <section id="items" className="relative py-20 bg-aml-light">
      <div 
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        style={{ 
          backgroundImage: "url('/images/fundos/Folhas-Fundo.png')", 
          backgroundRepeat: 'repeat', 
          backgroundSize: 'auto', 
          opacity: 0.3 
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-aml-dark mb-4">Nossos Livros</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-aml-primary to-aml-action mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer group overflow-hidden flex flex-col md:flex-row items-center"
              onClick={() => handleItemClick(item)}
            >
              <div className="md:w-1/3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-bold text-aml-dark mb-2 group-hover:text-aml-secondary transition-colors duration-300">
                    {item.name}
                  </h3>
                  <p className="text-aml-dark/80 mb-4">
                    {item.description}
                  </p>
                </div>
                <div className="flex justify-end mt-4">
                  <button className="bg-aml-secondary text-white font-bold py-2 px-6 rounded-full group-hover:bg-aml-accent transition-colors duration-300">
                    Ver mais
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ItemsSection;

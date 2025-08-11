import React from 'react';

// Página do Item Individual
const ItemPage = ({ item, setCurrentPage }) => {
  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Item não encontrado</h2>
          <button
            onClick={() => setCurrentPage('home')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header currentPage="item" setCurrentPage={setCurrentPage} />
      <div className="container mx-auto px-6 py-12">
        <button
          onClick={() => setCurrentPage('home')}
          className="mb-8 flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300 font-medium"
        >
          ← Voltar aos Produtos
        </button>
        
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-96 md:h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            
            <div className="p-12 flex flex-col justify-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {item.name}
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {item.description}
              </p>
              
              <div className="mb-8">
                <span className="text-4xl font-bold text-purple-600">{item.price}</span>
              </div>
              
              <div className="space-y-4">
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-500 hover:to-purple-500 transform hover:scale-105 transition-all duration-300 shadow-lg">
                  Comprar Agora
                </button>
                
                <button className="w-full border-2 border-purple-600 text-purple-600 py-4 rounded-xl font-bold text-lg hover:bg-purple-600 hover:text-white transition-all duration-300">
                  Adicionar ao Carrinho
                </button>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Características:</h3>
                <ul className="space-y-2 text-gray-600">
                  {item.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default ItemPage;
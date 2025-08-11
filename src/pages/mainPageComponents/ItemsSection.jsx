import React from 'react';
// Dados mock dos itens
const itemsData = [
  {
    id: 1,
    name: "Cafurna",
    image: "src/Images/Livro-Cafurna-Capa.png",
    description: "Nos juntamos a Lua para descobrir um pouco sobre a cultura dessa cidade encantadora!",
    price: "R$ 299,99",
    features: ["Alta qualidade e durabilidade", "Design moderno e elegante", "Garantia de 12 meses", "Suporte técnico especializado"]
  },
  {
    id: 2,
    name: "Viçosa",
    image: "src/Images/Livro-Viçosa-Capa.png",
    description: "Nos juntamos a Rodrigo para descobrir um pouco sobre a cultura dessa cidade encantadora onde mora sua avó!",
    price: "R$ 199,99",
    features: ["Atendimento personalizado", "Profissionais qualificados", "Resultados garantidos", "Acompanhamento contínuo"]
  },
  {
    id: 3,
    name: "Coruripe",
    image: "src/Images/Livro-Coruripe-Capa.png",
    description: "Nos juntamos a Lua para descobrir um pouco sobre a cultura dessa cidade encantadora onde mora sua tia Ju!",
    price: "R$ 499,99",
    features: ["Tecnologia de ponta", "Interface intuitiva", "Integração completa", "Suporte 24/7"]
  },
  {
    id: 4,
    name: "Muquém",
    image: "src/Images/Livro-Muquem-Capa.png",
    description: "Nos juntamos a Lua para descobrir um pouco sobre a cultura dessa cidade encantadora onde mora sua prima Tita!",
    price: "R$ 399,99",
    features: ["Análise detalhada", "Estratégias personalizadas", "Implementação assistida", "Monitoramento de resultados"]
  }
];

// Componente Items Grid
const ItemsSection = ({ setCurrentPage, setSelectedItem }) => {
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setCurrentPage('item');
  };

  return (
    <section id="items" className="relative overlay-hidden py-20 bg-gradient-to-tr from-lime-100 to-green-100">
      <div
        className="absolute inset- w-full h-full z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/src/Images/Folhas-Fundo.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          opacity: 0.25
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 container mx-auto px-6">
          <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            Nossos <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Livros</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubra nossos livros incríveis que contam histórias de cidades encantadoras e suas culturas únicas.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {itemsData.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 overflow-hidden group"
              onClick={() => handleItemClick(item)}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {item.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-purple-600">{item.name}</span>
                  <span className="text-blue-500 font-medium group-hover:text-purple-600 transition-colors duration-300">
                    Ver mais →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>  
      
    </section>
  );
};


export default ItemsSection
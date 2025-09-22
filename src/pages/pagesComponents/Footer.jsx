import React from "react";

const Footer = () => {
  return (
    <footer className="bg-aml-dark text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <div className="flex-1"></div>
          <div className="text-center flex-1">
            <p className="text-aml-primary font-bold text-lg mb-2">A Menina Do Lugar</p>
            <p className="text-sm text-white/80">
              &copy; 2025 A Menina Do Lugar. Todos os direitos reservados.
            </p>
            <div className="mt-4">
              <a href="#" className="text-white/80 hover:text-aml-primary mx-2">Termos de Serviço</a>
              <span className="text-white/50">|</span>
              <a href="#" className="text-white/80 hover:text-aml-primary mx-2">Política de Privacidade</a>
            </div>
          </div>
          <div className="flex-shrink-0 flex-1 flex justify-end">
            <img src="/images/logos/ifal-logo.png" alt="Logo IFAL" className="h-20" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
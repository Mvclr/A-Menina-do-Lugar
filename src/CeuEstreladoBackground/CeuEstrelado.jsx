import React from "react";
import "./CeuEstrelado.css";

const CeuEstrelado = () => {
  const stars = Array.from({ length: 300 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 4 + 1}px`,
    duration: `${Math.random() * 5 + 3}s`,
  }));

  return (
    <div className="starry-background">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDuration: star.duration,
          }}
        />
      ))}
    </div>
  );
};

export default CeuEstrelado;

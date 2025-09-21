import React, { useState, useRef } from 'react';

// Pass the image path and dimensions as props
const CoordinatePicker = ({ imageUrl, imageWidth, imageHeight }) => {
  const [coords, setCoords] = useState([]);
  const svgRef = useRef();

  const handleSvgClick = (event) => {
    // Get the SVG element's bounding box
    const svgPoint = svgRef.current.createSVGPoint();
    svgPoint.x = event.clientX;
    svgPoint.y = event.clientY;

    // Convert screen coordinates to SVG coordinates
    const transformedPoint = svgPoint.matrixTransform(
      svgRef.current.getScreenCTM().inverse()
    );

    const newCoord = {
      x: Math.round(transformedPoint.x),
      y: Math.round(transformedPoint.y),
    };

    // Log to console for easy copy-paste
    console.log(`{ x: ${newCoord.x}, y: ${newCoord.y} },`);

    // Add to the list of coordinates on screen
    setCoords(prevCoords => [...prevCoords, newCoord]);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-2">Clique no Tabuleiro para Obter as Coordenadas</h2>
      <p className="text-center mb-4">As coordenadas aparecerão no console do desenvolvedor, prontas para copiar.</p>
      
      <svg
        ref={svgRef}
        viewBox={`0 0 ${imageWidth} ${imageHeight}`}
        className="w-full h-auto cursor-crosshair"
        onClick={handleSvgClick}
      >
        <image href={imageUrl} width={imageWidth} height={imageHeight} />

        {/* Display clicked points on the board */}
        {coords.map((coord, index) => (
          <g key={index}>
            <circle cx={coord.x} cy={coord.y} r="10" fill="red" opacity="0.7" />
            <text x={coord.x + 15} y={coord.y + 5} fill="white" fontSize="16">
              {index + 1}
            </text>
          </g>
        ))}
      </svg>

      <div className="mt-4 bg-gray-100 dark:bg-gray-800 p-4 rounded">
        <h3 className="font-bold">Coordenadas Clicadas:</h3>
        <pre className="whitespace-pre-wrap text-sm">
          {coords.map((c, i) => `{ x: ${c.x}, y: ${c.y} },\n`)}
        </pre>
      </div>
    </div>
  );
};

export default CoordinatePicker;

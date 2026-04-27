import React, { useState } from "react";

const CursorSection = () => {
  const [showLogo, setShowLogo] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section className="w-full py-10 px-5 md:px-16">
      <div
        className="max-w-6xl mx-auto border-2 border-gray-300 rounded-xl p-6 bg-white relative overflow-hidden"
        onMouseEnter={() => setShowLogo(true)}
        onMouseLeave={() => setShowLogo(false)}
        onMouseMove={handleMouseMove}
      >
        {/* TEXT */}
        <h2 className="text-2xl font-bold mb-6">
          Hover inside this box 👇
        </h2>

        {/* IMAGE */}
        <img
          src="https://images.unsplash.com/photo-1522199710521-72d69614c702"
          alt="section"
          className="w-full rounded-lg"
        />

        {/* CURSOR LOGO */}
        {showLogo && (
          <div
            className="absolute z-50 pointer-events-none"
            style={{
              left: position.x,
              top: position.y,
              transform: "translate(-50%, -50%)",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/25/25694.png"
              alt="logo"
              className="w-10 h-10"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default CursorSection;
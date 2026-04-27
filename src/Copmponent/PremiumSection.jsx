import React, { useRef, useState } from "react";

const PremiumSection = () => {
  const containerRef = useRef(null);

  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();

    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section className="w-full flex justify-center py-20 bg-black">
      
      <div
        ref={containerRef}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onMouseMove={handleMove}
        className="w-[90%] max-w-6xl rounded-3xl p-8 
        bg-gradient-to-r from-purple-700 to-purple-500 
        relative overflow-hidden group
        transition-all duration-500 ease-out
        hover:scale-[1.01] "
      >
        
        {/* 🔥 CURSOR GLOW */}
        {show && (
          <div
            className="absolute pointer-events-none z-40"
            style={{
              left: pos.x,
              top: pos.y,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className="w-[300px] h-[300px] rounded-full opacity-30 blur-3xl transition-all duration-200"
              style={{
                background:
                  "radial-gradient(circle, rgba(168,85,247,0.6) 0%, rgba(168,85,247,0.2) 40%, transparent 70%)",
              }}
            />
          </div>
        )}

        {/* TEXT */}
        <div className="flex justify-between items-center mb-10 relative z-10">
          <h2 className="text-white text-2xl md:text-3xl font-semibold max-w-xl">
            An intuitive mobile companion for organizing your digital wallets
            and analyzing your financial health
          </h2>

          <span className="text-white text-3xl transition-all duration-300 group-hover:translate-x-2">
            →
          </span>
        </div>

        {/* PHONES */}
        <div className="relative flex justify-center items-end h-[420px] z-10">

          {/* LEFT */}
          <img
            src="https://i.imgur.com/8Km9tLL.png"
            alt=""
            className="absolute bottom-0 left-1/2 -translate-x-[110%] w-[230px] md:w-[280px]
            transition-all duration-500
            group-hover:-translate-x-[140%] group-hover:rotate-[-8deg]"
          />

          {/* CENTER */}
          <img
            src="https://i.imgur.com/j6l19aF.png"
            alt=""
            className="relative z-10 w-[260px] md:w-[320px]
            transition-all duration-500
            group-hover:scale-110"
          />

          {/* RIGHT */}
          <img
            src="https://i.imgur.com/2nCt3Sbl.png"
            alt=""
            className="absolute bottom-0 left-1/2 translate-x-[10%] w-[230px] md:w-[280px]
            transition-all duration-500
            group-hover:translate-x-[40%] group-hover:rotate-[8deg]"
          />

        </div>

        {/* 🔥 CURSOR FOLLOW BADGE */}
        {show && (
          <div
            className="absolute z-50 pointer-events-none"
            style={{
              left: pos.x,
              top: pos.y,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-xs font-bold shadow-lg
              transition-all duration-300 scale-90 group-hover:scale-110"
            >
              DISCOVER
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default PremiumSection;
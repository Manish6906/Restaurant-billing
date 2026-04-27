import React, { useEffect, useState } from "react";

const TextSection = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true); // page load hote hi animation start
  }, []);

  return (
    <section className="w-full h-screen flex items-center justify-center bg-gray-100">
      
      <div className="text-center max-w-xl">
        
        {/* HEADING */}
        <h1
          className={`text-4xl font-bold mb-4 transition-all duration-700 ease-out
          ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          Welcome to Our Website 🚀
        </h1>

        {/* PARAGRAPH */}
        <p
          className={`text-gray-600 text-lg transition-all duration-700 delay-200 ease-out
          ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          We create modern, beautiful and highly interactive web experiences 
          using React and Tailwind CSS.
        </p>

      </div>
    </section>
  );
};

export default TextSection;
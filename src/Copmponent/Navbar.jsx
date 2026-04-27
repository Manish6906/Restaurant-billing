import { useState, useRef } from "react";

const menuItems = [
  { label: "Guestbook", desc: "Let me know you were here", img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&q=80" },
  { label: "Bucket List", desc: "Things to do at least once in my life", img: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=600&q=80" },
];

const listItems = [
  { icon: "🔗", label: "Links", desc: "All my links are here" },
  { icon: "📖", label: "Uses", desc: "A peek into my digital..." },
  { icon: "💳", label: "Attribution", desc: "Journey to create this site" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const closeTimer = useRef(null);
  const [isPinned, setIsPinned] = useState(false);


  const handleMouseEnter = () => {
  if (closeTimer.current) clearTimeout(closeTimer.current);
  if (!isPinned) {
    setOpen(true);
  }
};
const handleMouseLeave = () => {
  if (!isPinned) {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  }
};

  // const handleMouseEnter = () => {
  //   if (closeTimer.current) clearTimeout(closeTimer.current);
  //   setOpen(true);
  // };

  // const handleMouseLeave = () => {
  //   closeTimer.current = setTimeout(() => setOpen(false), 150);
  // };

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <section className="bg-[#0d0d0d]"
    >
      <div className="container">

     
    <div className=" h-18   text-white font-sans relative">

      {/* Fixed Logo */}
      <div className="absolute top-5 left-7 z-50 text-lg font-extrabold tracking-tight">
        AB
      </div>

      {/* Fixed Right Icon */}
      <div className="absolute top-5 right-7 z-50 text-lg opacity-60 cursor-pointer">
        ⌘
      </div>

      {/* Center Navbar */}
      <div
  className={`fixed top-0 left-1/2 mt-2 -translate-x-1/2 z-[200] transition-all duration-300 ${
    open ? "w-[720px]" : "w-[370px]"
  }`}
>
  <div
    onMouseLeave={handleMouseLeave}
    className="bg-[rgba(38,38,38,0.92)] backdrop-blur-2xl border border-white/10 shadow-[0_12px_50px_rgba(0,0,0,0.7)] overflow-hidden rounded-[22px]"
  >
    
    {/* TOP NAV (CENTER FIXED) */}
    <div className="flex justify-center">
      <div className="flex items-center gap-1 px-3 py-2">
        <nav className="flex items-center">
          {["Home", "About", "Work", "Blog"].map((link) => (
            <button
              key={link}
              onClick={() => setActive(link)}
              className={`px-[14px] py-[6px] rounded-full text-[13.5px] font-medium transition-all duration-150 ${
                active === link
                  ? "bg-white/15 text-white font-semibold"
                  : "text-white/65 hover:bg-white/8 hover:text-white"
              }`}
            >
              {link}
            </button>
          ))}

          {/* MORE */}
          <button
            onMouseEnter={handleMouseEnter}
            onClick={() => {
  setIsPinned((prev) => !prev);
  setOpen((prev) => !prev);
}}
            className={`flex items-center gap-1 px-[14px] py-[6px] rounded-full text-[13.5px] font-medium ${
              active === "More"
                ? "bg-white/15 text-white font-semibold"
                : "text-white/65 hover:bg-white/8 hover:text-white"
            }`}
          >
            More
            <span
              className="text-[10px] opacity-55 transition-transform duration-200"
              style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              ▾
            </span>
          </button>
        </nav>
      </div>
    </div>

    {/* DROPDOWN */}
   <div
  onMouseEnter={cancelClose}
  className={`
    origin-top transform-gpu will-change-transform
    transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
    overflow-hidden
    ${open
      ? "opacity-100 scale-y-100 translate-y-0 max-h-[400px] py-4 px-6"
      : "opacity-0 scale-y-95 -translate-y-2 max-h-0 py-0 px-6 pointer-events-none"
    }
  `}
>
      <div className="grid grid-cols-3 gap-4">
        
        {/* LEFT CARDS */}
        {menuItems.map((item, i) => (
  <div
    key={item.label}
    className={`
      relative rounded-[13px] overflow-hidden h-[200px]
      transition-all duration-500
      ${open
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-4"
      }
    `}
    style={{
      transitionDelay: `${i * 100}ms`
    }}
  >
            <img
              src={item.img}
              className="w-full h-full object-cover brightness-[0.65]"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-[15px] font-bold">{item.label}</h3>
              <p className="text-[12px] text-white/70">{item.desc}</p>
            </div>
          </div>
        ))}

        {/* RIGHT LIST */}
        <div className="flex flex-col gap-3 justify-center">
          {listItems.map((item, i) => (
  <div
    key={item.label}
    className={`
      flex items-center gap-3 p-3 rounded-xl
      bg-white/7 hover:bg-white/12 transition-all duration-500
      ${open
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-4"
      }
    `}
    style={{
      transitionDelay: `${(i + 2) * 100}ms`
    }}
  >
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <h4 className="text-[13.5px] font-semibold">{item.label}</h4>
                <p className="text-[11px] text-white/50">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  </div>
</div>
    </div>
     </div>
    </section>
  );
}
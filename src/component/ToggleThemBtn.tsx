import { useEffect, useState } from "react";

// Toggle theme button
export default function ToggleThemBtn(){
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div
      onClick={() => setDarkMode(!darkMode)}
      className="absolute top-3 right-3 md:top-5 md:right-5 flex items-center justify-center bg-gradient-to-t from-violet-500 to-fuchsia-500 cursor-pointer rounded-md w-8 h-8 md:h-10 md:w-10 transition-all hover:scale-110"
    >
      <span
        className={`material-symbols-outlined text-white transition-transform duration-700 text-lg md:text-2xl ${
          darkMode ? "rotate-[360deg]" : "rotate-0"
        }`}
      >
        {darkMode ? "moon_stars" : "sunny"}
      </span>
    </div>
  );
}

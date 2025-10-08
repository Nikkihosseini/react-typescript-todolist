// Add Search & Filter functionality to Todo List

import { useState, useEffect, useRef } from "react";
import { setFilter } from "./features/filterSlice";
import { useAppDispatch } from "../hooks/hooks";

type FilterType = "All" | "Active" | "Completed";

export default function FilterToDo() {
  const dispatch = useAppDispatch();
  const filters: FilterType[] = ["All", "Active", "Completed"];

  const filterRef = useRef<HTMLDivElement | null>(null);
  const filterBtnRef = useRef<HTMLDivElement | null>(null);
  const [filterBtn, setFilterBtn] = useState(false);

  function toggleFilterToDo() {
    setFilterBtn((prev) => !prev);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node) &&
        filterBtnRef.current &&
        !filterBtnRef.current.contains(event.target as Node)
      ) {
        setFilterBtn(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        ref={filterRef}
        onClick={toggleFilterToDo}
        className="absolute top-3 left-3 md:top-5 md:left-5 flex items-center justify-center bg-gradient-to-t from-violet-500 to-fuchsia-500 cursor-pointer rounded-md w-8 h-8 md:h-10 md:w-10 transition-all hover:scale-110 z-20"
      >
        <span
          className={`material-symbols-outlined text-white transition-transform duration-500 text-lg md:text-2xl ${
            filterBtn ? "rotate-[360deg]" : "rotate-0"
          }`}
        >
          search
        </span>
      </div>

      <div
        ref={filterBtnRef}
        className={`absolute top-3 md:top-5 left-12 md:left-16 flex items-center justify-center font-semibold text-sky-900 dark:text-slate-400 bg-gradient-to-t from-violet-500/20 to-fuchsia-500/20 h-8 md:h-10 rounded-md gap-x-3 md:gap-x-5 z-10 overflow-hidden transition-transform origin-left ease-in-out duration-300 ${
          filterBtn ? "scale-x-100 p-2" : "scale-x-0 p-0"
        }`}
      >
        {filters.map((filter) => (
          <span
            key={filter}
            onClick={() => dispatch(setFilter(filter))}
            className={`${
              filterBtn ? "opacity-100 delay-150" : "opacity-0 delay-0"
            } text-sm md:text-base cursor-pointer dark:hover:text-fuchsia-500 hover:text-fuchsia-700 transition-opacity z-0`}
          >
            {filter}
          </span>
        ))}
      </div>
    </>
  );
}

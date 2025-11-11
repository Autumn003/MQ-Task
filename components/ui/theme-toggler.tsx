"use client";

import { cn } from "@/lib/utils";
import { IconMoonStars, IconSunFilled } from "@tabler/icons-react";
import { useState, useEffect } from "react";

export default function ThemeToggler({
  className,
  iconsClassName,
}: {
  className?: string;
  iconsClassName?: string;
}) {
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  });

  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDark((prev) => !prev);
  };

  return (
    <>
      <button
        className={cn(
          "border-neutral-200 dark:border-white/20 cursor-pointer rounded-xl border shadow-[-2px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]",
          className
        )}
        onClick={toggleTheme}
      >
        <div
          className={cn(
            "text-muted-foreground hover:text-secondary-foreground transition-all duration-200 ease-in-out hover:-rotate-20 flex items-center justify-center p-1.5",
            iconsClassName
          )}
        >
          {isDark ? (
            <IconSunFilled className="h-5 w-5" />
          ) : (
            <IconMoonStars className="h-5 w-5" />
          )}
        </div>
      </button>
    </>
  );
}

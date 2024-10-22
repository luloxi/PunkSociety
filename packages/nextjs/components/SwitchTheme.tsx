"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export const SwitchTheme = ({ className }: { className?: string }) => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const isDarkMode = resolvedTheme === "dark";

  const handleToggle = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      onClick={handleToggle}
      className={`flex cursor-pointer space-x-2 h-8 items-center hover:bg-[#C9D8E5] dark:hover:bg-[#193048] justify-start w-full rounded-lg pl-5 lg:pl-3 text-sm ${className}`}
    >
      <button className="swap swap-rotate flex flex-row gap-2 justify-start items-center">
        {isDarkMode ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
        <span>Switch theme</span>
      </button>
    </div>
  );
};

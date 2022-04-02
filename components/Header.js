import { HomeIcon } from '@heroicons/react/outline';
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import React from 'react';

const Header = () => {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  console.log("theme", theme)
  return (
    <div className="">
      {router.asPath !== '/' && <HomeIcon onClick={() => router.back()} className="h-7 text-cyan-600/60 m-2 cursor-pointer lg:col-span-4
      absolute transition-all transform duration-150 ease-out hover:text-gray-300 animate-pulse hover:animate-none" />}
      {theme === "dark" ?
        <SunIcon onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="navSunIcon" /> :
        <MoonIcon onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="navMoonIcon" />
      }
    </div>
  )
}

export default Header
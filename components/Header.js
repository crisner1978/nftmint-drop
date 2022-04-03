import { HomeIcon } from '@heroicons/react/outline';
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const Header = () => {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  console.log("theme", theme)
  return (
    <div className="">
      {router.asPath !== '/' &&
        <Link href="/">
          <HomeIcon className="homeIcon" />
        </Link>}
        <SunIcon onClick={() => setTheme(theme === "light" ? "dark" : "light")} className="navSunIcon" />
    </div>
  )
}

export default Header
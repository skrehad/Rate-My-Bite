"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/provider/UserProvider";
import { CircleUserRound, Menu, X } from "lucide-react";
import { Theme } from "../utils/Theme";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const pathname = usePathname();
  const { user, logOut } = useAuth()!;
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "Blog", href: "/blogs" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white  dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="container  px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="rounded"
          />
          <span className="text-xl font-bold italic text-black dark:text-white">
            Tasty Foods
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-lg font-semibold transition-colors ${
                pathname === item.href
                  ? "text-[#FF3C48]"
                  : "text-gray-800 dark:text-white hover:text-orange-400"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <Theme />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button>
                  {user?.photo ? (
                    <Image
                      src={user.photo}
                      alt="user"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <CircleUserRound size={36} className="text-gray-500" />
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>
                  {user.name || "My Account"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/dashboard">
                  <DropdownMenuItem>
                    Dashboard
                    <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </Link>
                <Link href="/profile">
                  <DropdownMenuItem>
                    Profile
                    <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={logOut}>
                  Logout
                  <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex gap-3">
              <Link
                href="/register"
                className="px-5 py-2 rounded-full border-2 border-[#FF3C48] text-[#FF3C48] hover:bg-[#FF3C48] hover:text-white font-semibold transition duration-300"
              >
                Sign Up
              </Link>
              <Link
                href="/login"
                className="px-5 py-2 rounded-full border-2 border-[#FF3C48] text-[#FF3C48] hover:bg-[#FF3C48] hover:text-white font-semibold transition duration-300"
              >
                Login
              </Link>
            </div>
          )}
          {/* Mobile Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-black dark:text-white"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block font-semibold text-md ${
                pathname === item.href
                  ? "text-orange-500"
                  : "text-gray-800 dark:text-white hover:text-orange-400"
              }`}
            >
              {item.label}
            </Link>
          ))}
          {!user && (
            <div className="pt-4 space-y-2">
              <Link
                href="/signUp"
                className="block text-md font-bold text-gray-800 dark:text-white"
              >
                Sign Up
              </Link>
              <Link
                href="/login"
                className="block text-md font-bold text-gray-800 dark:text-white"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

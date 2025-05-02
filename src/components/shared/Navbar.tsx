"use client"
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Theme } from "../utils/Theme";
import { useAuth } from "@/provider/UserProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { CircleUserRoundIcon } from "lucide-react";
import Image from "next/image";


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logOut } = useAuth()!
    const pathname = usePathname()
    return (
        <nav className="relative bg-white shadow dark:bg-gray-800">
            <div className="container px-6 py-4 mx-auto">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="flex items-center justify-between">
                        <a href="#">
                            <Image
                                className="w-auto h-6 sm:h-7"
                                src="https://merakiui.com/images/full-logo.svg"
                                alt="Logo"
                                width={100}
                                height={100}
                            />
                        </a>

                        {/* Mobile menu button */}
                        <div className="flex lg:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                type="button"
                                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none"
                                aria-label="toggle menu"
                            >
                                {!isOpen ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <div
                        className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${isOpen ? "translate-x-0 opacity-100" : "opacity-0 -translate-x-full"
                            }`}
                    >
                        <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
                            {[
                                { path: "/", label: "Home" },
                                { path: "/about", label: "About Us" },
                                { path: "/contact", label: "Contact Us" },
                                { path: "/posts", label: "Posts" },
                                { path: "/blogs", label: "Blogs" },


                            ].map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.path}
                                    className={`
                                        px-2.5  py-1.5 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform  lg:mt-0 dark:text-gray-200 hover:bg-primary hover:text-white dark:hover:bg-gray-700
                                        ${pathname === item.path
                                        && "bg-primary text-white "

                                        }
                                        `}

                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-4 mt-4 lg:mt-0">
                            <Theme />
                            {
                                user ?
                                    <button type="button" className="flex items-center focus:outline-none" aria-label="toggle profile dropdown">
                                        <div className="w-10 my-auto h-10 overflow-hidden  ">

                                            <DropdownMenu >
                                                <DropdownMenuTrigger asChild className="cursor-pointer">
                                                    <CircleUserRoundIcon height={40} className="text-gray-600" width={40} />

                                                </DropdownMenuTrigger>

                                                <DropdownMenuContent className="w-60 mr-4">
                                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuGroup>
                                                        <Link href={`/dashboard/${user?.role}`} className="cursor-pointer">
                                                            <DropdownMenuItem>
                                                                Dashboard
                                                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                                            </DropdownMenuItem>
                                                        </Link>
                                                        <Link href={`/profile/${user?.role}`}>
                                                            <DropdownMenuItem>
                                                                Profile
                                                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                                            </DropdownMenuItem>
                                                        </Link>

                                                        <DropdownMenuItem>
                                                            Settings
                                                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                                        </DropdownMenuItem>

                                                    </DropdownMenuGroup>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuGroup>

                                                        <DropdownMenuSub>
                                                            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                                                            <DropdownMenuPortal>
                                                                <DropdownMenuSubContent>
                                                                    <DropdownMenuItem>Email</DropdownMenuItem>
                                                                    <DropdownMenuItem>Message</DropdownMenuItem>
                                                                    <DropdownMenuSeparator />
                                                                    <DropdownMenuItem>More...</DropdownMenuItem>
                                                                </DropdownMenuSubContent>
                                                            </DropdownMenuPortal>
                                                        </DropdownMenuSub>
                                                        <DropdownMenuItem>
                                                            New Team
                                                            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuGroup>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>GitHub</DropdownMenuItem>
                                                    <DropdownMenuItem>Support</DropdownMenuItem>
                                                    <DropdownMenuItem disabled>API</DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onClick={() => logOut()}>
                                                        Log out
                                                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                        <h3 className="mx-2 text-gray-700 dark:text-gray-200 lg:hidden">Khatab wedaa</h3>
                                    </button> : <Link className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" href={'/login'}>Login</Link>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

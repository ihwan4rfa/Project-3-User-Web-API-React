import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";
import NavbarMobile from "./NavbarMobile";

const Navbar = () => {

    const token = localStorage.getItem('access_token');
    const handleLogout = () => {
        localStorage.removeItem('access_token');
    }

    const [transitionIn, setTransitionIn] = useState(true);
    setTimeout(() => {
        setTransitionIn(false)
    }, 0)

    const data = useContext(ThemeContext);

    useEffect(() => {
        data.theme === "dark" ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark");
    }, [data.theme]);

    const handleThemeSwitch = () => {
        data.setThemeButtonClicked(true);
        data.setTheme(data.theme === "dark" ? "light" : "dark");
        setTimeout(() => {
            data.setThemeButtonClicked(false);
        }, 500)
    }

    const [isToggleMenuClicked, setIsToggleMenuCliccked] = useState(false);
    const handleToggleMenu = () => {
        setIsToggleMenuCliccked(!isToggleMenuClicked);
    }

    return (
        <>
            <div className={`fixed z-50 flex w-full h-10 transition-all ${data.themeButtonClicked ? 'duration-0' : 'duration-300'} ease-in-out bg-white dark:bg-slate-900 shadow-md font-montserrat dark:shadow-slate-700 ${transitionIn && !token ? 'opacity-0' : ''}`}>
                <div className="flex items-center justify-between w-full mx-6 md:mx-16">
                    <Link to={"/"}><h1 className="font-semibold text-slate-900 dark:text-white"><i className="mr-3 text-lg text-blue-600 fa-solid fa-user-secret dark:text-teal-600"></i>SpyMasters</h1></Link>
                    <div className="flex gap-6 text-sm font-semibold">
                        <button onClick={handleThemeSwitch}><i class={`fa-solid ${data.theme === "dark" ? 'fa-sun text-white hover:text-teal-600' : 'fa-moon text-slate-900 hover:text-blue-600 mr-[2px]'}`}></i></button>
                        <button className="inline md:hidden" onClick={handleToggleMenu}><i class={`fa-solid text-slate-900 dark:text-white ${isToggleMenuClicked ? 'fa-xmark text-[21px]' : 'fa-bars text-lg'}`}></i></button>
                        <div className="hidden gap-6 md:flex">
                            <Link to="/"><p className="cursor-pointer text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-teal-400">Home</p></Link>
                            <a target="_blank" href="https://github.com/ihwan4rfa" className="cursor-pointer text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-teal-400">Contact Us</a>
                            <Link to="/login" onClick={handleLogout}><p className="cursor-pointer text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-teal-400">{token ? 'Logout' : 'Log In'}</p></Link>
                        </div>
                    </div>
                </div>
            </div>
            <NavbarMobile token={token} handleLogout={handleLogout} isToggleMenuClicked={isToggleMenuClicked} />
        </>
    )
}

export default Navbar;
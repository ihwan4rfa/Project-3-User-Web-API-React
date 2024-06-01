import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

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
    }

    return (
        <div className={`fixed z-50 flex w-full h-10 transition-all ${data.themeButtonClicked ? 'duration-0' : 'duration-300'} ease-in-out bg-white dark:bg-slate-900 shadow-md font-montserrat ${transitionIn && !token ? 'opacity-0' : ''}`}>
            <div className="flex items-center justify-between w-full mx-16">
                <Link to={"/"}><h1 className="font-semibold text-slate-900 dark:text-white"><i className="mr-3 text-lg fa-solid fa-user-secret text-sky-600 dark:text-fuchsia-600"></i>SpyMasters</h1></Link>
                <div className="flex gap-5 text-sm font-semibold">
                    <button onClick={handleThemeSwitch}>dark mode</button>
                    <Link to="/"><p className="cursor-pointer text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-fuchsia-400">Home</p></Link>
                    <Link to="/login" onClick={handleLogout}><p className="cursor-pointer text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-fuchsia-400">{token ? 'Logout' : 'Log In'}</p></Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
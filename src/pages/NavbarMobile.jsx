import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

const NavbarMobile = (props) => {

    const { token, handleLogout, isToggleMenuClicked } = props;
    const data = useContext(ThemeContext);

    return (
        <div className={`fixed bg-white dark:bg-slate-900 w-full py-3 text-sm font-medium rounded-b-xl pt-12 z-40 inline md:hidden transition-all ease-in-out ${data.themeButtonClicked ? 'duration-0' : 'duration-300'} shadow-md font-montserrat dark:shadow-slate-700 ${isToggleMenuClicked ? 'translate-y-[0px]' : '-translate-y-[150px]'}`}>
            <Link to="/"><p className="mx-6 my-3 cursor-pointer text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-teal-400">Home</p></Link>
            <a target="_blank" href="https://github.com/ihwan4rfa" className="mx-6 my-3 cursor-pointer text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-teal-400">Contact Us</a>
            <Link to="/login" onClick={handleLogout}><p className="mx-6 my-3 cursor-pointer text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-teal-400">{token ? 'Logout' : 'Log In'}</p></Link>
        </div>
    )
}

export default NavbarMobile;
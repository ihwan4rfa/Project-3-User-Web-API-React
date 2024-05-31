import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {

    const token = localStorage.getItem('access_token');
    const handleLogout = () => {
        localStorage.removeItem('access_token');
    }

    const [transitionIn, setTransitionIn] = useState(true);
    setTimeout(() => {
        setTransitionIn(false)
    }, 0)

    return (
        <div className={`fixed z-50 flex w-full h-10 transition-all duration-300 ease-in-out bg-white shadow-md font-montserrat ${transitionIn && !token ? 'opacity-0' : ''}`}>
            <div className="flex items-center justify-between w-full mx-16">
                <Link to={"/"}><h1 className="font-semibold text-slate-900"><i className="mr-3 text-lg fa-solid fa-user-secret text-sky-600"></i>SpyMasters</h1></Link>
                <div className="flex gap-5 text-sm font-semibold">
                    <Link to="/"><p className="cursor-pointer text-slate-900 hover:text-sky-600">Home</p></Link>
                    <Link to="/login" onClick={handleLogout}><p className="cursor-pointer text-slate-900 hover:text-sky-600">{token ? 'Logout' : 'Log In'}</p></Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
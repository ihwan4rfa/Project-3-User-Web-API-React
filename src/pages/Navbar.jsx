import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

    const token = localStorage.getItem('access_token');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');

        setTimeout(() => {
            navigate('/login')
        }, 1000);
    }

    return (
        <div className="fixed z-50 flex w-full h-10 bg-white shadow-md font-montserrat">
            <div className="flex items-center justify-between w-full mx-16">
                <h1 className="font-semibold text-slate-900"><i className="mr-3 text-lg fa-solid fa-user-secret text-sky-600"></i>SpyMasters</h1>
                <div className="flex gap-5 text-sm font-semibold">
                    <Link to="/"><p className="cursor-pointer text-slate-900 hover:text-sky-600">Home</p></Link>
                    <Link to="/login" onClick={handleLogout}><p className="cursor-pointer text-slate-900 hover:text-sky-600">{token ? 'Logout' : 'Log In'}</p></Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Loading from "./Loading"
import Navbar from "./Navbar"
import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

const MainContent = () => {

    const navigate = useNavigate();
    const [emailRegister, setEmailRegister] = useState("");
    const [passwordRegister, setPasswordRegister] = useState("");
    const [tokenRegister, setTokenRegister] = useState(null);
    const [errorRegister, setErrorRegister] = useState(null);

    const handleChangeEmailRegister = (event) => {
        setEmailRegister(event.target.value)
        setErrorRegister(null)
    }

    const handleChangePasswordRegister = (event) => {
        setPasswordRegister(event.target.value)
        setErrorRegister(null)
    }

    const handleRegister = async () => {
        const payLoadRegister = {
            email: emailRegister,
            password: passwordRegister
        };

        try {
            const response = await axios.post(
                "https://reqres.in/api/register",
                payLoadRegister
            );
            setTokenRegister(response.data.token)

            setTimeout(() => {
                toggleButton();
                setLoginClicked(true);
            }, 1500)
        } catch (error) {
            const errorMessageRegister = error.response.data.error;
            setErrorRegister(errorMessageRegister);
        }
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(null);
    const [errorLogin, setErrorLogin] = useState(null);

    const handleChangeEmail = (event) => {
        setEmail(event.target.value)
        setErrorLogin(null)
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value)
        setErrorLogin(null)
    }

    const handleLogin = async () => {
        const payLoad = {
            email: email,
            password: password
        };

        try {
            const response = await axios.post(
                "https://reqres.in/api/login",
                payLoad
            );
            const token = response.data.token
            setToken(token);
            localStorage.setItem("access_token", token);

            setTimeout(() => {
                activeTransitionOut();
            }, 1000)

            setTimeout(() => {
                navigate("/");
            }, 1500)

        } catch (error) {
            const errorMessage = error.response.data.error;
            setErrorLogin(errorMessage)
        }
    };

    const accountList = {
        google: 'fa-brands fa-google-plus-g',
        facebook: 'fa-brands fa-facebook',
        github: 'fa-brands fa-github',
        linkedin: 'fa-brands fa-linkedin'
    };

    const [btnClicked, setBtnClicked] = useState(false);
    const [loginClicked, setLoginClicked] = useState(true);
    const [registerClicked, setRegisterClicked] = useState(false);
    const toggleButton = () => {
        setBtnClicked(!btnClicked);
        setLoginClicked(!loginClicked);
        setRegisterClicked(!registerClicked);
        setErrorLogin(null);
        setErrorRegister(null);
        setTokenRegister(null);
        setEmail('');
        setEmailRegister('');
        setPassword('');
        setPasswordRegister('');
        setSeePassword(false)
    }

    useEffect(() => {
        loginClicked ? navigate("/login") : navigate("/register");
    }, [loginClicked]);

    const [seePassword, setSeePassword] = useState(false);
    const toggleSeePassword = () => {
        setSeePassword(!seePassword)
    }

    const [transitionOut, setTransitionOut] = useState(false);
    const activeTransitionOut = () => {
        setTransitionOut(!transitionOut)
    }

    const [transitionIn, setTransitionIn] = useState(true);
    setTimeout(() => {
        setTransitionIn(false)
    }, 0)

    const data = useContext(ThemeContext);

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen font-montserrat bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-700">
            <div className={`bg-white dark:bg-slate-900 rounded-[30px] translate-y-[4%] shadow-lg relative overflow-hidden w-1/2 max-w-full min-h-[400px] transition-all ease-in-out ${data.themeButtonClicked ? 'duration-0' : 'duration-300'} ${transitionOut ? 'opacity-0' : ''} ${transitionIn ? 'opacity-0' : ''}`}>
                <div className={`absolute top-0 h-full transition-all duration-500 ease-in-out w-1/2 ${registerClicked ? 'z-20 translate-x-[100%]' : 'z-10 translate-x-[0%]'}`}>
                    <div className="flex flex-col items-center justify-center h-full px-10 bg-white dark:bg-slate-900">
                        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Create Account</h1>
                        <div className="mt-2 mb-3">
                            {Object.values(accountList).map((iconClass, index) => (
                                <a className="inline-flex items-center justify-center mx-1 mt-4 mb-2 text-sm border border-slate-300 hover:border-slate-400 dark:border-slate-700 dark:hover:border-slate-600 rounded-xl w-9 h-9 text-slate-900 dark:text-white" href=""><i key={index} className={iconClass}></i></a>
                            ))}
                        </div>
                        <span className="mb-2 text-xs text-slate-900 dark:text-white">or use your email for registration</span>
                        <input value={emailRegister} onChange={handleChangeEmailRegister} className="bg-slate-200 placeholder:text-slate-400 text-slate-900 dark:text-white dark:bg-slate-800 dark:placeholder:text-slate-500 my-2 py-[10px] px-4 text-[13px] rounded-lg w-full outline-none" type="text" placeholder="Email" />
                        <div className="flex bg-slate-200 dark:bg-slate-800 my-2 py-[10px] px-4 text-[13px] rounded-lg w-full">
                            <input value={passwordRegister} onChange={handleChangePasswordRegister} className="w-full outline-none bg-slate-200 placeholder:text-slate-400 text-slate-900 dark:text-white dark:bg-slate-800 dark:placeholder:text-slate-500" type={seePassword ? 'text' : 'password'} placeholder="Password" />
                            <button onClick={toggleSeePassword}><i className={`text-slate-400 dark:text-slate-500 fa-solid ${seePassword ? 'fa-eye' : 'fa-eye-slash'}`}></i></button>
                        </div>
                        {tokenRegister ? <h1 className="text-[12px] text-green-500"><i className="mr-1 fa-solid fa-circle-check"></i>registration success!</h1> : ""}
                        {errorRegister ? <h1 className="text-[12px] text-red-500 text-center"><i className="mr-1 fa-solid fa-triangle-exclamation"></i>{errorRegister}</h1> : ""}
                        <button onClick={handleRegister} className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white text-[12px] py-[10px] px-8 rounded-lg font-semibold tracking-tight uppercase mt-3">Register</button>
                    </div>
                </div>
                <div className={`absolute top-0 h-full transition-all duration-500 ease-in-out w-1/2 ${loginClicked ? 'z-20 translate-x-[0%]' : 'z-10 translate-x-[100%]'}`}>
                    <div className="flex flex-col items-center justify-center h-full px-10 bg-white dark:bg-slate-900">
                        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Log In</h1>
                        <div className="mt-2 mb-3">
                            {Object.values(accountList).map((iconClass, index) => (
                                <a className="inline-flex items-center justify-center mx-1 mt-4 mb-2 text-sm border border-slate-300 hover:border-slate-400 dark:border-slate-700 dark:hover:border-slate-600 rounded-xl w-9 h-9 text-slate-900 dark:text-white" href=""><i key={index} className={iconClass}></i></a>
                            ))}
                        </div>
                        <span className="mb-2 text-xs text-slate-900 dark:text-white">or use your email password</span>
                        <input value={email} onChange={handleChangeEmail} className="bg-slate-200 placeholder:text-slate-400 text-slate-900 dark:text-white dark:bg-slate-800 dark:placeholder:text-slate-500 my-2 py-[10px] px-4 text-[13px] rounded-lg w-full outline-none" type="text" placeholder="Email" />
                        <div className="flex bg-slate-200 dark:bg-slate-800 my-2 py-[10px] px-4 text-[13px] rounded-lg w-full">
                            <input value={password} onChange={handleChangePassword} className="w-full outline-none bg-slate-200 placeholder:text-slate-400 text-slate-900 dark:text-white dark:bg-slate-800 dark:placeholder:text-slate-500" type={seePassword ? 'text' : 'password'} placeholder="Password" />
                            <button onClick={toggleSeePassword}><i className={`text-slate-400 dark:text-slate-500 fa-solid ${seePassword ? 'fa-eye' : 'fa-eye-slash'}`}></i></button>
                        </div>
                        {token ? <h1 className="text-[12px] text-green-500"><i className="mr-1 fa-solid fa-circle-check"></i>log In success!</h1> : ""}
                        {errorLogin ? <h1 className="text-[12px] text-red-500 text-center"><i className="mr-1 fa-solid fa-triangle-exclamation"></i>Log In failed! {errorLogin}</h1> : ""}
                        <button onClick={handleLogin} className="bg-sky-600 hover:bg-sky-700 text-white text-[12px] py-[10px] px-8 rounded-lg font-semibold tracking-tight uppercase mt-3">Log In</button>
                    </div>
                </div>
                <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-500 ease-in-out z-30 ${btnClicked ? '-translate-x-[100%] rounded-r-[100px]' : 'translate-x-[0%] rounded-l-[100px]'}`}>
                    <div className={`bg-gradient-to-r from-fuchsia-600 to-sky-600 h-full text-white relative -left-[100%] w-[200%] transition-all duration-500 ${btnClicked ? 'translate-x-[50%]' : 'translate-x-[0%]'}`}>
                        <div className="absolute w-1/2 h-full flex flex-col items-center justify-center px-[30px] text-center top-0 transition-all duration-500 ease-in-out translate-x-[0%]">
                            <h1 className="text-2xl font-semibold tracking-tight">Welcome Back!</h1>
                            <p className="text-sm my-5 mx-[25px]">Enter your secret identity to discover all our members!</p>
                            <button onClick={toggleButton} className="text-white text-[12px] py-[10px] px-8 rounded-lg font-semibold tracking-tight uppercase mt-3 border hover:bg-white hover:text-fuchsia-700">Log In</button>
                        </div>
                        <div className="absolute w-1/2 h-full flex flex-col items-center justify-center px-[30px] text-center top-0 transition-all duration-500 ease-in-out translate-x-[100%]">
                            <h1 className="text-2xl font-semibold tracking-tight">New here?</h1>
                            <p className="text-sm my-5 mx-[25px]">Create an account with your secret identity and join our community!</p>
                            <button onClick={toggleButton} className="text-white text-[12px] py-[10px] px-8 rounded-lg font-semibold tracking-tight uppercase mt-3 border hover:bg-white hover:text-sky-700">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const LoginRegister = () => {
    const [isLoading, setIsLoading] = useState(true)

    setTimeout(() => {
        setIsLoading(false);
    }, 1300)

    return (
        <div>
            {isLoading ?
                <Loading /> :
                <div>
                    <Navbar />
                    <MainContent />
                </div>}
        </div>
    )
}

export default LoginRegister;
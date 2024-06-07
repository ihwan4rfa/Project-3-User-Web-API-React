import { useParams } from "react-router-dom"
import Navbar from "./Navbar"
import { useEffect, useState } from "react";
import axios from "axios";

const User = () => {

    const param = useParams();
    const [user, setUserDetail] = useState({});

    const getUserDetail = () => {
        axios
            .get(`https://reqres.in/api/users/${param?.id}`)
            .then((res) => {
                const response = res?.data?.data;
                setUserDetail(response);
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getUserDetail();
    }, [])

    const [transitionIn, setTransitionIn] = useState(true);
    setTimeout(() => {
        setTransitionIn(false)
    }, 0)

    return (
        <div>
            <Navbar />
            <div className={`relative flex flex-col h-screen items-center pt-24 font-montserrat transition-all duration-300 ease-in-out bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-700 ${transitionIn ? 'opacity-0' : ''}`}>
                <img className="z-10 w-40 h-40 border-8 border-white rounded-full dark:border-slate-900" src={user?.avatar} alt="" />
                <div className="absolute z-0 w-auto px-10 pt-20 pb-12 mt-24 tracking-tight text-center bg-white shadow-md dark:shadow-slate-700 dark:bg-slate-900 rounded-2xl md:min-w-96">
                    <p className="m-2 text-2xl font-semibold md:text-3xl text-slate-900 dark:text-white">{`${user?.first_name} ${user?.last_name}`}</p>
                    <a className="px-3 py-1 text-xs text-white bg-blue-600 rounded-lg cursor-pointer md:text-base hover:bg-blue-700 dark:bg-teal-600 dark:hover:bg-teal-700"><i className="mr-2 text-sm fa-regular fa-envelope"></i>{user?.email}</a>
                </div>
            </div>
        </div>
    )
}

export default User
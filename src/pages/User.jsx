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

    return (
        <div>
            <Navbar />
            <div className="relative flex flex-col items-center pt-24 font-montserrat">
                <img className="z-10 w-40 h-40 border-4 border-white rounded-full shadow-md" src={user?.avatar} alt="" />
                <div className="absolute z-0 px-10 pt-20 pb-12 mt-24 tracking-tight text-center bg-white shadow-md rounded-2xl">
                    <p className="m-2 text-3xl font-semibold text-slate-900">{`${user?.first_name} ${user?.last_name}`}</p>
                    <a className="px-3 py-1 text-white rounded-lg cursor-pointer bg-sky-600 hover:bg-sky-700"><i className="mr-2 text-sm fa-regular fa-envelope"></i>{user?.email}</a>
                </div>
            </div>
        </div>
    )
}

export default User
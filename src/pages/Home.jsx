import { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {

    const [users, setUsers] = useState([])
    const [pagination, setPagination] = useState({
        page: 1
    });

    const getUsers = () => {
        axios
            .get(`https://reqres.in/api/users?per_page=5&page=${pagination?.page}`)
            .then((res) => {
                const response = res?.data?.data;
                setUsers(response);

                const pagination = {
                    page: res.data.page,
                    per_page: res.data.per_page,
                    total: res.data.total,
                    total_pages: res.data.total_pages,
                };

                setPagination(pagination);
            })
            .catch((err) => console.log(err));
    }

    const pages = Array.from({ length: pagination.total_pages }, (_, index) => index + 1);

    useEffect(() => {
        getUsers();
    }, [pagination?.page])

    const handleNext = () => {
        setPagination({
            ...pagination,
            page: pagination?.page + 1
        });
    }

    const handlePrevious = () => {
        setPagination({
            ...pagination,
            page: pagination?.page - 1
        });
    }

    const handleClickPage = (number) => {
        setPagination({
            ...pagination,
            page: number
        });
    }

    const [transitionIn, setTransitionIn] = useState(true);
    setTimeout(() => {
        setTransitionIn(false)
    }, 0)

    return (
        <div>
            <Navbar />
            <div className={`flex flex-col h-screen items-center transition-all duration-300 ease-in-out pt-14 font-montserrat bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-700 ${transitionIn ? 'opacity-0' : ''}`}>
                <div className="relative w-full h-[470px]">
                    {users.map((user) => (
                        <Link to={`/user/${user?.id}`} className="flex justify-between mx-5 my-3 bg-white rounded-full md:mx-16 hover:shadow-md dark:bg-slate-900 dark:hover:shadow-slate-700">
                            <div className="flex items-center ">
                                <img className="w-20 h-20 p-2 mr-2 rounded-full md:mr-4" src={user?.avatar} alt="" />
                                <h1 className="text-base font-medium tracking-tight md:text-xl text-slate-900 dark:text-white">{`${user?.first_name} ${user?.last_name}`}</h1>
                            </div>
                            <button className="px-3 my-6 mr-6 text-sm tracking-tight text-white bg-blue-600 rounded-full md:px-5 md:text-base hover:bg-blue-700 dark:bg-teal-600 dark:hover:bg-teal-700"><i className="fa-regular fa-envelope"></i></button>
                        </Link>
                    ))}
                </div>
                <div className="flex justify-center w-auto gap-8 px-5 py-2 mt-4 text-xl bg-white rounded-full shadow-md dark:shadow-slate-700 dark:bg-slate-900">
                    <button disabled={pagination.page === 1} onClick={handlePrevious}><i className={`fa-solid fa-angle-left ${pagination.page === 1 ? 'text-slate-300 dark:text-slate-700' : 'text-blue-600 hover:text-blue-700 dark:text-teal-600 dark:hover:text-teal-700'}`}></i></button>
                    <div className="flex items-center gap-6">
                        {pages.map((number) => (
                            <button onClick={() => handleClickPage(number)} className={`text-lg font-medium rounded-md h-7 w-7 ${number === pagination.page ? 'bg-blue-600 dark:bg-teal-600 text-white' : 'text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800'}`}>{number}</button>
                        ))}
                    </div>
                    <button disabled={pagination.page === pagination.total_pages} onClick={handleNext}><i className={`fa-solid fa-angle-right ${pagination.page === pagination.total_pages ? 'text-slate-300 dark:text-slate-700' : 'text-blue-600 hover:text-blue-700 dark:text-teal-600 dark:hover:text-teal-700'}`}></i></button>
                </div>
            </div>
        </div>
    )
}

export default Home;
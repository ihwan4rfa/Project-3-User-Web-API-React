import { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useEffect } from "react";

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

    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center pt-14 font-montserrat">
                <div className="relative w-full h-[450px]">
                    {users.map((user) => (
                        <div className="flex justify-between mx-16 my-2 bg-white rounded-full">
                            <div className="flex items-center ">
                                <img className="w-20 h-20 p-2 mr-4 rounded-full" src={user?.avatar} alt="" />
                                <h1 className="text-xl font-medium tracking-tight">{`${user?.first_name} ${user?.last_name}`}</h1>
                            </div>
                            <button className="px-5 my-6 mr-6 tracking-tight text-white rounded-full bg-sky-600 hover:bg-sky-700"><i class="fa-regular fa-envelope"></i></button>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center w-auto gap-8 px-5 py-1 mt-5 text-2xl bg-white rounded-full">
                    <button disabled={pagination.page === 1} onClick={handlePrevious}><i class={`fa-solid fa-angle-left ${pagination.page === 1 ? 'text-slate-300' : 'text-sky-600 hover:text-sky-700'}`}></i></button>
                    <div className="flex items-center gap-6">
                        {pages.map((number) => (
                            <button onClick={() => handleClickPage(number)} className={`text-lg font-medium rounded-md h-7 w-7 ${number === pagination.page ? 'bg-sky-600 text-white' : 'text-slate-300'}`}>{number}</button>
                        ))}
                    </div>
                    <button disabled={pagination.page === pagination.total_pages} onClick={handleNext}><i class={`fa-solid fa-angle-right ${pagination.page === pagination.total_pages ? 'text-slate-300' : 'text-sky-600 hover:text-sky-700'}`}></i></button>
                </div>
            </div>
        </div>
    )
}

export default Home;
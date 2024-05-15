'use client';
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar-admin";
import Footer from "@/components/Footer";
import PopEdit from "@/components/popupEdit";


const Admin = () => {
    const [table, setTable] = useState<any[]>([]);
    const [showPopUp, setShowPopUp] = useState('');
    const [datauser, setDatauser] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/showUser", {
                    method: "POST",
                });
                const data = await response.json();

                if (data.status === 200) {
                    console.log('data.tableUser ----------- : ', data.tableUser);
                    setTable(data.tableUser);
                    console.log('table ----------- : ', table);
                } else {
                    console.log('data.message ----------- : ', data.message);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const useEditState = () => {
        return { showPopUp, setShowPopUp, datauser, setDatauser };
    }

    const handleEdit = (item: any) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { showPopUp, setShowPopUp, datauser, setDatauser } = useEditState();
        setShowPopUp('true');
        setDatauser([item]);
    }



    const handleClose = () => {
        setShowPopUp('');
    };

    return (
        <div>
            <Navbar />
            <main className="flex min-h-screen flex-col items-center justify-between p-10 bg-gray-900 ">
                <div className="flex flex-col bg-gray-800 m-[20px] p-14 w-[80rem] min-h-screen rounded-md">
                    <div className="p-6">
                        <div className="flex justify-center">
                            <h1 className="text-5xl font-semibold text-white m-5">Manage Account</h1>
                        </div>
                        <div className="overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Username
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Password
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Change
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {table.map((item, index) => (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {item.Username}
                                            </th>
                                            <td className="px-6 py-4">
                                                {item.Password}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.email}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.status}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                <a onClick={() => handleEdit(item)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">Edit</a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {showPopUp === 'true' ? <PopEdit item={datauser} onclose={() => setShowPopUp('')} /> : null}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Admin;

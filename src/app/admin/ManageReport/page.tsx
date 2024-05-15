'use client';
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar-admin";
import Footer from "@/components/Footer";
import Popreport from "@/components/popupReport";

const Admin = () => {
    const [table, setTable] = useState<any[]>([]);
    const [showPopUp, setShowPopUp] = useState('');
    const [datauser, setDatauser] = useState<any[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/showReport", {
                    method: "POST",
                });
                const data = await response.json();

                if (data.status === 200) {
                    console.log('data.tableUser ----------- : ', data.tablecomp);
                    setTable(data.tablecomp);
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

    const handlecheck = (item: any) => {
        setShowPopUp('true');
        setDatauser([item]);
    }

    const handleClose = () => {
        setShowPopUp('');
    };
    return (
        <div>
            <Navbar />
            <main className="flex min-h-screen flex-col items-center justify-between p-14 bg-gray-900">
                <div className="flex flex-col bg-gray-800 m-[20px] p-14 w-[80rem] min-h-screen rounded-lg">
                    <div className="p-6">
                        <div className="flex justify-center">
                            <h1 className="text-5xl text-center text-white font-semibold m-5">Manage Report</h1>
                        </div>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="p-4">
                                            <div className="flex items-center">
                                                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            compID
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            ImgID
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            UserID
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            TimeStamp
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Detail
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {table.map((item, index) => (
                                        <tr key={index} className="bg-gray-100 dark:bg-gray-800">
                                            <td className="p-4">
                                                <div className="flex items-center">
                                                    <input id={`checkbox-${index}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label htmlFor={`checkbox-${index}`} className="sr-only">checkbox</label>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 dark:text-gray-100">{item.compID}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 dark:text-gray-100">{item.imgID}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 dark:text-gray-100">{item.UserID}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100">
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 dark:text-gray-100">{item.timestamp}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 dark:text-gray-100">
                                                    {item.detail.length > 100 ? `${item.detail.substring(0, 20)}...` : item.detail}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <a onClick={() => handlecheck(item)} className="text-indigo-600 hover:text-indigo-900 cursor-pointer">examine</a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {showPopUp === 'true' && <Popreport item={datauser} onclose={() => setShowPopUp('')} />}
                </div>
            </main>

            <Footer />
        </div>
    );

};

export default Admin;
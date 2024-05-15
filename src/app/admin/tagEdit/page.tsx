
'use client';
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar-admin";
import Footer from "@/components/Footer";
import PopTag from "@/components/popupTag";

const Admin = () => {
    const [table, setTable] = useState<any[]>([]);
    const [showPopUp, setShowPopUp] = useState('');
    const [tagdata, setTagData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/showTag", {
                    method: "POST",
                });
                const data = await response.json();

                if (data.status === 200) {
                    console.log('data.tableTag ----------- : ', data.tableTag);
                    setTable(data.tableTag);
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


    const usetagState = () => {
        return { showPopUp, setShowPopUp, tagdata, setTagData };
    }

    const handleConfirm = (item: any) => {
        const { showPopUp, setShowPopUp, tagdata, setTagData } = usetagState();
        setShowPopUp('true');
        setTagData([item]);
    }

    const handleClose = () => {
        setShowPopUp('');
    }


    return (
        <div>
            <Navbar />
            <main className="flex min-h-screen flex-col items-center justify-between p-14 bg-gray-900">
    <div className="flex flex-col bg-gray-800 m-[20px] p-14 w-[80rem] min-h-screen rounded-mg">
        <div className="p-6">
            <div className="flex justify-center">
                <h1 className="text-5xl text-center test-white font-semibold m-5">Tag Edit</h1>
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
                                TagID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                TagName
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                UserID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {table.map((item: any) => (
                            <tr key={item.tagID} className="bg-gray-100 dark:bg-gray-800">
                                <td className="p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900 dark:text-gray-100">{item.tagID}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900 dark:text-gray-100">{item.tagName}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900 dark:text-gray-100">{item.status}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900 dark:text-gray-100">{item.UserID}</div>
                                </td>
                                <td className="whitespace-nowrap">
                                    <div className="text-sm text-gray-900 dark:text-gray-100">
                                        <button onClick={() => handleConfirm(item)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Confirm</button>
                                    </div>
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>
        </div>
        {showPopUp && <PopTag item={tagdata} onclose={handleClose} />}
    </div>
</main>

            <Footer />
        </div>
    );
};

export default Admin;
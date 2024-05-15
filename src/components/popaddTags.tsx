'use client';
import exp from "constants";
import React, { useState, useEffect } from "react";

const PopTag_ = ({ item, onclose }: { item: any, onclose: () => void }) => {
    const [tagid_, setTagid] = useState(item);
    const [tags, setTags] = useState('');
    const handleconfirm = async (statusconfirm: string) => {
        console.log('tagid_ : ', tagid_);
        await fetch("/api/addTags", {
            method: "POST",
            body: JSON.stringify({tagid_,tags, statusconfirm}),
        }).then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.status === 200) {
                    onclose();
                } else {
                    console.log('data.message : ', data.message);
                }

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Add Tag</h1>
                {/* <label className="text-sm text-gray-600">Example add Tag ( tag-test1,tag-test2,... )</label> */}
                <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="border border-gray-300 p-2 rounded-lg w-full mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter tag..."
                />

                <div className="flex justify-end mt-6">
                    <button
                        onClick={onclose}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg m-2 cursor-pointer hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Close
                    </button>
                    <button
                        onClick={() => { handleconfirm('wiating') }}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg m-2 cursor-pointer hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>

    )
}


export default PopTag_;
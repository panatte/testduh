'use client';
import { set } from "animejs";
import exp from "constants";
import React, { useState, useEffect } from "react";


const PopTag = ({ item, onclose }: { item: any, onclose: () => void }) => {

    const [tagid_, setTagid] = useState(item[0].tagID); 

    const handleconfirm = async (statusconfirm: string) => {
        
        await fetch("/api/manageTag", {
            method: "POST",
            body: JSON.stringify({tagid_, statusconfirm}),
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


    const handleDelete = async (statusdelete: string) => {

        await fetch("/api/deleteTag", {
            method: "POST",
            body: JSON.stringify({tagid_, statusdelete}),
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
                <h1> Tag </h1>
                
                <button onClick={onclose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg m-2 cursor-pointer">Close</button>
                <button onClick={() => {handleDelete('inactive')}} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg m-2 cursor-pointer">Delete</button>
                <button onClick={() => {handleconfirm('active')}} className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg m-2 cursor-pointer">Confrim</button>
            </div>
        </div>
    )
}

export default PopTag;
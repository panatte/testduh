'use client';
import React, { useState, useEffect } from "react";

const Popreport = ({ item, onclose }: { item: any, onclose: () => void }) => {
    console.log('item >>>>>>>>>>>>>>>>>>>>>>>>>>>> : ', item);
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg">
                <h1>Report</h1>
                <h1>Complain ID : {item[0].compID}</h1>
                <h1> Image ID : {item[0].imgID}</h1>
                <h1> User ID : {item[0].userID}</h1>
                <h1> Status : {item[0].status}</h1>
                <h1> Date : {item[0].timestamp}</h1>
                <div className="block break-words border border-gray-300 bg-white rounded-lg p-4 whitespace-pre-line">Detail: {item[0].detail}</div>

                <button onClick={onclose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg m-2 cursor-pointer">Close</button>
            </div>
        </div>
    );

}

export default Popreport;
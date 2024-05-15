'use client';
import React, { useState } from 'react';
import { StoreContext } from "@/store";
// alignText component to align text
const AlignText = () => {

    const store = React.useContext(StoreContext);

    const [selectedAlign, setSelectedAlign] = useState('');

    const handleAlignChange = (event: any) => {
        const selectedAlign = event.target.value;
        setSelectedAlign(selectedAlign);
        store.setTextAlign(selectedAlign);
    };

    return (
        <select
            value={selectedAlign}
            onChange={handleAlignChange}
            className="block w-full px-4 py-2 mt-1 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
            <option value="">Select Alignment</option>
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
        </select>

    );
};

export default AlignText;
'use client';
import React, { useState } from 'react';
import { StoreContext } from "@/store";

// strokeColor component to add stroke color to text
const StrokeColor = () => {
    const store = React.useContext(StoreContext);
    const [selectedStrokeColor, setSelectedStrokeColor] = useState('');
    const handleStrokeColorChange = (event: any) => {
        const selectedStrokeColor = event.target.value;
        setSelectedStrokeColor(selectedStrokeColor);
        store.setStrokeColor(selectedStrokeColor);
    };

    return (
        <select
            value={selectedStrokeColor}
            onChange={handleStrokeColorChange}
            className="block w-full px-4 py-2 mt-1 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
            <option value="">Select Stroke Color</option>
            <option value="black">Black</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
        </select>
    );
};

export default StrokeColor;
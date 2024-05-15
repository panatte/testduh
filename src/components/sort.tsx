"use client";
import React, { useState } from 'react';
interface SortProps {
  onSortChange: (value: string) => void;
}

const YourComponent: React.FC<SortProps> = ({ onSortChange }) => {
  const [activeButton, setActiveButton] = useState('latest'); // State to track active button
  return (
    <ul className="hidden text-sm font-medium text-center text-gray-500 rounded-md sm:flex flex-row dark:divide-gray-700 dark:text-gray-400 mb-[20px] justify-end">
      <li className="focus-within:z-10 m-2">
        <a
          href="#"
          onClick={() => { setActiveButton('latest'); onSortChange("latest") }} // Set active button to 'old' on click
          className={`inline-block text-xl font-semibold p-4 rounded-md ${activeButton === 'latest' ? 'bg-gray-300 text-gray-900' : 'bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700'
            } border-r border-gray-200 dark:border-gray-700`}
        >
          Last Upload
        </a>
      </li>
      <li className="focus-within:z-10 m-2">
        <a
          href="#"
          onClick={() => { setActiveButton('popular'); onSortChange("popular") }} // Set active button to 'popular' on click
          className={`inline-block text-xl font-semibold p-4 rounded-md ${activeButton === 'popular' ? 'bg-gray-300 text-gray-900' : 'bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700'
            } border-r border-gray-200 dark:border-gray-700`}
        >
          Most popular
        </a>
      </li>
    </ul>

  );
}

export default YourComponent;


// <li className="w-full focus-within:z-10 mx-[10px]">
//         <a
//           href="#"
//           onClick={() => {setActiveButton('old');onSortChange("old")}} // Set active button to 'old' on click
//           className={`inline-block w-full p-4 rounded-md ${
//             activeButton === 'old' ? 'bg-gray-300 text-gray-900' : 'bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700'
//           } border-r border-gray-200 dark:border-gray-700`}
//         >
//           อัพโหลดเก่าสุด
//         </a>
//       </li>
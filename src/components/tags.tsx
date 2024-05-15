// tags.tsx

import React, { useState, useEffect } from 'react';
import PopPopTag_ from './popaddTags';
import CheckUserID from './GetUID';

interface CheckedItems {
    [key: string]: boolean;
}

interface ShowTagsProps {
    setCheckedItems: (updateFunction: (prevState: CheckedItems) => CheckedItems) => void;
}

const ShowTags: React.FC<ShowTagsProps> = ({ setCheckedItems }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [table, setTable] = useState<any[]>([]);
    const [showPopUp, setShowPopUp] = useState('');
    const [userid , setUserID] = useState('');

    const [checkedItems, setCheckedItemsLocal] = useState<CheckedItems>({});

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/api/Tags", {
                    method: "POST",
                });
                const data = await response.json();
                if (data.status === 200) {
                    const checkUID:any = await CheckUserID();
                    setUserID(checkUID);
                    setTable(data.tableTag);
                } else {
                    console.log('data.message ----------- : ', data.message);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        async function fetchUserID() {
            try {
                const response = await fetch("/api/Checkcookies", {
                    method: "POST",
                });
                const data = await response.json();
                if (data.status === 200) {
                    setUserID(data.data.UserID);
                } else {
                    console.log('data.message ----------- : ', data.message);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
        fetchUserID();
    }, []);

    const handleAddTag = async () => {
        setShowPopUp('true');
    }

    const handleCheckboxChange = (tagName: string) => {
        setCheckedItemsLocal((prevState) => ({
            ...prevState,
            [tagName]: !prevState[tagName]
        }));
        setCheckedItems((prevState: CheckedItems) => ({
            ...prevState,
            [tagName]: !prevState[tagName]
        }));
    };

    const handleClose = () => {
        setShowPopUp('');
    }
    
    const handleClearAll = () => {
        setCheckedItemsLocal({});
        setCheckedItems((prevState: CheckedItems) => ({}));
    };

    return (
        <div className="relative">
            <button id="dropdownSearchButton" onClick={toggleDropdown} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Tags <svg className={`w-2.5 h-2.5 ms-3 transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
            </button>

            <button onClick={handleAddTag} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mr-4 m-5"> Add Tag </button>

            <div id="dropdownSearch" className={`z-10 ${isOpen ? 'block' : 'hidden'} absolute mt-1 bg-white rounded-lg shadow w-60 dark:bg-gray-700`}>
                <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
                    {table.map((tag, index) => (
                        <li key={index} className="flex items-center justify-between py-2.5 border-b dark:border-gray-600">
                            <div className="flex items-center">
                                <input 
                                    type="checkbox" 
                                    className="form-checkbox h-4 w-4 text-blue-600 dark:text-blue-500" 
                                    checked={checkedItems[tag.tagName] || false}
                                    onChange={() => handleCheckboxChange(tag.tagName)}
                                />
                                <span className="ms-2">{tag.tagName}</span>
                            </div>
                        </li>
                    ))}
                </ul>
                <a  onClick={handleClearAll} className="flex items-center p-3 text-sm font-medium text-red-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-500 hover:underline cursor-pointer">
                    <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-6a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2Z" />
                    </svg>
                    Clear all
                </a>
            </div>
            {showPopUp === 'true' && <PopPopTag_ item={userid} onclose={handleClose} />}
        </div>
    );
}

export default ShowTags;

// import React, { useState, useEffect } from 'react';
// import PopPopTag_ from './popaddTags';
// import CheckUserID from './GetUID';

// interface CheckedItems {
//     [key: string]: boolean;
//   }

// interface ShowTagsProps {
//     setCheckedItemsProp: React.Dispatch<React.SetStateAction<CheckedItems>>;
//   }

// const ShowTags: React.FC<ShowTagsProps> = ({ setCheckedItemsProp }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [table, setTable] = useState<any[]>([]);
//     const [showPopUp, setShowPopUp] = useState('');
//     const [userid , setUserID] = useState('');
//     const [checkedItems, setCheckedItemsLocal] = useState<CheckedItems>({});

//     const toggleDropdown = () => {
//         setIsOpen(!isOpen);
//     };

//     useEffect(() => {
        
//         async function fetchData() {
//             try {
//                 const response = await fetch("/api/Tags", {
//                     method: "POST",
//                 });
//                 const data = await response.json();
//                 if (data.status === 200) {
//                     console.log('data.tableTag ----------- : ', data.tableTag);
//                     const checkUID:any = await CheckUserID();
//                     console.log('checkUID ----------- : ', checkUID);
//                     setUserID(checkUID);
//                     setTable(data.tableTag); // Provide a default value of an empty string if uid is undefined
//                     console.log('table ----------- : ', table);
//                 } else {
//                     console.log('data.message ----------- : ', data.message);
//                 }
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         async function fethuserID() {
//             try{
//                 const response = await fetch("/api/Check", {
//                     method: "POST",
//                 });
//                 const data = await response.json();
//                 if (data.status === 200) {
//                     console.log('data ----------- : ', data);
//                     setUserID(data.data.UserID); // Provide a default value of an empty string if uid is undefined
//                     console.log('UserID ----------- : ', userid);
//                 } else {
//                     console.log('data.message ----------- : ', data.message);
//                 }

//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
            
//         }

//         fetchData();
//         fethuserID();
//     }, []);

    
//     const handleAddTag = async () => {
//         setShowPopUp('true');
    
//     }

//     const handleCheckboxChange = (tagName: string) => {
//         setCheckedItemsLocal((prevState: { [x: string]: any; }) => ({
//             ...prevState,
//             [tagName]: !prevState[tagName]
//         }));
//     };
    

//     const handleClose = () => {
//         setShowPopUp('');
//     }
    
//     const handleClearAll = () => {
//         // อัปเดต checkedItems เป็นอ็อบเจ็กต์ว่าง
//         setCheckedItemsProp({});
//     };

//     return (
//         <div className="relative">
//         <button id="dropdownSearchButton" onClick={toggleDropdown} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
//             Tags <svg className={`w-2.5 h-2.5 ms-3 transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
//                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
//             </svg>
//         </button>

//         <button onClick={handleAddTag} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mr-4 m-5"> Add Tag </button>

//         <div id="dropdownSearch" className={`z-10 ${isOpen ? 'block' : 'hidden'} absolute mt-1 bg-white rounded-lg shadow w-60 dark:bg-gray-700`}>
//             <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
//                 {table.map((tag, index) => (
//                     <li key={index} className="flex items-center justify-between py-2.5 border-b dark:border-gray-600">
//                         <div className="flex items-center">
//                             <input 
//                                 type="checkbox" 
//                                 className="form-checkbox h-4 w-4 text-blue-600 dark:text-blue-500" 
//                                 checked={checkedItems[tag.tagName] || false}
//                                 onChange={() => handleCheckboxChange(tag.tagName)}
//                             />
//                             <span className="ms-2">{tag.tagName}</span>
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//             <a  onClick={handleClearAll} className="flex items-center p-3 text-sm font-medium text-red-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-500 hover:underline cursor-pointer">
//                 <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
//                     <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-6a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2Z" />
//                 </svg>
//                 Clear all
//             </a>
//         </div>
//         {showPopUp === 'true' && <PopPopTag_ item={userid} onclose={handleClose} />}
//     </div>
        
//     );
// }

// export default ShowTags;
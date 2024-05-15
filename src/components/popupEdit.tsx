'use client';
import React, {useState} from "react";

const PopEdit = ({ item, onclose }: { item: any, onclose: () => void }) => {
    const [userid_, setUserid] = useState(item[0].UserID);
    const [username_, setUsername] = useState(item[0].Username);
    const [password_, setPassword] = useState(item[0].Password);
    const [role_, setRole] = useState(item[0].role);
    const [email_, setEmail] = useState(item[0].email);
    const [name_, setName] = useState(item[0].name);
    const handelSave = async () => {
        console.log('username -------> : ', username_);
        console.log('password  -------> : ', password_);
        console.log('role :  -------> ', role_);
        console.log('email :  -------> ', email_);
        console.log('name :  -------> ', name_);

        const response = await fetch("/api/editData", {
            method: "POST",
            body: JSON.stringify({userid_, username_, password_, role_, email_, name_}),
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
                <h1>UserName</h1>
                <input type="text" className="w-full h-10 border border-gray-300 rounded-lg" placeholder="Username" value={username_} onChange={(e) => setUsername(e.target.value)} />
                <h1>Password</h1>
                <input type="text" className="w-full h-10 border border-gray-300 rounded-lg" placeholder="Password" value={password_} onChange={(e) => setPassword(e.target.value)} />
                <h1>Role</h1>
                <input type="text" className="w-full h-10 border border-gray-300 rounded-lg" placeholder="Role" value={role_} onChange={(e) => setRole(e.target.value)} />
                <h1>Email</h1>
                <input type="text" className="w-full h-10 border border-gray-300 rounded-lg" placeholder="Email" value={email_} onChange={(e) => setEmail(e.target.value)} />
                <h1>Name</h1>
                <input type="text" className="w-full h-10 border border-gray-300 rounded-lg" placeholder="Name" value={name_} onChange={(e) => setName(e.target.value)} />

                <button onClick={onclose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg m-2">Close</button>
                <button onClick={handelSave} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg m-2">Save</button>
            </div>

        </div>
    );
}

export default PopEdit;

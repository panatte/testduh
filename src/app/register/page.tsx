'use client';
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { error } from 'console';
import Swal from "sweetalert2";

function Register() {
    const [username, setuserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [Cpassword, setCPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [alert, setAlert] = React.useState('');
    const [file, setFile] = React.useState(null as any);

    const handleSunmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== Cpassword) {
            setAlert('รหัสผ่านไม่ตรงกัน');
            return;
        }
        try {
            const formData = new FormData();
            formData.set('username', username);
            formData.set('password', password);
            formData.set('Cpassword', Cpassword);
            formData.set('email', email);
            formData.set('name', name);
            formData.set('file', file);
            Swal.fire({
                title: "กำลังลงทะเบียน",
                text: "กรุณารอสักครู่...",
                showConfirmButton: false,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });
            const response = await fetch('/api/register', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                throw new Error('มีข้อผิดพลาดในการส่งข้อมูล');
            }
            const data = await response.json();
            if (data.status === 200) {
                Swal.fire({
                    title: "การลงทะเบียนสำเร็จ",
                    text: "คุณลงทะเบียนเรียบร้อยแล้ว",
                    icon: "success",
                    timer: 1500,
                    timerProgressBar: true,
                    showConfirmButton: false
                });
                const form = e.target as HTMLFormElement;
                setuserName(''); setPassword(''); setCPassword(''); setEmail(''); setName('');
                form.reset();
                console.log("User Registerd Successfully");
            } else {
                Swal.fire({
                    title: "การลงทะเบียนล้มเหลว",
                    text: "เกิดข้อผิดพลาดขณะลงทะเบียน",
                    icon: "error",
                    timer: 1500,
                    timerProgressBar: true,
                    showConfirmButton: false
                });
                console.log("User Registerd Failed");
            }
        } catch (error) {
            Swal.fire({
                title: "เกิดข้อผิดพลาด",
                text: "มีข้อผิดพลาดในการส่งข้อมูล",
                icon: "error",
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false
            });
        }
    }
    
    return (
        <div className="m-0">
            <Navbar />
            <div className="items-center justify-between flex flex-col p-14 bg-gray-800">
                <div className="w-full max-w-sm p-4 bg-indigo-700 border border-indigo-400 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form className="space-y-6" onSubmit={handleSunmit}>

                        {alert && <div className="text-red-500 text-sm font-medium text-center">{alert}</div>}
                        <h5 className="text-xl font-semibold text-white dark:text-white text-center">Register</h5>
                        <div>
                            <label htmlFor="username" className="block mb-2 text-xl font-semibold text-white dark:text-white">Username</label>
                            <input onChange={(e) => setuserName(e.target.value)} type="username" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required />
                        </div>
                        <div>
                            <label htmlFor="floating_password" className="block mb-2 text-xl font-semibold text-white dark:text-white">Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" name="floating_password" id="floating_password" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>
                        <div>
                            <label htmlFor="floating_repeat_password" className="block mb-2 text-xl font-semibold text-white dark:text-white">Confirm Password</label>
                            <input onChange={(e) => setCPassword(e.target.value)} type="password" name="repeat_password" id="floating_repeat_password" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-xl font-semibold text-white dark:text-white">Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required />
                        </div>
                        <div>
                            <label htmlFor="name" className="block mb-2 text-xl font-semibold text-white dark:text-white">Name</label>
                            <input onChange={(e) => setName(e.target.value)} type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-xl font-semibold text-white" htmlFor="file_input">Profile image</label>
                            <input onChange={(e) => setFile(e.target.files && e.target.files[0])} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" accept='image/*' />
                            <p className="mt-1 text-sm text-white dark:text-gray-300" id="file_input_help">SVG, PNG, JPG (MAX. 100x100px).</p>
                        </div>
                        <button type="submit" className="w-full text-white text-xl bg-rose-500 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-semibold rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
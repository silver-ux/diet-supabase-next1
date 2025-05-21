'use client';
import React, { useContext, useState } from 'react'
import { makeAnAccount } from '@/lib/userAction';
import { Mycontext } from '@/Context';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setClose2 } = useContext(Mycontext);


    const handleSubmit = async () => {
        makeAnAccount(email, password);
        setEmail('');
        setPassword('');
        setClose2(false);
    }
    return (
        <div className='bg-white fixed inset-0 text-center'>
            <div className='bg-gray-200 h-[70%] w-[60%] mx-auto px-[10%] relative py-[2rem] text-center '>
                <button className='absolute top-0 right-3' onClick={() => setClose2(false)}>close</button>
                <h2 className='font-bold text-2xl mb-[1rem]'>アカウント作成</h2>
                <input className='border-1 inline-block w-[80%] p-[0.8rem]' type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className='border-1 inline-block w-[80%] my-[1rem] p-[0.8rem]' type="password" placeholder='Passwordを入力' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className='cursor-pointer bg-amber-400 p-[1rem] inline-block' onClick={handleSubmit}>アカウントを作成する</button>
            </div>
        </div>
    )
}

export default SignUp
import React, { useState } from 'react'
import supabase from "@/supabase/init";

const Login = ({ login, setLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        if (error) {
            console.log(error);
            alert(`ログインに失敗しました:${error}`)
        }
        console.log(data);
        setEmail('');
        setPassword('');
        setLogin(false)
    }
    return (
        <div className='bg-white absolute left-0 top-[100px] right-0 bottom-0 text-center'>
            <div className='bg-gray-200 h-[70%] w-[60%] mx-auto px-[10%] py-[2rem] text-center '>
                <h2 className='font-bold text-2xl mb-[1rem]'>ログイン</h2>
                <input className='border-1 inline-block w-[80%] p-[0.8rem]' type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className='border-1 inline-block w-[80%] my-[1rem] p-[0.8rem]' type="password" placeholder='Passwordを入力' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className='cursor-pointer bg-amber-400 p-[1rem] inline-block' onClick={handleSubmit}>ログイン</button>
            </div>
        </div>
    )
}

export default Login
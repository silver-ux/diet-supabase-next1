import React, { useContext, useState } from 'react'
import { Mycontext } from '@/Context';
import supabase from '@/supabase/init';
import { Fetch, getUser } from '@/supabase/Fetch';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { isLoggedInOut, setIsLoggedInOut, setClose, setUser, setItems } = useContext(Mycontext);


    // ログイン
    const handleSubmit = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        if (error) {
            console.log(error);
            alert(`ログインに失敗しました:${error.message}`)
            return;
        }
        alert(`${data.user.email}にログインしました`)

        setEmail('');
        setPassword('');
        setIsLoggedInOut(true);
        setClose(false);

        const item = await getUser();
        setUser(item);

    }

    return (
        <div className='bg-white fixed inset-0 text-center'>
            <div className='bg-gray-200 h-[70%] w-[60%] mx-auto px-[10%] py-[2rem] relative text-center '>
                <button className='absolute top-0 right-3' onClick={() => setClose(false)}>close</button>
                <h2 className='font-bold text-2xl mb-[1rem]'>ログイン</h2>
                <input className='border-1 inline-block w-[80%] p-[0.8rem]' type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='email' />
                <input className='border-1 inline-block w-[80%] my-[1rem] p-[0.8rem]' type="password" placeholder='Passwordを入力' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className='cursor-pointer bg-amber-400 p-[1rem] block mx-auto' onClick={handleSubmit}>ログイン</button>
            </div>
        </div>
    )
}

export default SignIn
import React, { useContext, useState } from 'react'
import { Mycontext } from '@/Context';
import supabase from '@/supabase/init';
import { getUser } from '@/supabase/Fetch';
import { fetchDataFunc } from '@/lib/fetchDataFunc';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setLabels, setWeights, setWalkArr, setIsLoggedInOut, setClose, setUser } = useContext(Mycontext);


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

        // 入力した文字を初期化
        setEmail('');
        setPassword('');

        // ログインしてる状態
        setIsLoggedInOut(true);

        //データ取得 
        fetchDataFunc(setLabels, setWeights, setWalkArr)

        //ログイン画面を非表示にする
        setClose(false);

        // 今のユーザー情報をuserに入れる
        const item = await getUser();
        setUser(item);

    }

    return (
        <div className='bg-white fixed inset-0 text-center '>
            <div className='pt-[200px] 800:pt-[100px] bg-gray-200 h-[100%] 800:h-[70%] 800:w-[60%] mx-auto px-[10%] py-[2rem] relative text-center 800:mt-[3rem] '>
                <button className='absolute top-0 right-0 800:px-[2rem] 800:py-[1rem] px-[1rem] py-[0.5rem] rounded-bl-md bg-gray-100 cursor-pointer' onClick={() => setClose(false)}>close</button>
                <h2 className='font-bold text-2xl mb-[1rem]'>ログイン</h2>
                <input className='border-1 inline-block w-[80%] p-[0.8rem]' type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='email' />
                <input className='border-1 inline-block w-[80%] my-[1rem] p-[0.8rem]' type="password" placeholder='Passwordを入力' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className='cursor-pointer bg-amber-400 p-[1rem] block mx-auto' onClick={handleSubmit}>ログイン</button>
            </div>
        </div>
    )
}

export default SignIn
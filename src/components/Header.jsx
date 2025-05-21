'use client';
import React, { useContext, useEffect } from 'react'
import { getUser } from '@/supabase/Fetch';
import { Mycontext } from '@/Context';
import supabase from '@/supabase/init';

const Header = ({ }) => {

    const { isLoggedInOut, setIsLoggedInOut, setUser, user, setClose, setClose2 } = useContext(Mycontext);

    const data = async () => {
        const item = await getUser();
        setUser(item);
    }
    useEffect(() => {
        data();
    }, [isLoggedInOut])


    // ログアウト
    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('セッション取得エラー:', error);
            return;
        }
        alert('ログアウトしました');
        setUser(null);
        setIsLoggedInOut(false);
    }


    return (
        <div className='h-[80px] flex justify-between items-center border-b-1'>
            <h1>{user?.email ?? 'Welcome!'}</h1>
            {/* <h1>Welcome</h1> */}
            <div>

                {user ? <button className='border-b-1 mr-[1rem] cursor-pointer' onClick={async () => { logout(); setIsLoggedInOut(false) }}>ログアウト</button> : <button className='border-b-1 mr-[1rem] cursor-pointer' onClick={() => { setIsLoggedInOut(true); setClose(true) }}>ログイン</button>}

                <button className='border-b-1 cursor-pointer' onClick={() => setClose2(true)}>アカウント作成</button>
            </div>
        </div >
    )
}

export default Header
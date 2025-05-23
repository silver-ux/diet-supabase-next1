'use client';
import React, { useContext, useEffect } from 'react'
import { getUser } from '@/supabase/Fetch';
import { Mycontext } from '@/Context';
import supabase from '@/supabase/init';
import HeaderBtn from './HeaderBtn';
import { deleteAccount } from '@/lib/userAction';

const Header = () => {

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
            <div className='flex justify-end flex-col-reverse 800:flex-row text-[14px] 800:text-[16px]'>
                {user ? <HeaderBtn className={'mr-[1rem]'} clickFunc={async () => { logout(); setIsLoggedInOut(false) }}>ログアウト</HeaderBtn> : <HeaderBtn className={'mr-[1rem]'} clickFunc={() => { setIsLoggedInOut(true); setClose(true) }}> ログイン</HeaderBtn>}
                {user ? <HeaderBtn clickFunc={() => deleteAccount()}>初期化</HeaderBtn> : <HeaderBtn clickFunc={() => setClose2(true)}>アカウント作成</HeaderBtn>}
            </div>
        </div >
    )
}

export default Header
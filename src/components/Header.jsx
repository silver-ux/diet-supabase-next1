import { checkSession } from '@/lib/session';
import { signIn } from '@/lib/singIn';
import React, { useEffect, useState } from 'react'

const Header = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const currentUser = checkSession();
        setUser(currentUser)
    }, [signIn])
    return (
        <div className='h-[80px] flex justify-between items-center border-b-1'>
            <h1>{user ? user.email : 'Welcome!'}</h1>
            <div>
                <button className='border-b-1 mr-[1rem] cursor-pointer' onClick={() => setLogin(!login)}>ログイン</button>
                {/* <button>ログアウト</button> */}
                <button className='border-b-1 cursor-pointer' onClick={() => setView(!view)}>アカウント作成</button>
            </div>
        </div>
    )
}

export default Header
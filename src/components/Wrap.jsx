'use client';
import React, { useEffect, useState } from 'react'
import Header from './Header'
import SignIn from './SignIn'
import SignUp from './SignUp'


const Wrap = () => {
    // ログイン、ログアウトの文字を状態によって変える



    // 現在のユーザー情報を入れる場所

    // オブザーブの変化でユーザー情報を更新している
    // const [observe, setObserve] = useState(false);

    return (
        <div>
            <Header setClose2={setClose2} />

        </div>
    )
}

export default Wrap
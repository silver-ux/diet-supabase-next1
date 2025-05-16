import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <div className='h-[80px] flex justify-between items-center border-b-1'>
            <div>
                LOGO
            </div>
            <Link href={'/'}>Log In</Link>
        </div>
    )
}

export default Header
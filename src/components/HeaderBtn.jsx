import React from 'react'

const HeaderBtn = ({ className, clickFunc, children }) => {

    return (
        <button className={`border-b-1 cursor-pointer ${className}`} onClick={clickFunc}>{children}</button>
    )
}

export default HeaderBtn
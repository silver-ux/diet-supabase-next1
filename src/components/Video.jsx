import React from 'react'
import getDate from '@/lib/getDate';

const Video = async () => {

    const url = await getDate()

    return (
        <div className='mt-5 h-[315px] 800:h-[550px]'>
            <iframe width="100%" height="100%" src={url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; rel; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
        </div >
    )
}

export default Video
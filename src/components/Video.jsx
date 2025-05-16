import React from 'react'
import getDate from '@/lib/getDate';

const Video = async () => {

    const url = await getDate()

    return (
        <div className='mt-5'>
            <iframe width="100%" height="315" src={url} title='YouTube Video Player' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen />
        </div >
    )
}

export default Video
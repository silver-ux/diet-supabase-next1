'use client'
import React, { useEffect, useState } from 'react'

const Video = () => {

    const [url, setUrl] = useState('');

    useEffect(() => {
        const fetchUrl = async () => {
            const res = await fetch('/api/getDate');
            const data = await res.json();
            setUrl(data.url);
        };

        fetchUrl();
    }, []);

    if (!url) return <p>Loading video...</p>;

    return (
        <div className='mt-5 h-[315px] 800:h-[550px]'>
            <iframe width="100%" height="100%" src={url} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
        </div >
    )
}

export default Video
import { addFunc } from '@/lib/addFunc';
import React from 'react'

const Insert = ({ setNum, setWalk, num, walk, fetchDataFunc }) => {
    return (
        <div>
            <div className='mb-[1rem] '>
                <input
                    type="number"
                    value={walk}
                    onChange={(e) => setWalk(e.target.value)}
                    placeholder="歩数"
                    className='800:mr-[1rem] py-2 px-1.5 border-1 w-full 800:w-auto'
                />
                <input
                    type="number"
                    value={num}
                    onChange={(e) => setNum(e.target.value)}
                    placeholder="体重 (kg)"
                    className='800:mr-[1rem] py-2 px-1.5 border-1 w-full 800:w-auto my-[1rem]'
                />
                <button onClick={async () => {
                    const success = await addFunc(walk, num);
                    if (success) {
                        fetchDataFunc();
                        setNum('');
                        setWalk('');
                    } else {
                        setNum('');
                        setWalk('');
                    }
                }} className='inline-block w-full 800:w-auto  px-[1rem] py-[0.5rem] rounded-1xl cursor-pointer bg-amber-500 hover:bg-amber-400'>追加</button>
            </div>
        </div>
    )
}

export default Insert
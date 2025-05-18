'use client'
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Fetch } from '@/supabase/Fetch';
import { addFunc } from '@/lib/addFunc';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Chart() {
    const [labels, setLabels] = useState([]);
    const [weights, setWeights] = useState([]);
    const [walkArr, setWalkArr] = useState([]);
    const [num, setNum] = useState('');
    const [walk, setWalk] = useState('');


    //取得
    const fetchDataFunc = async () => {
        const items = await Fetch();

        //月日だけ取得
        const monthDays = items.map(row => {
            const date = new Date(row.created_at);
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${month}-${day}`;
        });

        //体重
        const weightsNum = items.map((item) => {
            return item.number
        });

        //歩数
        const walkNum = items.map((item) => {
            return item.walk
        })

        //チャートに表示するため
        setLabels(monthDays);
        setWeights(weightsNum);
        setWalkArr(walkNum)
    }

    useEffect(() => {
        fetchDataFunc();
    }, [])



    const data = {
        labels,
        datasets: [
            {
                label: '体重 (kg)',
                data: weights,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.2,
                fill: false,
            },
        ],
    };
    const data2 = {
        labels,
        datasets: [
            {
                label: '歩数',
                data: walkArr,
                borderColor: 'rgba(255, 50, 100, 1)',
                tension: 0.2,
                fill: false,
            }
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {
                    font: {
                        size: 14
                    }
                },
            },
            y: {
                ticks: {
                    font: {
                        size: 14
                    }
                },
                suggestedMin: 40,
                suggestedMax: 100,
            },
        },
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>体重グラフ</h1>
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
            <div className="800:flex justify-between h-[400px]">
                <Line data={data} options={options} className='800:max-w-[50%] ' />
                <Line data={data2} options={options} className='800:max-w-[50%] ' />
            </div>
        </div>
    );
}

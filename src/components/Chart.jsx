'use client'
import { useContext, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
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
import Insert from './Insert';
import { Mycontext } from '@/Context';
import { fetchDataFunc } from '@/lib/fetchDataFunc';
import { FetchMonth } from '@/supabase/Fetch';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Chart() {

    const [num, setNum] = useState('');
    const [walk, setWalk] = useState('');
    const [months, setMonths] = useState([]);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };


    const { setLabels, setWeights, setWalkArr, isLoggedInOut, labels, weights, walkArr } = useContext(Mycontext);

    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const [selectedValue, setSelectedValue] = useState(`${year}-${month}`);


    useEffect(() => {
        if (isLoggedInOut) {
            // fetchDataFunc(setLabels, setWeights, setWalkArr);
            FetchMonth(setMonths, selectedValue, setLabels, setWeights, setWalkArr)
        } else {
            setLabels([]);
            setWeights([]);
            setWalkArr([]);
        }
    }, [isLoggedInOut]);


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
                    },
                    maxTicksLimit: 5
                }
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
        <div className='p-[2rem] px-0'>
            <h1>体重グラフ</h1>
            <Insert setNum={setNum} num={num} walk={walk} setWalk={setWalk} fetchDataFunc={fetchDataFunc} setMonths={setMonths} selectedValue={selectedValue} />

            {/* clicked === 'month' */}
            <select value={selectedValue} onChange={handleChange} className='border-1'>
                <option value="">選択してください</option>
                {months.map((item) => (
                    <option key={item} value={item}>{item}月</option>
                ))}
            </select>
            <div className="800:flex justify-between h-[400px]">
                <div className='w-full h-full overflow-x-auto'>
                    <div className='w-full h-full'>
                        <Line data={data} options={options} />
                    </div>
                </div>
                <div className='w-full h-full'>
                    <Line data={data2} options={options} />
                </div>
            </div>
        </div>
    );
}

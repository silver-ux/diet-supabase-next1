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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Chart() {

    const [num, setNum] = useState('');
    const [walk, setWalk] = useState('');

    const { setLabels, setWeights, setWalkArr, isLoggedInOut, labels, weights, walkArr } = useContext(Mycontext);

    useEffect(() => {
        if (isLoggedInOut) {
            fetchDataFunc(setLabels, setWeights, setWalkArr);
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
            <Insert setNum={setNum} num={num} walk={walk} setWalk={setWalk} fetchDataFunc={fetchDataFunc} />
            <div className="800:flex justify-between h-[400px]">
                <Line data={data} options={options} className='800:max-w-[50%] ' />
                <Line data={data2} options={options} className='800:max-w-[50%] ' />
            </div>
        </div>
    );
}

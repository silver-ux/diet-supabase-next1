'use client'
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Fetch } from '@/supabase/Fetch';
import supabase from '@/supabase/init';
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

    const fetchDataFunc = async () => {
        const items = await Fetch();

        //月日だけ取得
        const monthDays = items.map(row => {
            const date = new Date(row.created_at);
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${month}-${day}`;
        });

        const weightsNum = items.map((item) => {
            return item.number
        })
        const walkNum = items.map((item) => {
            return item.walk
        })

        setLabels(monthDays);
        setWeights(weightsNum);
        setWalkArr(walkNum)
    }

    useEffect(() => {
        fetchDataFunc();
    }, [])

    const addNum = async () => {
        if (num === '' || walk === '') {
            alert('入力してください');
            return;
        }
        await supabase.from("posts").insert({ number: num, walk: walk });
        fetchDataFunc();
        setNum('');
    }

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
        scales: {
            x: {
                title: {
                    display: true,
                    text: '日付',
                },
            },
            y: {
                title: {
                    display: true,
                    text: '体重 (kg)',
                },
                suggestedMin: 40,
                suggestedMax: 100,
            },
        },
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>体重グラフ</h1>
            <div style={{ marginBottom: '1rem' }}>
                <input
                    type="number"
                    value={walk}
                    onChange={(e) => setWalk(e.target.value)}
                    placeholder="歩数"
                    style={{ marginRight: '1rem' }}
                />
                <input
                    type="number"
                    value={num}
                    onChange={(e) => setNum(e.target.value)}
                    placeholder="体重 (kg)"
                    style={{ marginRight: '1rem' }}
                />
                <button onClick={addNum}>追加</button>
            </div>
            <Line data={data} options={options} />
            <Line data={data2} options={options} />
        </div>
    );
}

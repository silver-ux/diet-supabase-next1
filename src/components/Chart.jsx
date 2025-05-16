'use client'
import { useState } from 'react';
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Chart() {
    const [labels, setLabels] = useState([]);
    const [weights, setWeights] = useState([]);
    const [date, setDate] = useState('');
    const [weight, setWeight] = useState('');

    const handleAdd = () => {
        if (!date || !weight) return;

        setLabels((prev) => [...prev, date]);
        setWeights((prev) => [...prev, parseFloat(weight)]);
        setDate('');
        setWeight('');
    };

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
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={{ marginRight: '1rem' }}
                />
                <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="体重 (kg)"
                    style={{ marginRight: '1rem' }}
                />
                <button onClick={handleAdd}>追加</button>
            </div>
            <Line data={data} options={options} />
        </div>
    );
}

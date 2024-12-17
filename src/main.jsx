import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import 'chart.js/auto';
import { Line } from 'react-chartjs-2';

import styles from './style.module.css';

let history = Math.floor((new Date() - new Date('2024-04-01')) / (1000 * 60 * 60 * 24));

function App() {
    let [keys, setKeys] = useState([]);
    let [scripts, setScripts] = useState([]);
    let [data, setData] = useState([]);

    useEffect(() => {
        const addScript = (data) => {
            setScripts(s => [...s, { name: data.name, color: data.color }]);

            axios.get(`https://greasyfork.org/scripts/${data.id}/stats.json`).then((res) => {
                setKeys(Object.keys(res.data).slice(-history));

                setData(s => [...s, {
                    name: data.name,
                    color: data.color,
                    stats: Object.entries(res.data).slice(-history).map(x => x[1].installs)
                }])
            });
        };

        addScript({ name: 'statefarm', id: '482982', color: '#FF6384' });
        addScript({ name: 'zert', id: '436330', color: '#35A2EB' });
        addScript({ name: '"tigertech"', id: '492659', color: '#FFA500' })
        addScript({ name: 'libertymutual', id: '484168', color: '#35EB41' });
        addScript({ name: 'shellfarm', id: '485745', color: '#EBE834' });
    }, []);

    return (
        <>
            <div className={styles.main}>
                <div className={styles.desc}>
                    this graph is basically unedited proof that your product SEO controls who it reaches.<br /><br />

                    for a long time in the Shell Shockers community, a developer named zertalious was the only one making cheats
                    (because he would takedown anyone else who tried), so upon Google & Greasyfork searching, he was always #1.<br /><br />

                    in january of 2024, another client named statefarm grew, and despite zertalious's attempts to take it down,
                    statefarm remained active. however, due to how big a name zertalious was, statefarm was always #2 on results.<br /><br />

                    this is an amazing case study on how SEO can control who sees your product.<br /><br />

                    the name of statefarm client was "StateFarmClient v3: Combat, ESP, Bloom..."<br />
                    the name of zertalious's client was "Shellshock.IO Aimbot & ESP"<br /><br />

                    it doesn't really take a genius to figure out the problem. despite being on all of the listings for shell
                    shockers, statefarm didn't actually have the needed words to just be #1.<br /><br />

                    on may 10th, 2024, one of the statefarm developers suggested adding "shell shockers" to the beginning of the name,
                    which the graph below proves worked like a charm.<br /><br />

                    this also just shows general client stats and has a few other clients. enjoy the show!
                </div>

                <div className={styles.key}>{scripts.map(x => <>
                    <span className={styles.circle} style={{ background: x.color }} />
                    {x.name}
                </>)}</div>

                {data.length && <Line className={styles.chart} options={{
                    plugins: {
                        legend: { display: false },
                        title: { display: false }
                    },
                    pointRadius: 0
                }} data={{
                    labels: keys || ['loading...'],
                    datasets: data.map(x => ({
                        label: x.name,
                        data: x.stats,
                        borderColor: x.color,
                        backgroundColor: x.color
                    }))
                }} />}
            </div>
        </>
    )
};

createRoot(document.getElementById('root')).render(<App />);
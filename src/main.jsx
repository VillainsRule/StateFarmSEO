import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import 'chart.js/auto';
import { Line } from 'react-chartjs-2';

import styles from './style.module.css';

let history = 200;

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
                <div className={styles.desc}>on may 10th, 2024, one of the statefarm developers suggested adding "shell shockers" to the beginning of the statefarm script to increase SEO on greasyfork. we have another "competitor", zertalious, who has adware-filled "script" with nearly no features that was beating us in installs. once we made these SEO changes to statefarm (and a few other partner scripts), we instantly did better in installs - can you tell?<br /><br />AS OF 10/3, ZERT IS GONE! WATCH THE SEO GO UP! zert went back up a whopping 2 weeks later, and still with his "fixed" code (the solution is straight from statefarm) he cannot manage to get near our numbers.</div>

                <div className={styles.key}>{scripts.map(x => <>
                    <span className={styles.circle} style={{ background: x.color }} />
                    {x.name}
                </>)}</div>

                {data.length && <Line className={styles.chart} options={{
                    plugins: {
                        legend: { display: false },
                        title: { display: false }
                    }
                }} data={{
                    labels: keys || ['loading...'],
                    datasets: data.map(x => ({
                        label: x.name,
                        data: x.stats,
                        borderColor: x.color,
                        backgroundColor: x.color
                    }))
                }} />}

                <div className={styles.footer}>
                    does this prove something? good, go try <span className={styles.link} onClick={() => window.open('https://greasyfork.org/scripts/482982', '_blank')}>statefarm</span>.
                    or, <span className={styles.link} onClick={() => window.open('https://github.com/HydroFlame522/StateFarmClient', '_blank')}>read the source</span>.
                </div>
            </div>
        </>
    )
};

createRoot(document.getElementById('root')).render(<App />);
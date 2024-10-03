import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import 'chart.js/auto';
import { Line } from 'react-chartjs-2';

import styles from './style.module.css';

function App() {
    let isZertEnabled = false;

    let [stats, setStats] = useState({ sf: [], zert: [], lib: [], shell: [] });

    useEffect(() => {
        (async () => {
            let sf = await axios.get('https://greasyfork.org/scripts/482982/stats.json');
            let lib = await axios.get('https://greasyfork.org/scripts/484168/stats.json');
            let shell = await axios.get('https://greasyfork.org/scripts/485745/stats.json');

            let zert;
            if (isZertEnabled)
                zert = await axios.get('https://greasyfork.org/scripts/436330/stats.json');

            setStats({
                sf: Object.fromEntries(Object.entries(sf.data).slice(-300)),
                zert: isZertEnabled ? Object.fromEntries(Object.entries(zert.data).slice(-300)) : null,
                lib: Object.fromEntries(Object.entries(lib.data).slice(-300)),
                shell: Object.fromEntries(Object.entries(shell.data).slice(-300))
            });
        })();
    }, []);

    return (
        <>
            <div className={styles.main}>
                <div className={styles.desc}>on may 10th, 2024, one of the statefarm developers suggested adding "shell shockers" to the beginning of the statefarm script to increase SEO on greasyfork. we have another "competitor", zertalious, who has adware-filled "script" with nearly no features that was beating us in installs. once we made these SEO changes to statefarm (and a few other partner scripts), we instantly did better in installs - can you tell?<br /><br />AS OF 10/3, ZERT IS GONE! WATCH THE SEO GO UP!</div>

                <div className={styles.key}>
                    <span className={styles.circle} style={{ background: 'rgb(255, 99, 132)' }} />
                    <s>zert</s>
                    <span className={styles.circle} style={{ background: 'rgb(53, 162, 235)', marginLeft: '3vw' }} />
                    statefarm
                    <span className={styles.circle} style={{ background: '#35eb41', marginLeft: '3vw' }} />
                    libertymutual
                    <span className={styles.circle} style={{ background: '#ebe834', marginLeft: '3vw' }} />
                    shellfarm
                </div>

                {Object.keys(stats.sf).length && (isZertEnabled ? Object.keys(stats.zert).length : true) ?
                    <Line className={styles.chart} options={{
                        plugins: {
                            legend: { display: false },
                            title: { display: false }
                        }
                    }} data={{
                        labels: Object.keys(stats.sf),
                        datasets: [(isZertEnabled ? {
                            label: 'zert',
                            data: Object.values(stats.zert).map(x => x.installs),
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgb(255, 99, 132)'
                        } : null), {
                            label: 'statefarm',
                            data: Object.values(stats.sf).map(x => x.installs),
                            borderColor: 'rgb(53, 162, 235)',
                            backgroundColor: 'rgb(53, 162, 235)'
                        }, {
                            label: 'libertymutual',
                            data: Object.values(stats.lib).map(x => x.installs),
                            borderColor: '#35eb41',
                            backgroundColor: '#35eb41'
                        }, {
                            label: 'shellfarm',
                            data: Object.values(stats.shell).map(x => x.installs),
                            borderColor: '#ebe834',
                            backgroundColor: '#ebe834'
                        }]
                    }} /> : ''}

                <div className={styles.footer}>
                    does this prove something? good, go try <span className={styles.link} onClick={() => window.open('https://greasyfork.org/scripts/482982', '_blank')}>statefarm</span>.
                    or, <span className={styles.link} onClick={() => window.open('https://github.com/HydroFlame522/StateFarmClient', '_blank')}>read the source</span>.
                </div>
            </div>
        </>
    )
};

createRoot(document.getElementById('root')).render(<App />);
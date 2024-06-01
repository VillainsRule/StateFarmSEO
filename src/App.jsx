import axios from 'axios';

import React, { useEffect, useState } from 'react';

import 'chart.js/auto';
import { Line } from 'react-chartjs-2';

import styles from './style.module.css';

export default function Dash() {
    let [stats, setStats] = useState({ sf: [], zert: [] });

    useEffect(() => {
        (async () => {
            let statefarmData = await axios.get('https://greasyfork.org/en/scripts/482982-shell-shockers-aimbot-esp-statefarm-client-v3-cheats-for-bloom-chat-botting-unbanning-more/stats');
            let zertData = await axios.get('https://greasyfork.org/en/scripts/436330-shellshock-io-aimbot-esp/stats');

            setStats({
                sf: JSON.parse(statefarmData.data.match(/initializeChart\((.*?), 'install-stats/)[1]),
                zert: JSON.parse(zertData.data.match(/initializeChart\((.*?), 'install-stats/)[1])
            });
        })();
    }, []);

    return (
        <>
            <div className={styles.main}>
                <div className={styles.desc}>on may 10th, 2024, one of our developers suggested adding "shell shockers" or "shellshock.io" to the beginning of the statefarm script to increase seo results on greasyfork. there is another major competitor named zertalious who had adware and no features that was somehow beating us in installs. once we improved the title of statefarm, we instantly did better. can you tell? introducing the statefarm seo update!!</div>
                <div className={styles.key}>
                    <span className={styles.circle} style={{ background: 'rgb(255, 99, 132)' }} />
                    zert
                    <span className={styles.circle} style={{ background: 'rgb(53, 162, 235)', marginLeft: '3vw' }} />
                    statefarm
                </div>

                {Object.keys(stats.sf).length && Object.keys(stats.zert).length ?
                    <Line className={styles.chart} options={{
                        plugins: {
                            legend: { display: false },
                            title: { display: false }
                        }
                    }} data={{
                        labels: Object.keys(stats.sf),
                        datasets: [{
                            label: 'zert',
                            data: Object.values(stats.zert),
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgb(255, 99, 132)'
                        }, {
                            label: 'statefarm',
                            data: Object.values(stats.sf),
                            borderColor: 'rgb(53, 162, 235)',
                            backgroundColor: 'rgb(53, 162, 235)'
                        }]
                    }} /> : ''}
            </div>
        </>
    )
}
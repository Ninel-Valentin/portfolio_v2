import { useState } from 'react';
import styles from '../../storage/style/taskbar/taskbar.module.css';

const DateTime = () => {
    const [timeData, setTimeData] = useState({
        time: "18:35:55",
        date: "20.09.2024",
        interval: undefined
    });

    const ProcessDateTime = () => {
        const dateObj = new Date();
        let time = dateObj.toLocaleTimeString('ro-RO');
        let date = dateObj.toLocaleDateString('ro-RO');
        setTimeData({
            time,
            date,
            interval: true
        });
    }

    if (!timeData.interval)
        setInterval(ProcessDateTime, 500);

    return (<p
        className={`${styles.interactiveTile} unselectable`}
        id={styles.datetime}>
        <span>
            {timeData.time}
        </span>
        <span>
            {timeData.date}
        </span>
    </p >);
};

export default DateTime;
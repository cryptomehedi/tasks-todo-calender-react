import React, { useEffect, useState } from 'react';

const DigitalClock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
    
        return () => clearInterval(interval);
    }, []);

    const formatTime = (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
    
        return `${hours}:${padZero(minutes)}:${padZero(seconds)}`;
    };
    
    const padZero = (number) => {
        return number < 10 ? `0${number}` : number;
    };



    return (
        <div className='text-center text-5xl'>
            <div>{formatTime(time)}</div>
        </div>
    );
};

export default DigitalClock;
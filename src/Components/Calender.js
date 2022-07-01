import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const Calender = () => {
    // const [selected, setSelected] = useState('');

    // let footer = <p>Please pick a day.</p>;
    // if (selected) {
    //     footer = <p>You picked {format(selected, 'PP')}.</p>;
    // }
    const currentDay = parseInt(new Date().getDate())
    const currentMonth = parseInt(new Date().getMonth())
    const currentYear = parseInt(new Date().getFullYear())
    const [date , setDate] = useState(new Date())
    const [fridays , setFridays] = useState([]) 
    
    useEffect(()=>{
        function fridaysInMonth() {
            let days = new Date( currentYear,currentMonth,0 ).getDate();
            let fridays = [ 4 - (new Date( currentMonth +'/01/'+ currentYear ).getDay()) ];
            for ( let i = fridays[0] + 7; i < days; i += 7 ) {
                fridays.push( i );
            }
            return fridays;
        }
        let disabledDays =[]
        fridaysInMonth().map(d => disabledDays.push(new Date(currentYear, currentMonth, d)))
        setFridays(disabledDays)
    },[date , currentMonth, currentYear, setFridays])
    
    return (
        <div className='flex justify-center lg:mt-10'> 
            <DayPicker
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={fridays}
                        ClassNames={`.custom-head   { color: red }`}
                        // showOutsideDays
                        defaultMonth={new Date(currentYear, currentMonth, currentDay)}
                        />
        </div>
    );
};

export default Calender;
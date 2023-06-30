import React, { useEffect, useState } from 'react'; 
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { bn } from 'date-fns/locale'
import { format } from 'date-fns';


const Calender = () => {
    const currentDay = parseInt(new Date().getDate())
    const currentMonth = parseInt(new Date().getMonth())
    const currentYear = parseInt(new Date().getFullYear())
    const [date , setDate] = useState(new Date())
    const [fridays , setFridays] = useState([]) 


    const seasonEmoji = {
        summer: '🌻',
        rainy : '⛈️',
        autumn: '⛅',
        late_autumn: '🍂',
        winter: '⛄️',
        spring: '🌸',
    };
    
    const getSeason = (month ) => {
        const monthNumber = month.getMonth();
        console.log(monthNumber);
        if (monthNumber === 11 || monthNumber === 0) return 'winter';
        if (monthNumber === 1 || monthNumber === 2) return 'spring';
        if (monthNumber === 3 || monthNumber === 4) return 'summer';
        if (monthNumber === 5 || monthNumber === 6) return 'rainy';
        if (monthNumber === 7 || monthNumber === 8) return 'autumn';
        else return 'late_autumn';
    };
    
    
    const formatCaption = (month, options) => {
        const season = getSeason(month);
        return (
            <>
                <span role="img" aria-label={season}>
                {seasonEmoji[season]}
                </span>{' '}
                {format(month, 'LLLL', { locale: options?.locale })}
            </>
        );
    };


    
    const css = `
                // .my-selected:not([disabled]) { 
                //     font-weight: bold; 
                //     border: 2px solid currentColor;
                // }
                .my-selected:hover:not([disabled]) { 
                    border-color: blue;
                    color: blue;
                }
                .my-today { 
                    font-weight: bold;
                    font-size: 140%; 
                    color: green;
                    border: 2px solid currentColor
                }
                `;
    
    useEffect(()=>{
        function fridaysInMonth() {
            let days = new Date( currentYear,currentMonth,0 ).getDate();
            let fridays = [ 3 - (new Date( currentMonth +'/01/'+ currentYear ).getDay()) ];
            for ( let i = fridays[0] + 7; i < days; i += 7 ) {
                fridays.push( i );
            }
            // let saturdays = [ 4 - (new Date( currentMonth +'/01/'+ currentYear ).getDay()) ];
            // for ( let i = saturdays[0] + 7; i < days; i += 7 ) {
            //     fridays.push( i );
            // }
            return fridays;
        }
        function saturdaysInMonth() {
            let days = new Date( currentYear,currentMonth,0 ).getDate();
            let saturdays = [ 4 - (new Date( currentMonth +'/01/'+ currentYear ).getDay()) ];
            for ( let i = saturdays[0] + 7; i < days; i += 7 ) {
                saturdays.push( i );
            }
            return saturdays;
        }
        let disabledDays =[]
        fridaysInMonth().map(d => disabledDays.push(new Date(currentYear, currentMonth, d)))
        saturdaysInMonth().map(d => disabledDays.push(new Date(currentYear, currentMonth, d)))
        setFridays(disabledDays)
    },[date , currentMonth, currentYear, setFridays])

    
    return (
        <div className='flex justify-center lg:mt-10'> 
                <style>{css}</style>
            <DayPicker
                        mode="single"
                        // firstWeekContainsDate={4}
                        // ISOWeek
                        showWeekNumber
                        formatters={{
                            // Add `W` prefix to week number
                            formatWeekNumber: (weekNumber) => `W${weekNumber}`,
                            formatCaption
                        }}
                        locale={bn}
                        selected={date}
                        onSelect={setDate}
                        disabled={fridays}
                        styles={{
                            caption: { color: 'red' }
                        }}
                        modifiersClassNames={{
                            selected: 'my-selected',
                            today : 'my-today'
                        }}
                        // showOutsideDays
                        defaultMonth={new Date(currentYear, currentMonth, currentDay)}
                        />
        </div>
    );
};

export default Calender;
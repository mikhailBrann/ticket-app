import uniqid from 'uniqid';
import classNames from 'classnames';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/defaultHook.tsx';
import { setCurrentDate } from "../redux/slices/SessionHallSlice";
import type {DateArray} from '../until/utils'
import {setFormattedDate, checkCurrentDateInArr, changeRenderDateElem} from '../until/utils'




function getDayWeeksArr(day = new Date(), direction = 'next') {
    const dateArray = [];

    switch (direction) {
        case 'next':
            for (let i = 0; i < 7; i++) {
                const nextDate = new Date(day);

                nextDate.setDate(day.getDate() + i);
                dateArray.push(
                    changeRenderDateElem(nextDate.toLocaleDateString())
                );
            }
            break;
        case 'prev':
            for (let i = 7; i >= 1; i--) {
                const nextDate = new Date(day);

                nextDate.setDate(day.getDate() - i);
                dateArray.push(
                    changeRenderDateElem(nextDate.toLocaleDateString())
                );
            }
            break;
        default:
            break;
    }
    
    return dateArray;
}

const SessionDay = () => {
    
    const [calendarDaysArr, setCalendarDaysArr] = useState<DateArray>([]);
    const [prevWeek, setPrevWeekStatus] = useState(false);
    const { 
        currentDate
    } = useAppSelector((state) => state.sessionHall);
    const dispatch = useAppDispatch();

    const today = new Date().toLocaleDateString();

    useEffect(() => {
        if(localStorage.getItem("currentDate") !== null) {
            dispatch(
                setCurrentDate(localStorage.getItem("currentDate"))
            );
        }

        setCalendarDaysArr(getDayWeeksArr());
    }, []);

    const setNextWeek = (event: React.MouseEvent) => {
        event.preventDefault();

        if(calendarDaysArr.length === 0) {
            return;
        }

        const lastDayInCurrentWeek = setFormattedDate(calendarDaysArr[calendarDaysArr.length - 1].value);
        const newDateValue = new Date(lastDayInCurrentWeek);
        
        setPrevWeekStatus(true);
        setCalendarDaysArr(getDayWeeksArr(newDateValue));
    }

    const setPrevWeek = (event: React.MouseEvent) => {
        event.preventDefault();
        
        if(calendarDaysArr.length === 0) {
            return;
        }

        const lastDayInCurrentWeek = setFormattedDate(calendarDaysArr[1].value);
        const newDateValue = new Date(lastDayInCurrentWeek);
        const newPrevDateArr = getDayWeeksArr(newDateValue, 'prev');

        if(checkCurrentDateInArr(today, newPrevDateArr)) {
            setPrevWeekStatus(false);
        }

        setCalendarDaysArr(newPrevDateArr);
    }

    const setDate = (event: React.MouseEvent) => {
        event.preventDefault();

        const value = (event.currentTarget as HTMLElement).dataset.value;

        if(value === currentDate) {
            return;
        }

        if(value) {
            dispatch(setCurrentDate(value));
        }
    }
    

    return (
        <>
        {calendarDaysArr.length > 0 && (
            <nav className="page-nav">
                {prevWeek && (
                    <a className="page-nav__day page-nav__day_prev" href="#" onClick={setPrevWeek}></a>
                )}
                {calendarDaysArr.map((item) => (
                    <a className={
                            classNames('page-nav__day', { 
                                'page-nav__day_today': setFormattedDate(today) === item.value,
                                'page-nav__day_chosen': currentDate === item.value
                            })
                        } 
                        href="#"
                        key={uniqid()}
                        data-value={ item.value }
                        onClick={setDate}>
                        <span className="page-nav__day-week">{ item.day_text }</span>
                        <span className="page-nav__day-number">{ item.number_val }</span>
                    </a>
                ))}
                <a className="page-nav__day page-nav__day_next" href="#" onClick={setNextWeek}></a>
            </nav>
        )}
        </>
        // <nav class="page-nav">
        //     <a class="page-nav__day page-nav__day_today" href="#">
        //     <span class="page-nav__day-week">Пн</span><span class="page-nav__day-number">31</span>
        //     </a>
        //     <a class="page-nav__day" href="#">
        //     <span class="page-nav__day-week">Вт</span><span class="page-nav__day-number">1</span>
        //     </a>
        //     <a class="page-nav__day page-nav__day_chosen" href="#">
        //     <span class="page-nav__day-week">Ср</span><span class="page-nav__day-number">2</span>
        //     </a>
        //     <a class="page-nav__day" href="#">
        //     <span class="page-nav__day-week">Чт</span><span class="page-nav__day-number">3</span>
        //     </a>
        //     <a class="page-nav__day" href="#">
        //     <span class="page-nav__day-week">Пт</span><span class="page-nav__day-number">4</span>
        //     </a>
        //     <a class="page-nav__day page-nav__day_weekend" href="#">
        //     <span class="page-nav__day-week">Сб</span><span class="page-nav__day-number">5</span>
        //     </a>
        //     <a class="page-nav__day page-nav__day_next" href="#">
        //     </a>
        // </nav>
    );
}

export default SessionDay;
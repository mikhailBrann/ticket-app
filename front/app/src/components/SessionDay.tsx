// import uniqid from 'uniqid';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/defaultHook.tsx';
import { setCurrentDate } from "../redux/slices/SessionHallSlice";
import { fetchFilms } from '../redux/slices/FilmsSlice.tsx';
import type { DateArray } from '../until/utils'
import { setFormattedDate, checkCurrentDateInArr, getDayWeeksArr } from '../until/utils'

const SessionDay = () => {
    const today = new Date().toLocaleDateString();
    const [calendarDaysArr, setCalendarDaysArr] = useState<DateArray>([]);
    const [prevWeek, setPrevWeekStatus] = useState(false);
    const { 
        currentDate
    } = useAppSelector((state) => state.sessionHall);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchFilms(`changeDate=${today}`));
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
            dispatch(fetchFilms(`changeDate=${value}`));
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
                                'page-nav__day_chosen': currentDate == item.value
                            })
                        } 
                        href="#"
                        key={uuidv4()}
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
    );
}

export default SessionDay;
type DateArray = Array<{
    number_val: number;
    is_holiday: boolean;
    day_text: string;
    value: string;
}>;

type SessionInHall = {
  id: number;
  cinema_hall_id: number;
  film_id: number;
  from: string; // ISO date string
  to: string;   // ISO date string
};

type CinemaHall = {
  id: number;
  name: string;
  laravel_through_key?: number; // optional, as it comes from hasManyThrough
};

type Film = {
  id: number;
  title: string;
  description?: string;
  image?: string;
  image_url?: string;
  duration?: string;
  session_in_halls: SessionInHall[];
  cinema_halls: CinemaHall[];
};

const setFormattedDate = (dateValue: string) => {
    const dateParts = dateValue.split('.');
    const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

    return formattedDate;
}

const getTimeFromDate = (dateValue: string) => {
    const date = new Date(dateValue);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
}

const checkCurrentDateInArr = (dateValue: string, dateArray: DateArray) => {
    return dateArray
        .find(elem => elem.value == setFormattedDate(dateValue)) 
        ?? false;
}

const changeRenderDateElem = (dateValue: string) => {
    const formattedDate = setFormattedDate(dateValue);
    const date = new Date(formattedDate);
    const numberVal = date.getDate();
    const dayOfWeek = date.getDay();
    const isHoliday = dayOfWeek === 0 || dayOfWeek === 6;
    const daysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const dayText = daysOfWeek[dayOfWeek];
    
    return {
        "number_val": numberVal,
        "is_holiday": isHoliday,
        "day_text": dayText,
        "value": formattedDate
    };
}

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

const fetcApi = async(
    urlApiPath: string, 
    method: string = "GET", 
    data: any = null
) => {
    const url = import.meta.env.VITE_API_URL + urlApiPath;
    const params = {
        method,
        headers: {
        'Content-Type': 'application/json'
        },
        body: ''
    };

    if(data !== null) {
        params.body = JSON.stringify(data);
    }

    const response = await fetch(url, params);

    return await response.json();
};

export type {
    DateArray,
    SessionInHall,
    CinemaHall,
    Film
}
export {
    setFormattedDate, 
    checkCurrentDateInArr, 
    changeRenderDateElem, 
    getDayWeeksArr,
    getTimeFromDate,
    fetcApi
}
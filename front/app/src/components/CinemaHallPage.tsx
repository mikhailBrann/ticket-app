import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/defaultHook.tsx';
import { fetchSessionInHall } from '../redux/slices/SessionHallSlice.tsx';
import { fetcApi, getTimeFromDate } from '../until/utils.ts';
import CinemaHallSheme from './CinemaHallSheme.tsx';
import { useNavigate } from 'react-router-dom';

type BookedSeatsListType = Array<number>;
type CinemaHallType = {
    id: number;
    name: string;
    prices: Array<any>;
    seats: Array<any>
};
type SessionInHallType = {
    id: number;
    film_id: number;
    cinema_hall_id: number;
    from: string;
    to: string;
    film: any
}

const CinemaHallPage = () => {
    const { hall_id, session_id } = useParams();
    const [seatsList, setSeatsList] = useState([]);
    const [seatsIsLoaded, setSeatsIsLoaded] = useState(true);
    const [fetchBookingErr, setFetchBookingErr] = useState(false);
    const [priceList, setpriceList] = useState([]);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { 
        sessionInHall,
        sessionInHallError
    } = useAppSelector((state) => state.sessionHall);
    const cinemaHall = sessionInHall?.cinemaHall ?? {} as CinemaHallType;
    const currentSessionInHall = sessionInHall?.sessionInHall ?? {} as SessionInHallType;
    const bookedSeatsList = sessionInHall?.bookedSeatsList ?? [] as BookedSeatsListType;
    const sessionStart = currentSessionInHall?.from ? 
      getTimeFromDate(currentSessionInHall?.from) : "";

    const onSeatClick = (event) => {
        const seatId = event.currentTarget.dataset?.seatId ?? false;
        const newSeatList = seatsList;
        let exitFlag = false;
        
        if(!seatId) {
          return;
        }

        for(const row of newSeatList) {
            if(exitFlag) {
                break;
            }

            row.forEach(elem => {
                if(elem.id == seatId) {
                    elem.isChange = !elem.isChange;
                    exitFlag = true;
                }
            });
        }

        setSeatsList([...newSeatList]);
    }

    const onSubmitBooking = async () => {
        if(fetchBookingErr) {
            return;
        }

        const changedSeats = seatsList
            .flat()
            .filter(seat => seat?.isChange === true);
        const sendData = {
            "film_id": currentSessionInHall?.film?.id,
            "seat_id_list": changedSeats.map(seat => seat.id),
            "cinema_hall_id": cinemaHall?.id,
            "session_in_hall_id": currentSessionInHall?.id,
            "summ": changedSeats.reduce((acc, currentElem) => acc + parseFloat(currentElem?.price), 0)
        };
        const request = await fetcApi("/booking", "POST", sendData);

        if(request?.code_err == 'dublicate') {
            setFetchBookingErr(request.err + ' | alredy booking seats: ' + request.value);
            setTimeout(() => setFetchBookingErr(false), 3000);
        }

        if(request?.booking_id) {
            navigate("/payment/" + request.booking_id);
        }
    }

    const _fetchData = async () => {
        await dispatch(fetchSessionInHall(`hallId=${hall_id}&sessionInHallId=${session_id}`));

        const updatedPriceList = cinemaHall?.prices ?? [];
        const seats = [];

        setpriceList(updatedPriceList);

        if (cinemaHall && cinemaHall.seats) {
            cinemaHall.seats.forEach((seat: any) => {
                const rowIndex = seat.row ? seat.row - 1 : 0;
                const findPrice = updatedPriceList.find((elem: any) => elem?.seat_type === seat?.type) ?? false;
                const isBooked = bookedSeatsList.includes(seat.seat_number);
                const isChange = false;
                const price = findPrice ? findPrice.price : undefined;
                const seatWithPrice = {
                    ...seat,
                    price,
                    isChange,
                    isBooked
                };

                if (!(rowIndex in seats)) {
                    seats[rowIndex] = [];
                } 

                seats[rowIndex].push(seatWithPrice);
            });
        }

        setSeatsList(seats);
        setSeatsIsLoaded(false);
    }; 

    useEffect(() => {
        _fetchData();
    }, [seatsIsLoaded]);
    
    return (
        <>
        {seatsIsLoaded && <div>Loading...</div>}
        {sessionInHallError && <div>Error: {sessionInHallError}</div>}
        {!seatsIsLoaded && (() => {            
        return(
            <main>
                <section className="buying">
                    <div className="buying__info">
                        <div className="buying__info-description">
                        <h2 className="buying__info-title">{currentSessionInHall?.film?.title}</h2>
                        <p className="buying__info-start">Начало сеанса: {sessionStart}</p>
                        <p className="buying__info-hall">{cinemaHall?.name}</p>          
                        </div>
                        <div className="buying__info-hint">
                            <p>Тапните дважды,<br/>чтобы увеличить</p>
                        </div>
                    </div>
                    {seatsList.length > 0 && 
                        <CinemaHallSheme
                            onSeatClick={onSeatClick} 
                            seats={seatsList} 
                            priceArr={priceList}/>}
                    <button className="acceptin-button" onClick={onSubmitBooking}>Забронировать</button>
                </section>
            </main>
        );
        })()}
        {fetchBookingErr != false && (
            <h3>{fetchBookingErr}</h3>
        )}
        </>
    )
}

export default CinemaHallPage;
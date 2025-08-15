import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/defaultHook.tsx';
import { fetchSessionInHall } from '../redux/slices/SessionHallSlice.tsx';
import { getTimeFromDate } from '../until/utils.ts';
import CinemaHallSheme from './CinemaHallSheme.tsx';

const CinemaHallPage = () => {
    const { hall_id, session_id } = useParams();
    const [seatsList, setSeatsList] = useState([]);
    const [seatsIsLoaded, setSeatsIsLoaded] = useState(true);
    const [priceList, setpriceList] = useState([]);
    const dispatch = useAppDispatch();
    const { 
        sessionInHall,
        sessionInHallError
    } = useAppSelector((state) => state.sessionHall);
    const cinemaHall = sessionInHall?.cinemaHall;
    const currentSessionInHall = sessionInHall?.sessionInHall;
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

    const onSubmitBooking = () => {
        const changedSeats = seatsList.flat().filter(seat => seat?.isChange === true);
        /*
        'is_active',
        'film_id',
        'seat_id_list',
        'cinema_hall_id',
        'session_in_hall_id',
        'summ',
        */
       const sendData = {

       };

        console.log(changedSeats);
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
                const seatWithPrice = {
                    ...seat,
                    price: findPrice ? findPrice.price : undefined,
                    isChange: false
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
      </>
    )
}

export default CinemaHallPage;
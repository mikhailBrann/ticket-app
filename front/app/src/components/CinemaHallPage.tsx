import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/defaultHook.tsx';
import { fetchSessionInHall } from '../redux/slices/SessionHallSlice.tsx';
import { getTimeFromDate } from '../until/utils.ts';
import CinemaHallSheme from './CinemaHallSheme.tsx';

const CinemaHallPage = () => {
    const { hall_id, session_id } = useParams();
    const dispatch = useAppDispatch();
    const { 
        sessionInHall,
        sessionInHallLoading,
        sessionInHallError
    } = useAppSelector((state) => state.sessionHall);

    useEffect(() => {
        dispatch(fetchSessionInHall(`hallId=${hall_id}&sessionInHallId=${session_id}`));
    }, [dispatch, hall_id, session_id]);
    
    return (
        <>
            {sessionInHallLoading && <div>Loading...</div>}
            {sessionInHallError && <div>Error: {sessionInHallError}</div>}
            {!sessionInHallLoading 
                && (() => {
                    const seats = [];
                    const cinemaHall = sessionInHall.cinemaHall;
                    const currentSessionInHall = sessionInHall.sessionInHall;
                    const sessionStart = currentSessionInHall?.from ? 
                        getTimeFromDate(currentSessionInHall?.from) : "";
                    const prices = cinemaHall?.prices ?? [];

                    if(cinemaHall && cinemaHall.seats) {
                        cinemaHall.seats.map((seat: any) => {
                            const rowIndex = seat.row ? seat.row - 1 : 1;
                            
                            if(rowIndex in seats == false) {
                                seats[rowIndex] = [];
                            } 

                            seats[rowIndex].push(seat);
                        });
                    }
                    

                    return (<main>
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
                            {seats.length > 0 && <CinemaHallSheme seats={seats} priceArr={prices}/>}
                        </section>
                    </main>);
                })()
            }
        </>
    )

}

export default CinemaHallPage;

/*
<main>
    <section class="buying">
      <div class="buying__info">
        <div class="buying__info-description">
          <h2 class="buying__info-title">Звёздные войны XXIII: Атака клонированных клонов</h2>
          <p class="buying__info-start">Начало сеанса: 18:30</p>
          <p class="buying__info-hall">Зал 1</p>          
        </div>
        <div class="buying__info-hint">
          <p>Тапните дважды,<br>чтобы увеличить</p>
        </div>
      </div>
      <div class="buying-scheme">
        <div class="buying-scheme__wrapper">
          <div class="buying-scheme__row">
            <span class="buying-scheme__chair buying-scheme__chair_disabled"></span><span class="buying-scheme__chair buying-scheme__chair_disabled"></span>
            <span class="buying-scheme__chair buying-scheme__chair_disabled"></span><span class="buying-scheme__chair buying-scheme__chair_disabled"></span>
              <span class="buying-scheme__chair buying-scheme__chair_disabled"></span><span class="buying-scheme__chair buying-scheme__chair_standart"></span>
              <span class="buying-scheme__chair buying-scheme__chair_standart"></span><span class="buying-scheme__chair buying-scheme__chair_disabled"></span>
              <span class="buying-scheme__chair buying-scheme__chair_disabled"></span><span class="buying-scheme__chair buying-scheme__chair_disabled"></span>
            <span class="buying-scheme__chair buying-scheme__chair_disabled"></span><span class="buying-scheme__chair buying-scheme__chair_disabled"></span>
            </div>  

            <div class="buying-scheme__row">
              <span class="buying-scheme__chair buying-scheme__chair_disabled"></span><span class="buying-scheme__chair buying-scheme__chair_disabled"></span>
              <span class="buying-scheme__chair buying-scheme__chair_disabled"></span><span class="buying-scheme__chair buying-scheme__chair_disabled"></span>
              <span class="buying-scheme__chair buying-scheme__chair_taken"></span><span class="buying-scheme__chair buying-scheme__chair_standart"></span>
              <span class="buying-scheme__chair buying-scheme__chair_standart"></span><span class="buying-scheme__chair buying-scheme__chair_standart"></span>
              <span class="buying-scheme__chair buying-scheme__chair_disabled"></span><span class="buying-scheme__chair buying-scheme__chair_disabled"></span>
              <span class="buying-scheme__chair buying-scheme__chair_disabled"></span><span class="buying-scheme__chair buying-scheme__chair_disabled"></span>
            </div>  

            <div class="buying-scheme__row">
              <span class="buying-scheme__chair buying-scheme__chair_disabled"></span><span class="buying-scheme__chair buying-scheme__chair_standart"></span>
              <span class="buying-scheme__chair buying-scheme__chair_standart"></span><span class="buying-scheme__chair buying-scheme__chair_standart"></span>
              <span class="buying-scheme__chair buying-scheme__chair_standart"></span><span class="buying-scheme__chair buying-scheme__chair_standart"></span>
              <span class="buying-scheme__chair buying-scheme__chair_standart"></span><span class="buying-scheme__chair buying-scheme__chair_standart"></span>
              <span class="buying-scheme__chair buying-scheme__chair_standart"></span><span class="buying-scheme__chair buying-scheme__chair_disabled"></span>
              <span class="buying-scheme__chair buying-scheme__chair_disabled"></span><span class="buying-scheme__chair buying-scheme__chair_disabled"></span>
            </div>  

            <div class="buying-scheme__row">
              <span class="buying-scheme__chair buying-scheme__chair_standart"></span><span class="buying-scheme__chair buying-scheme__chair_standart"></span>
              <span class="buying-scheme__chair buying-scheme__chair_standart"></span><span class="buying-scheme__chair buying-scheme__chair_standart"></span>
              <span class="buying-scheme__chair buying-scheme__chair_standart"></span><span class="buying-scheme__chair buying-scheme__chair_vip"></span>
              <span class="buying-scheme__chair buying-scheme__chair_vip"></span><span class="buying-scheme__chair buying-scheme__chair_standart"></span>
              <span class="buying-scheme__chair buying-scheme__chair_standart"></span><span class="buying-scheme__chair buying-scheme__chair_disabled"></span>
              <span class="buying-scheme__chair buying-scheme__chair_disabled"></span><span class="buying-scheme__chair buying-scheme__chair_disabled"></span>
            </div>  

            <div class="buying-scheme__row">
              <span class="buying-scheme__chair buying-scheme__chair_standart"></span><span class="buying-scheme__chair buying-scheme__chair_standart"></span>
              <span class="buying-scheme__chair buying-scheme__chair_standart"></span><span class="buying-scheme__chair buying-scheme__chair_standart"></span>
              <span class="buying-scheme__chair buying-scheme__chair_vip"></span><span class="buying-scheme__chair buying-scheme__chair_vip"></span>
              <span class="buying-scheme__chair buying-scheme__chair_vip"></span><span class="buying-scheme__chair buying-scheme__chair_vip"></span>
              <span class="buying-scheme__chair buying-scheme__chair_standart"></span><span class="buying-scheme__chair buying-scheme__chair_disabled"></span>
              <span class="buying-scheme__chair buying-scheme__chair_disabled"></span><span class="buying-scheme__chair buying-scheme__chair_disabled"></span>
            </div>  

            <div class="buying-scheme__row">
              <span class="buying-scheme__chair buying-scheme__chair_standart"></span><span class="buying-scheme__chair buying-scheme__chair_standart"></span>
              <span class="buying-scheme__chair buying-scheme__chair_standart"></span><span class="buying-scheme__chair buying-scheme__chair_standart"></span>
              <span class="buying-scheme__chair buying-scheme__chair_vip"></span><span class="buying-scheme__chair buying-scheme__chair_taken"></span>
              <span class="buying-scheme__chair buying-scheme__chair_taken"></span><span class="buying-scheme__chair buying-scheme__chair_taken"></span>
              <span class="buying-scheme__chair buying-scheme__chair_standart"></span><span class="buying-scheme__chair buying-scheme__chair_disabled"></span>
              <span class="buying-scheme__chair buying-scheme__chair_disabled"></span><span class="buying-scheme__chair buying-scheme__chair_disabled"></span>
            </div>  

            <div class="buying-scheme__row">
              <span class="buying-scheme__chair buying-scheme__chair_standart"></span><span class="buying-scheme__chair buying-scheme__chair_standart"></span>
              <span class="buying-scheme__chair buying-scheme__chair_standart"></span><span class="buying-scheme__chair buying-scheme__chair_standart"></span>
              <span class="buying-scheme__chair buying-scheme__chair_vip"></span><span class="buying-scheme__chair buying-scheme__chair_taken"></span>
              <span class="buying-scheme__chair buying-scheme__chair_taken"></span><span class="buying-scheme__chair buying-scheme__chair_vip"></span>
              <span class="buying-scheme__chair buying-scheme__chair_standart"></span><span class="buying-scheme__chair buying-scheme__chair_disabled"></span>
              <span class="buying-scheme__chair buying-scheme__chair_disabled"></span><span class="buying-scheme__chair buying-scheme__chair_disabled"></span>
            </div>  

            <div class="buying-scheme__row">
              <span class="buying-scheme__chair buying-scheme__chair_standart"></span><span class="buying-scheme__chair buying-scheme__chair_standart"></span>
              <span class="buying-scheme__chair buying-scheme__chair_standart"></span><span class="buying-scheme__chair buying-scheme__chair_standart"></span>
              <span class="buying-scheme__chair buying-scheme__chair_standart"></span><span class="buying-scheme__chair buying-scheme__chair_selected"></span>
              <span class="buying-scheme__chair buying-scheme__chair_selected"></span><span class="buying-scheme__chair buying-scheme__chair_standart"></span>
              <span class="buying-scheme__chair buying-scheme__chair_standart"></span><span class="buying-scheme__chair buying-scheme__chair_disabled"></span>
              <span class="buying-scheme__chair buying-scheme__chair_disabled"></span><span class="buying-scheme__chair buying-scheme__chair_disabled"></span>
            </div>  

            <div class="buying-scheme__row">
              <span class="buying-scheme__chair buying-scheme__chair_standart"></span><span class="buying-scheme__chair buying-scheme__chair_taken"></span>
              <span class="buying-scheme__chair buying-scheme__chair_standart"></span><span class="buying-scheme__chair buying-scheme__chair_taken"></span>
              <span class="buying-scheme__chair buying-scheme__chair_standart"></span><span class="buying-scheme__chair buying-scheme__chair_taken"></span>
              <span class="buying-scheme__chair buying-scheme__chair_standart"></span><span class="buying-scheme__chair buying-scheme__chair_standart"></span>
              <span class="buying-scheme__chair buying-scheme__chair_standart"></span><span class="buying-scheme__chair buying-scheme__chair_standart"></span>
              <span class="buying-scheme__chair buying-scheme__chair_standart"></span><span class="buying-scheme__chair buying-scheme__chair_standart"></span>
            </div>  

            <div class="buying-scheme__row">
              <span class="buying-scheme__chair buying-scheme__chair_standart"></span><span class="buying-scheme__chair buying-scheme__chair_standart"></span>
              <span class="buying-scheme__chair buying-scheme__chair_standart"></span><span class="buying-scheme__chair buying-scheme__chair_standart"></span>
              <span class="buying-scheme__chair buying-scheme__chair_standart"></span><span class="buying-scheme__chair buying-scheme__chair_taken"></span>
              <span class="buying-scheme__chair buying-scheme__chair_taken"></span><span class="buying-scheme__chair buying-scheme__chair_taken"></span>
              <span class="buying-scheme__chair buying-scheme__chair_standart"></span><span class="buying-scheme__chair buying-scheme__chair_standart"></span>
              <span class="buying-scheme__chair buying-scheme__chair_standart"></span><span class="buying-scheme__chair buying-scheme__chair_standart"></span>
            </div>
        </div>
        <div class="buying-scheme__legend">
          <div class="col">
            <p class="buying-scheme__legend-price"><span class="buying-scheme__chair buying-scheme__chair_standart"></span> Свободно (<span class="buying-scheme__legend-value">250</span>руб)</p>
            <p class="buying-scheme__legend-price"><span class="buying-scheme__chair buying-scheme__chair_vip"></span> Свободно VIP (<span class="buying-scheme__legend-value">350</span>руб)</p>            
          </div>
          <div class="col">
            <p class="buying-scheme__legend-price"><span class="buying-scheme__chair buying-scheme__chair_taken"></span> Занято</p>
            <p class="buying-scheme__legend-price"><span class="buying-scheme__chair buying-scheme__chair_selected"></span> Выбрано</p>                    
          </div>
        </div>
      </div>
      <button class="acceptin-button" onclick="location.href='payment.html'" >Забронировать</button>
    </section>     
  </main>
 */
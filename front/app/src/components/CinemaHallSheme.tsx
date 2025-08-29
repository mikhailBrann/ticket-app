import { useId } from 'react';
import classNames from 'classnames';

const CinemaHallSheme = ({seats, priceArr, onSeatClick}) => {
    return (
        <>
        <div className="buying-scheme">
            <div className="buying-scheme__wrapper">
                {seats && seats.map((row) => (
                    <div key={useId()} className="buying-scheme__row">
                        {row.map((seat) => {
                            if(seat.isBooked) {
                              return (
                                <span key={useId()}
                                    data-seat-id={seat.id}
                                    data-test={seat.isChange}
                                    className={
                                        classNames(
                                          'buying-scheme__chair', 
                                          'buying-scheme__chair_taken'
                                        )
                                    }>
                                </span>
                              );
                            }

                            return (
                              <span key={useId()}
                                  onClick={onSeatClick}
                                  data-seat-id={seat.id}
                                  data-test={seat.isChange}
                                  className={
                                      classNames('buying-scheme__chair', { 
                                          'buying-scheme__chair_vip': seat.type == 'vip',
                                          'buying-scheme__chair_standart': seat.type == 'regular',
                                          'buying-scheme__chair_selected': seat.isChange == true
                                      })
                                  }>
                              </span>
                            );
                          }
                        )}
                    </div>
                ))}
            </div>
            <div className="buying-scheme__legend">
                <div className="col">
                    {priceArr.map((price) => {
                        const priceFormattedVal = parseFloat(price?.price);
                        return(
                          <div key={useId()} className="buying-scheme__legend-price">
                              <span className={
                                classNames('buying-scheme__chair', { 
                                    'buying-scheme__chair_vip': price?.seat_type == 'vip',
                                    'buying-scheme__chair_standart': price?.seat_type == 'regular',
                                })
                              }>
                              </span> Свободно {price?.seat_type} (<span className="buying-scheme__legend-value">{priceFormattedVal}</span> руб)
                          </div>
                        );
                      }
                    )}           
                </div>
                <div className="col">
                    <p className="buying-scheme__legend-price"><span className="buying-scheme__chair buying-scheme__chair_taken"></span> Занято</p>
                    <p className="buying-scheme__legend-price"><span className="buying-scheme__chair buying-scheme__chair_selected"></span> Выбрано</p>                    
                </div>
            </div>
        </div>
        </>
    );
}

export default CinemaHallSheme;
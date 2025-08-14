import uniqid from 'uniqid';
import classNames from 'classnames';


const CinemaHallSheme = ({seats, priceArr}) => {
    console.log(priceArr);
    return (
        <>
        <div className="buying-scheme">
            <div className="buying-scheme__wrapper" key={uniqid()}>
                {seats && seats.map((row) => (
                    <div className="buying-scheme__row">
                        {row.map((seat) => (
                            <span key={uniqid()}
                                className={
                                    classNames('buying-scheme__chair', { 
                                        'buying-scheme__chair_vip': seat.type == 'vip',
                                        'buying-scheme__chair_standart': seat.type == 'regular',
                                    })
                                }>
                            </span>
                        ))}
                    </div>
                ))}
            </div>
            <div className="buying-scheme__legend">
                <div className="col">
                    {priceArr.map((price) => (
                        <p className="buying-scheme__legend-price">
                            <span className={
                                    classNames('buying-scheme__chair', { 
                                        'buying-scheme__chair_vip': price?.seat_type == 'vip',
                                        'buying-scheme__chair_standart': price?.seat_type == 'regular',
                                    })
                                }>
                            </span> 
                            Свободно {price?.seat_type} (<span className="buying-scheme__legend-value">{price?.price}</span> руб)
                        </p>
                    ))}           
                </div>
                <div className="col">
                    <p className="buying-scheme__legend-price"><span className="buying-scheme__chair buying-scheme__chair_taken"></span> Занято</p>
                    <p className="buying-scheme__legend-price"><span className="buying-scheme__chair buying-scheme__chair_selected"></span> Выбрано</p>                    
                </div>
            </div>
        </div>
        <button className="acceptin-button" >Забронировать</button>
        </>
    );
}

export default CinemaHallSheme;

/* 
className={
    classNames('page-nav__day', { 
        'page-nav__day_today': setFormattedDate(today) === item.value,
        'page-nav__day_chosen': currentDate === item.value
    })
}
*/

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
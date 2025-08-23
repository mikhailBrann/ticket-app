import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetcApi, getTimeFromDate } from '../until/utils.ts';
import type {Payment} from '../until/utils.ts';

const TicketPage = () => {
    const { payment_id } = useParams();
    const [payment, setPayment] = useState<null|Payment>(null);
    const [paymentIsLoaded, setPaymentIsLoaded] = useState(false);
    const [fetchPaymentErr, setFetchPaymentErr] = useState(false);
    const navigate = useNavigate();

    return (
        <>
        {paymentIsLoaded && <div>Loading...</div>}
        {!paymentIsLoaded && !fetchPaymentErr && (() => {

            return(
                <main>
                    <section className="ticket">
                    
                    <header className="tichet__check">
                        <h2 className="ticket__check-title">Электронный билет</h2>
                    </header>
                    
                    <div className="ticket__info-wrapper">
                        <p className="ticket__info">На фильм: <span className="ticket__details ticket__title">Звёздные войны XXIII: Атака клонированных клонов</span></p>
                        <p className="ticket__info">Места: <span className="ticket__details ticket__chairs">6, 7</span></p>
                        <p className="ticket__info">В зале: <span className="ticket__details ticket__hall">1</span></p>
                        <p className="ticket__info">Начало сеанса: <span className="ticket__details ticket__start">18:30</span></p>

                        <img className="ticket__info-qr" src="i/qr-code.png"/>

                        <p className="ticket__hint">Покажите QR-код нашему контроллеру для подтверждения бронирования.</p>
                        <p className="ticket__hint">Приятного просмотра!</p>
                    </div>
                    </section>     
                </main>
            );
        })()}
        {fetchPaymentErr != false && (
            <h3>{fetchPaymentErr}</h3>
        )}
        </>
    );
};

export default TicketPage;
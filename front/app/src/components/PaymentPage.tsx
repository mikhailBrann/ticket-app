import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetcApi, getTimeFromDate } from '../until/utils.ts';
import type {Payment} from '../until/utils.ts';

const PaymentPage = () => {
    const { payment_id } = useParams();
    const [payment, setPayment] = useState<null|Payment>(null);
    const [paymentIsLoaded, setPaymentIsLoaded] = useState(true);
    const [fetchPaymentErr, setFetchPaymentErr] = useState(false);
    const navigate = useNavigate();

    const _fetchData = async () => {
        const result = await fetcApi("/payment/" + payment_id);
        
        if(result?.id) {
            setPayment(result);
        }

        if(result?.code_err) {
            setFetchPaymentErr(result?.err);
        }

        setPaymentIsLoaded(false);
    }; 
    const sendBooking = async () => {
        const ticketUrlToQRCode =  `${window.location.origin}/ticket/`;
        const result = await fetcApi(
            "/payment/" + payment_id, 
            "PUT", 
            {
                "is_active": true,
                "url_value": ticketUrlToQRCode
            }
        );

        if(result?.code_err == 'booked') {
            setFetchPaymentErr(result?.err);
            setTimeout(() => 
                navigate("/hall/" + payment?.cinema_hall_id + "/session/" + payment?.session_hall_id
            ), 3000);
        }

        if(result?.success && result?.id) {
            navigate("/ticket/" + result?.id);
        }
    }

    useEffect(() => {
        _fetchData();
    }, [paymentIsLoaded]);

    return (
        <>
        {paymentIsLoaded && <div>Loading...</div>}
        {!paymentIsLoaded && !fetchPaymentErr && (() => {
            const seatsToString = payment?.seats_list ? 
                Array.from(payment?.seats_list).join(",") : "";
            const from = payment?.film_session_start ? 
                getTimeFromDate(payment?.film_session_start) : "";

            return(
                <main>
                    <section className="ticket">
                    <header className="tichet__check">
                        <h2 className="ticket__check-title">Вы выбрали билеты:</h2>
                    </header>
                    <div className="ticket__info-wrapper">
                        <p className="ticket__info">На фильм: <span className="ticket__details ticket__title">{payment?.film_title}</span></p>
                        <p className="ticket__info">Места: <span className="ticket__details ticket__chairs">{seatsToString}</span></p>
                        <p className="ticket__info">В зале: <span className="ticket__details ticket__hall">{payment?.cinema_hall_name}</span></p>
                        <p className="ticket__info">Начало сеанса: <span className="ticket__details ticket__start">{from}</span></p>
                        <p className="ticket__info">Стоимость: <span className="ticket__details ticket__cost">{payment?.summ}</span> рублей</p>
                        <button className="acceptin-button" onClick={sendBooking}>Получить код бронирования</button>
                        <p className="ticket__hint">После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал.</p>
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

export default PaymentPage;
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetcApi, getTimeFromDate } from '../until/utils.ts';
import type { Ticket } from '../until/utils.ts';


const TicketPage = () => {
    const { ticket_id } = useParams();
    const [ticket, setTicket] = useState<null|Ticket>(null);
    const [ticketIsLoaded, setTicketIsLoaded] = useState(false);
    const [fetchTicketErr, setFetchTicketErr] = useState(false);

    const _fetchData = async () => {
        const result = await fetcApi("/ticket/" + ticket_id);
        
        if(result?.id) {
            setTicket(result);
        }

        if(result?.code_err) {
            setFetchTicketErr(result?.err);
        }

        setTicketIsLoaded(false);
    };
    
    useEffect(() => {
        _fetchData();
    }, [ticketIsLoaded]);

    return (
        <>
        {ticketIsLoaded && <div>Loading...</div>}
        {!ticketIsLoaded && !fetchTicketErr && (() => {
            const seatsToString = ticket?.seats_list ? 
                Array.from(ticket?.seats_list).join(",") : "";
            const from = ticket?.film_session_start ? 
                getTimeFromDate(ticket?.film_session_start) : "";

            return(
                <main>
                    <section className="ticket">
                    
                    <header className="tichet__check">
                        <h2 className="ticket__check-title">Электронный билет</h2>
                    </header>
                    
                    <div className="ticket__info-wrapper">
                        <p className="ticket__info">На фильм: <span className="ticket__details ticket__title">{ticket?.film_title}</span></p>
                        <p className="ticket__info">Места: <span className="ticket__details ticket__chairs">{seatsToString}</span></p>
                        <p className="ticket__info">В зале: <span className="ticket__details ticket__hall">{ticket?.cinema_hall_name}</span></p>
                        <p className="ticket__info">Начало сеанса: <span className="ticket__details ticket__start">{from}</span></p>

                        <img className="ticket__info-qr" src={ticket?.image}/>

                        <p className="ticket__hint">Покажите QR-код нашему контроллеру для подтверждения бронирования.</p>
                        <p className="ticket__hint">Приятного просмотра!</p>
                    </div>
                    </section>     
                </main>
            );
        })()}
        {fetchTicketErr != false && (
            <h3>{fetchTicketErr}</h3>
        )}
        </>
    );
};

export default TicketPage;
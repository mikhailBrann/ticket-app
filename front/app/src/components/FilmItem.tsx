import { getTimeFromDate, type Film } from "../until/utils";
import uniqid from 'uniqid';


const FilmItem = (film: Film) => {
    return (
         <section className="movie">
            <div className="movie__info">
                {film.image_url && (
                    <div className="movie__poster">
                        <img className="movie__poster-image" 
                            alt={film.title} 
                            src={film.image_url}/>
                    </div>
                )}
                <div className="movie__description">
                    <h2 className="movie__title">{film.title}</h2>
                    {film.description && (
                        <p className="movie__synopsis">{film.description}</p>
                    )}
                    <p className="movie__data">
                        {film.duration && (
                            <span className="movie__data-duration">{film.duration}</span>
                        )}
                    </p>
                </div>
            </div>

            {film.cinema_halls && film.cinema_halls.map((hall: any) => {
                const sessionHallArr = film.session_in_halls
                    .filter(sessionElem => sessionElem.cinema_hall_id === hall.id)
                    .sort((a, b) => new Date(a.from).getTime() - new Date(b.from).getTime()) 
                    ?? null;

                return (
                    <div className="movie-seances__hall" key={uniqid()}>
                        <h3 className="movie-seances__hall-title">{hall.name}</h3>
                        {sessionHallArr && (
                            <ul className="movie-seances__list" key={uniqid()}>
                                {sessionHallArr.map(sessionElem => {
                                    const dateNow = new Date();
                                    const dateFrom = new Date(sessionElem.from.replace('Z', ''));

                                    if (dateNow > dateFrom) {
                                        return (
                                            <li className="movie-seances__time-block" key={uniqid()}>
                                                <span className="movie-seances__time" 
                                                    style={{ opacity: 0.5, cursor: 'none'}}>
                                                    {getTimeFromDate(sessionElem.from)}
                                                </span>
                                            </li>
                                        );
                                    }

                                    return (
                                        <li className="movie-seances__time-block" key={uniqid()}>
                                            <a className="movie-seances__time" 
                                            href={"/hall/" + hall.id + "/session/" + sessionElem.id}>
                                                {getTimeFromDate(sessionElem.from)}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}   
                    </div>
                );
            })} 
         </section>
    );
}

export default FilmItem;
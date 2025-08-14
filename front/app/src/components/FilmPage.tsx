import SessionDay from './SessionDay';
import { useAppSelector } from '../hooks/defaultHook.tsx';
import FilmItem from './FilmItem.tsx';

const FilmPage = () => {
    const { 
        filmsList,
        filmsLoading,
        filmsError
    } = useAppSelector((state) => state.films);

    return(
        <>
            <SessionDay/>
            <main>
                {filmsLoading && <div>Loading...</div>}
                {filmsError && <div>Error: {filmsError}</div>}
                {filmsList && filmsList.map((film: any) => (
                    <FilmItem key={film.id} {...film} />
                ))}
            </main>
        </>
    );    
}

export default FilmPage;
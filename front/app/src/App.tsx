import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './components/Header'
import Header from './components/Header';
import FilmPage from './components/FilmPage';
import CinemaHallPage from './components/CinemaHallPage'

function App() {
  //href={"/hall/" + hall.id + "/session/" + sessionElem.id}>
  return (
    <>
    <Router>
      <Header></Header>
      <Routes>
            <Route path="/" element={<FilmPage/>} />
            <Route path="/hall/:hall_id/session/:session_id" element={<CinemaHallPage/>} />
      </Routes>
    </Router> 
    </>
  )
}

export default App

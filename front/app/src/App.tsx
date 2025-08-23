import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './components/Header'
import Header from './components/Header';
import FilmPage from './components/FilmPage';
import CinemaHallPage from './components/CinemaHallPage'
import PaymentPage from './components/PaymentPage';
import TicketPage from './components/TicketPage';

function App() {
  return (
    <>
    <Router>
      <Header></Header>
      <Routes>
            <Route path="/" element={<FilmPage/>} />
            <Route path="/hall/:hall_id/session/:session_id" element={<CinemaHallPage/>} />
            <Route path="/payment/:payment_id" element={<PaymentPage/>} />
            <Route path="/ticket/:payment_id" element={<TicketPage/>} />
      </Routes>
    </Router> 
    </>
  )
}

export default App

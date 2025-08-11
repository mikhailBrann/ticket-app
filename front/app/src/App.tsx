import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './components/Header'
import Header from './components/Header';
import SessionDay from './components/SessionDay';

function App() {
  
  return (
    <>
    <Router>
      <Header></Header>
      <SessionDay></SessionDay>
      
    </Router> 
    </>
  )
}

export default App

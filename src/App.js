import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AboutPage from './pages/AboutPage';
import MenuPage from './pages/MenuPage';
import ReservationPage from './pages/ReservationPage';

function App() {
  return (
    <div className='main-area'>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/about' element={<AboutPage/>}/>
          <Route path='/menu' element={<MenuPage/>}/>
          <Route path='/reservations' element={<ReservationPage/>}/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;

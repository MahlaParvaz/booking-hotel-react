import { Toaster } from 'react-hot-toast';
import './App.css';
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import NearLocation from './components/NearLocation/NearLocation';
import HomePage from './components/HomePage/HomePage';
import Hotels from './components/Hotels/Hotels';
import Footer from './components/Footer/Footer';
import HotelsResult from './components/HotelsResult/HotelsResult';
import HotelLayout from './components/HotelLayout/HotelLayout';
import HotelResultProvider from './components/context/HotelResultProvider';
function App() {
  return (
    <div className="bg-white ">
      <HotelResultProvider>
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels-result" element={<HotelLayout />}>
            <Route index element={<HotelsResult />} />
            <Route path=":id" element={<div>single hotel</div>} />
          </Route>
        </Routes>
        <Footer />
      </HotelResultProvider>
    </div>
  );
}

export default App;

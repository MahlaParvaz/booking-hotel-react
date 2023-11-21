import { Toaster } from 'react-hot-toast';
import './App.css';
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import NearLocation from './components/NearLocation/NearLocation';
import HomePage from './components/HomePage/HomePage';
import Hotels from './components/Hotels/Hotels';
import Footer from './components/Footer/Footer';
function App() {
  return (
    <div className='bg-white'>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotels" element={<Hotels />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

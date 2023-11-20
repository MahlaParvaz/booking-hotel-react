import { Toaster } from 'react-hot-toast';
import './App.css';
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import NearLocation from './components/NearLocation/NearLocation';
import HomePage from './components/HomePage/HomePage';
function App() {
  return (
    <div >
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}/>
       
      </Routes>
    </div>
  );
}

export default App;

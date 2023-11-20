import { Toaster } from 'react-hot-toast';
import './App.css';
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import LocationsList from './components/LocationsList/LocationsList';

function App() {
  return (
    <div>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<LocationsList />} />
      </Routes>
    </div>
  );
}

export default App;

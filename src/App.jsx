import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import './App.css';

import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import Hotels from './components/Hotels/Hotels';
import Footer from './components/Footer/Footer';
import HotelsResult from './components/HotelsResult/HotelsResult';
import HotelLayout from './components/Layout/HotelLayout';
import HotelResultProvider from './components/context/HotelResultProvider';
import SingleHotelResult from './components/SingleHotelREsult/SingleHotelREsult';
import BookmarkLayout from './components/Layout/BookmarkLayout';
import BookmarkListProvider from './components/context/BookmarkListProvider';
import Bookmark from './components/Bookmark/Bookmark';
import SingleBookmark from './components/SingleBookmark/SingleBookmark';
import AddNewBookmark from './components/AddNewBookmark/AddNewBookmark';

function App() {
  return (
    <div className="bg-white ">
      <BookmarkListProvider>
        <HotelResultProvider>
          <Toaster />
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/hotels-result" element={<HotelLayout />}>
              <Route index element={<HotelsResult />} />
              <Route path=":id" element={<SingleHotelResult />} />
            </Route>
            <Route path="/bookmark" element={<BookmarkLayout />}>
              <Route index element={<Bookmark />} />
              <Route path=":id" element={<SingleBookmark />} />
              <Route path="add" element={<AddNewBookmark />} />
            </Route>
          </Routes>
          <Footer />
        </HotelResultProvider>
      </BookmarkListProvider>
    </div>
  );
}

export default App;

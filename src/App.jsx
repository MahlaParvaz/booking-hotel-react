import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import './App.css';

import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import Hotels from './components/Hotels/Hotels';
import HotelsResult from './components/HotelsResult/HotelsResult';
import HotelLayout from './components/Layout/HotelLayout';
import HotelResultProvider from './components/context/HotelResultProvider';
import SingleHotelResult from './components/SingleHotelREsult/SingleHotelREsult';
import BookmarkLayout from './components/Layout/BookmarkLayout';
import BookmarkListProvider from './components/context/BookmarkListProvider';
import Bookmark from './components/Bookmark/Bookmark';
import SingleBookmark from './components/SingleBookmark/SingleBookmark';
import AddNewBookmark from './components/AddNewBookmark/AddNewBookmark';
import AppLayout from './components/Layout/AppLayout';
import PopularLocationsDetail from './components/PopularDetails/PopularLocationsDetail';
import LoginForm from './components/Login/LoginForm';
import AuthContextProvider from './components/context/AuthProvider';
import ProtectedRouth from './components/ProtectedRouth/ProtectedRouth';
import SignupForm from './components/SignupForm/SignupForm';

function App() {
  return (
    <div className="bg-white ">
      <AppLayout>
        <AuthContextProvider>
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
                <Route path="/popular-locations">
                  <Route
                    path="iran"
                    element={
                      <PopularLocationsDetail
                        countryFilter="Iran"
                        title="Hotels in Iran"
                      />
                    }
                  />
                  <Route
                    path="london"
                    element={
                      <PopularLocationsDetail
                        countryFilter="London"
                        title="Hotels in London"
                      />
                    }
                  />
                  <Route
                    path="france"
                    element={
                      <PopularLocationsDetail
                        countryFilter="France"
                        title="Hotels in France"
                      />
                    }
                  />
                  <Route
                    path="netherland"
                    element={
                      <PopularLocationsDetail
                        countryFilter="Netherland"
                        title="Hotels in Netherland"
                      />
                    }
                  />
                  <Route
                    path="america"
                    element={
                      <PopularLocationsDetail
                        countryFilter="America"
                        title="Hotels in America"
                      />
                    }
                  />
                </Route>
                <Route
                  path="/bookmark"
                  element={
                    <ProtectedRouth>
                      <BookmarkLayout />
                    </ProtectedRouth>
                  }
                >
                  <Route index element={<Bookmark />} />
                  <Route path=":id" element={<SingleBookmark />} />
                  <Route path="add" element={<AddNewBookmark />} />
                </Route>
                {/* <Route path="/signup" element={<signupForm />} /> */}
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignupForm />} />
              </Routes>
            </HotelResultProvider>
          </BookmarkListProvider>
        </AuthContextProvider>
      </AppLayout>
    </div>
  );
}

export default App;

import { Toaster } from 'react-hot-toast';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import Hotels from './components/Hotels/Hotels';
import HotelsResult from './components/HotelsResult/HotelsResult';
import HotelResultProvider from './components/context/HotelResultProvider';
import SingleHotelResult from './components/SingleHotelResult/SingleHotelResult';
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
import Checkout from './components/Checkout/Checkout';
import { CheckoutProvider } from './components/context/CheckoutProvider';
import CheckoutLayout from './components/Layout/CheckoutLayout';
import Payment from './components/Payment/Payment';
import Reserves from './components/Reserves/Reserves';
import ReservesInfo from './components/ReservesInfo/ReservesInfo';
import ReserveProvider from './components/context/ReserveAuth';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = window.location.pathname;

    // Check if the current path is a login or signup route
    if (currentPath === '/login' || currentPath === '/signup') {
      // If it is, navigate without the header
      navigate(currentPath, { state: { hideHeader: true } });
    } else {
      // For other paths, navigate with the header
      navigate(currentPath, { state: { hideHeader: false } });
    }
  }, [navigate]);

  return (
    <div className="bg-white  scroll-smooth ">
      <AppLayout>
        <AuthContextProvider>
          <BookmarkListProvider>
            <HotelResultProvider>
              <CheckoutProvider>
                <ReserveProvider>
                  <Toaster />
                  <Header />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/hotels" element={<Hotels />} />

                    <Route path="/hotels-result">
                      <Route index element={<HotelsResult />} />
                      <Route path=":id" element={<SingleHotelResult />} />
                      <Route
                        path=":id/checkout"
                        element={
                          <ProtectedRouth>
                            <CheckoutLayout />
                          </ProtectedRouth>
                        }
                      >
                        <Route index element={<Checkout />} />
                        <Route path="payment" element={<Payment />} />
                      </Route>
                    </Route>
                    <Route path="/hotels-result/:id/checkout/payment/active-reserves">
                      <Route
                        index
                        element={
                          <ProtectedRouth>
                            <Reserves />
                          </ProtectedRouth>
                        }
                      />
                      <Route path="reserves-info" element={<ReservesInfo />} />
                    </Route>

                    <Route path="/active-reserves">
                      <Route
                        index
                        element={
                          <ProtectedRouth>
                            <Reserves />
                          </ProtectedRouth>
                        }
                      />
                      <Route path="reserves-info" element={<ReservesInfo />} />
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
                            countryFilter="Netherlands"
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
                    <Route path="/signup" element={<SignupForm />} />
                    <Route path="/login" element={<LoginForm />} />
                  </Routes>
                </ReserveProvider>
              </CheckoutProvider>
            </HotelResultProvider>
          </BookmarkListProvider>
        </AuthContextProvider>
      </AppLayout>
    </div>
  );
}

export default App;

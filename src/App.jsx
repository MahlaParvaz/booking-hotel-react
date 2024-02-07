import { Toaster } from 'react-hot-toast';
import { Route, Routes, useLocation } from 'react-router-dom';

import Header from './ui/Header';
import Hotels from './pages/Hotels';
import HotelsResult from './pages/HotelsResult';
import HotelResultProvider from './features/hotels/HotelResultProvider';
import SingleHotelResult from './features/hotels/SingleHotelResult';
import BookmarkLayout from './features/bookmaks/BookmarkLayout';
import BookmarkListProvider from './features/bookmaks/BookmarkListProvider';
import Bookmark from './pages/Bookmark';
import SingleBookmark from './features/bookmaks/SingleBookmark';
import AddNewBookmark from './features/bookmaks/AddNewBookmark';
import AppLayout from './Layout/AppLayout';
import PopularLocationsDetail from './pages/PopularLocationsDetail';
import LoginForm from './features/authentication/LoginForm';
import AuthContextProvider from './features/authentication/AuthProvider';
import ProtectedRoute from './ui/ProtectedRoute';
import SignupForm from './features/authentication/SignupForm';
import Checkout from './pages/Checkout';
import CheckoutLayout from './features/checkout/CheckoutLayout';
import Payment from './features/checkout/Payment';
import Reserves from './pages/Reserves';
import ReservesInfo from './features/reserve/ReservesInfo';
import ReserveProvider from './features/reserve/ReserveAuth';
import Home from './pages/Home';
import { SearchHotelsProvider } from './features/checkout/CheckoutProvider';

function App() {
  const location = useLocation();

  const currentPath = location.pathname;

  return (
    <div className="bg-white  scroll-smooth ">
      <AppLayout>
        <AuthContextProvider>
          <BookmarkListProvider>
            <HotelResultProvider>
              <SearchHotelsProvider>
                <ReserveProvider>
                  <Toaster />
                  {currentPath === '/login' ||
                  currentPath === '/signup' ? null : (
                    <Header />
                  )}

                  <Routes>
                    <Route path="*" element={<Home />} />
                    <Route path="/hotels" element={<Hotels />} />

                    <Route path="/hotels-result">
                      <Route index element={<HotelsResult />} />
                      <Route path=":id" element={<SingleHotelResult />} />
                      <Route
                        path=":id/checkout"
                        element={
                          <ProtectedRoute>
                            <CheckoutLayout />
                          </ProtectedRoute>
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
                          <ProtectedRoute>
                            <Reserves />
                          </ProtectedRoute>
                        }
                      />

                      <Route path="reserves-info" element={<ReservesInfo />} />
                    </Route>
                    <Route
                      path="/active-reserves"
                      element={
                        <ProtectedRoute>
                          <Reserves />
                        </ProtectedRoute>
                      }
                    />
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
                        <ProtectedRoute>
                          <BookmarkLayout />
                        </ProtectedRoute>
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
              </SearchHotelsProvider>
            </HotelResultProvider>
          </BookmarkListProvider>
        </AuthContextProvider>
      </AppLayout>
    </div>
  );
}

export default App;

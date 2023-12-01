import { useState } from 'react';

import { IoIosLogIn, IoIosLogOut } from 'react-icons/io';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import Popup from 'reactjs-popup';
import LoginForm from '../Login/LoginForm';

function NavBar() {
  return (
    <div className="navbar  text-white w-full   h-16 pt-4 flex items-center justify-center  shadow-lg  bg-black">
      <div className="flex laptop:w-[80%] top-0 h-full justify-between items-center mobile:w-full  ">
        <div className="navbarList  flex-1 h-full">
          <img
            src="/src/assets/img/airbnb.png"
            alt=""
            className="p-2 mobile:hidden  laptop:block"
          />
        </div>
        <div className="navbarList laptop:flex-1 mobile:w-[95%]  h-full">
          <ul className="flex laptop:gap-16 items-center justify-start p-2 laptop:text-[16px] mobile:text-[15px] mobile:gap-4 ">
            <Link to="/bookmark">
              <li className="cursor-pointer hover:border-b-4 hover:-border--red">
                Bookmarks
              </li>
            </Link>
            <Link to="/hotels">
              <li className="cursor-pointer hover:border-b-4 hover:-border--red">
                List of hotels
              </li>
            </Link>

            <li className="cursor-pointer hover:border-b-4 hover:-border--red">
              Exprience
            </li>
          </ul>
        </div>
        <div className="navbarList flex-1 relative  h-full ">
          <User />
        </div>
      </div>
    </div>
  );
}

export default NavBar;

function User() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    window.location.reload();
  };
  const handleLogin = () => {
    setShowLoginPopup(true);
  };

  const closeLoginPopup = () => {
    setShowLoginPopup(false);
  };
  return (
    <div>
      {isAuthenticated && user ? (
        <div className="navbarList flex-1 relative  h-full ">
          <NavLink
            onClick={handleLogout}
            className="logout flex items-center justify-center gap-2 p-2 absolute right-4 laptop:text-[16px] mobile:text-[15px] "
          >
            {user.username}
            <IoIosLogOut className="text-[24px] font-extrabold -text--rose-500" />
          </NavLink>
        </div>
      ) : (
        <div className="navbarList flex-1 relative  h-full ">
          <NavLink
            onClick={handleLogin}
            className="login flex items-center justify-center gap-2 p-2 absolute right-4 laptop:text-[16px] mobile:text-[15px] "
          >
            Login
            <IoIosLogIn className="text-[24px] font-extrabold -text--rose-500" />
          </NavLink>
          {showLoginPopup && (
            <div className="popup fixed top-0 left-0 w-full h-full -bg--light-gray z-[60] bg-opacity-5 backdrop-filter backdrop-blur-md flex justify-center items-center">
              <Popup
                open={showLoginPopup}
                onClose={closeLoginPopup}
                closeOnDocumentClick
                modal
                nested
              >
                <LoginForm />
              </Popup>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../features/authentication/AuthProvider';

import { IoIosLogIn, IoIosLogOut } from 'react-icons/io';
import MobileNavbar from './MobileNavbar';

function NavBar() {
  return (
    <div className=" text-white w-full h-16 p-2 flex items-center justify-center  shadow-lg  bg-black">
      <div className="navbar   ">
        <div className=" laptop:p-2 tablet:p-2 mobile:p-0 flex-1 h-full  ">
          <img
            src="/public/assets/img/airbnb.png"
            alt=""
            className=" mobile:hidden  laptop:block tablet:block "
          />
        </div>
        <div className=" pt-2 z-50 laptop:w-[50%] mobile:w-full tablet:w-[50%]  h-full">
          <MobileNavbar />
          <ul className="navbar-list ">
            <Link to="/bookmark">
              <li>Bookmarks</li>
            </Link>
            <Link to="/hotels">
              <li>Hotels</li>
            </Link>
            <Link to="/active-reserves">
              <li>Reserves</li>
            </Link>
            <Link to="/">
              <li>Home</li>
            </Link>
          </ul>
        </div>
        <div className="navbarList  flex-1 relative  h-full ">
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

  const handleLogout = () => {
    logout();
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="pt-2">
      {isAuthenticated && user ? (
        <div className=" flex-1 relative  h-full ">
          <Link onClick={handleLogout} className="logout  ">
            {user.username}
            <IoIosLogOut className="text-[24px] font-extrabold -text--rose-500" />
          </Link>
        </div>
      ) : (
        <div className="flex-1 relative  h-full ">
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 p-2 absolute right-4 laptop:text-[16px] mobile:text-[15px] "
          >
            Login
            <IoIosLogIn className="text-[24px] font-extrabold -text--rose-500" />
          </Link>
        </div>
      )}
    </div>
  );
}

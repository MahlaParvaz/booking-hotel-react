import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { useClickAway } from 'react-use';
import { useRef } from 'react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Squash as Hamburger } from 'hamburger-react';

import { BiHomeAlt2 } from 'react-icons/bi';
import { FiSearch, FiBookmark } from 'react-icons/fi';
import { RiFileList3Line } from 'react-icons/ri';
import { IoIosLogIn, IoIosLogOut } from 'react-icons/io';

const routes = [
  {
    title: 'Home',
    to: '/',
    Icon: BiHomeAlt2,
  },
  {
    title: 'Bookmarks',
    to: '/bookmark',
    Icon: FiBookmark,
  },
  {
    title: 'Hotels',
    to: '/hotels',
    Icon: FiSearch,
  },
  {
    title: 'Reserves',
    to: '/active-reserves"',
    Icon: RiFileList3Line,
  },
];
function NavBar() {
  return (
    <div className="navbar text-white w-full   h-16 pt-4 flex items-center justify-center  shadow-lg  bg-black">
      <div className="flex laptop:w-[80%] tablet:w-full tablet:px-4 top-0 h-full justify-between items-center mobile:w-full  ">
        <div className="navbarList  flex-1 h-full ">
          <img
            src="/src/assets/img/airbnb.png"
            alt=""
            className=" mobile:hidden  laptop:block tablet:block "
          />
        </div>
        <div className="navbarList z-50 laptop:w-[50%] mobile:w-full tablet:w-[50%]  h-full">
          <NavMobile />
          <ul className="flex laptop:flex tablet:flex mobile:hidden laptop:gap-16 items-center justify-start p-2 laptop:text-[16px] mobile:text-[14px]  mobile:gap-4 ">
            <Link to="/bookmark">
              <li className="cursor-pointer hover:border-b-4 hover:-border--red">
                Bookmarks
              </li>
            </Link>
            <Link to="/hotels">
              <li className="cursor-pointer hover:border-b-4 hover:-border--red">
                Hotels
              </li>
            </Link>
            <Link to="/active-reserves">
              <li className="cursor-pointer hover:border-b-4 hover:-border--red">
                Reserves
              </li>
            </Link>
            <Link to="/">
              <li className="cursor-pointer hover:border-b-4 hover:-border--red">Home</li>
            </Link>
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

  const handleLogout = () => {
    logout();
    navigate('/');
    window.location.reload();
  };

  return (
    <div>
      {isAuthenticated && user ? (
        <div className="navbarList flex-1 relative  h-full ">
          <NavLink
            onClick={handleLogout}
            className="logout flex items-center justify-center gap-1 p-2 absolute right-4 laptop:text-[16px] mobile:text-[15px] "
          >
            {user.username}
            <IoIosLogOut className="text-[24px] font-extrabold -text--rose-500" />
          </NavLink>
        </div>
      ) : (
        <div className="navbarList flex-1 relative  h-full ">
          <NavLink
            to="/login"
            className="login flex items-center justify-center gap-2 p-2 absolute right-4 laptop:text-[16px] mobile:text-[15px] "
          >
            Login
            <IoIosLogIn className="text-[24px] font-extrabold -text--rose-500" />
          </NavLink>
        </div>
      )}
    </div>
  );
}

const NavMobile = () => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => setOpen(false));

  return (
    <div ref={ref} className=" laptop:hidden tablet:hidden  ">
      <Hamburger toggled={isOpen} size={20} toggle={setOpen} />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="sticky  left-0 shadow-4xl right-0 top-[3.5rem] p-5 pt-0 bg-neutral-950 border-b border-b-white/20"
          >
            <ul className="grid gap-2 ">
              {routes.map((route, idx) => {
                const { Icon } = route;

                return (
                  <motion.li
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1 + idx / 10,
                    }}
                    key={route.title}
                    className="w-full  p-[0.08rem] rounded-xl bg-gradient-to-tr from-neutral-800 via-neutral-950 to-neutral-700"
                  >
                    <Link
                      onClick={() => setOpen((prev) => !prev)}
                      className={
                        'flex items-center justify-between w-full p-5 rounded-xl bg-neutral-950'
                      }
                      to={route.to}
                    >
                      <span className="flex gap-1 text-md">{route.title}</span>
                      <Icon className="text-lg" />
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

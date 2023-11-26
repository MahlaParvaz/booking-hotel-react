import { IoIosLogIn } from 'react-icons/io';
import { Link } from 'react-router-dom';
function NavBar() {
  return (
    <div className="navbar  text-white w-full  h-16 pt-4 flex items-center justify-center  shadow-lg  bg-black">
      <div className="flex w-[80%] top-0 h-full justify-between items-center">
        <div className="navbarList  flex-1 h-full">
          <img src="/src/assets/img/airbnb.png" alt="" className="p-2" />
        </div>
        <div className="navbarList flex-1  h-full">
          <ul className="flex gap-16 items-center justify-start p-2 text-[16px]  ">
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
          <button className="login flex items-center justify-center gap-2 p-2 absolute right-4 text-[16px] ">
            Login
            <IoIosLogIn className="text-[24px] font-extrabold -text--rose-500" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;

import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <div className="footer  text-white w-full laptop:h-[300px] mobile:h-full mobile:p-11 laptop:p-0 bg-black  flex tablet:flex-col laptop:flex-row mobile:flex-col justify-around laptop:items-center mobile:items-start">
      <div className="footerList ">
        <div className="footerItem  mb-10 flex flex-col justify-between items-start gap-6 ">
          <img
            src="/src/assets/img/airbnb.png"
            alt="logo doesn't show"
            className="footerLogo  "
          />
          <span>Contactn number :0458712 </span>
          <div className="footerSoacial flex justify-between gap-6 text-lg cursor-pointer">
            <span className="linkdin">
              <a href="https://linkedin.com/in/mahla-parvaz-64037822a">
                <FaLinkedinIn />
              </a>
            </span>
            <span className="github">
              <a href="https://github.com/MahlaParvaz">
                <FaGithub />
              </a>
            </span>
          </div>
        </div>
      </div>
      <div className="footerList mb-10  flex flex-col gap-4 justify-start items-start h-[50%]">
        <span>Locations</span>
        <ul className="footerItem">
          <li className="mb-2 cursor-pointer">
            <Link to="/Hotels">Hotels</Link>
          </li>
          <li className="mb-2 cursor-pointer">
            <Link to="/popular-locations/iran">Iran</Link>
          </li>
          <li className="mb-2 cursor-pointer">
            <Link to="/popular-locations/london">London</Link>
          </li>
          <li className="mb-2 cursor-pointer">
            <Link to="/popular-locations/france">France</Link>
          </li>
          <li className="mb-2 cursor-pointer">
            <Link to="/popular-locations/netherland">Netherland</Link>
          </li>
          <li className="mb-2 cursor-pointer">
            <Link to="/popular-locations/america">America</Link>
          </li>
        </ul>
      </div>
      <div className="footerList  mb-10 flex flex-col gap-4 justify-start items-start h-[50%]">
        <span>Company</span>
        <ul className="footerItem ">
          <li className="mb-2 cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="mb-2 cursor-pointer">
            <Link>About us</Link>
          </li>
        </ul>
      </div>

      <div className="footerList mb-10 flex flex-col gap-4 justify-start items-start h-[50%]">
        <span>Privacy</span>
        <ul className="footerItem ">
          <li className="mb-2 cursor-pointer">Terms of Serviece</li>
          <li className="mb-2 cursor-pointer">Privacy Policy</li>
        </ul>
      </div>
      <div className="footerList mb-10 flex flex-col gap-4 justify-start items-start h-[50%]">
        <span>Stay up to date</span>
        <span>Be the first to know about our newest apartments</span>

        <div className="footerItem flex flex-col gap-6 justify-between items-start">
          <input
            className="px-4 py-2 w-[300px] rounded-lg -bg--light-gray text-slate-600 placeholder:text-slate-500 text-md"
            type="email"
            placeholder="Email address"
          />
          <button className="subcribeBtn -bg--red px-4 py-2 flex shadow-lg hover:shadow-none justify-center rounded-full w-[150px]">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}

export default Footer;

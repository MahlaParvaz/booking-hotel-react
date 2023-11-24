import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
function Footer() {
  return (
    <div className="footer  text-white w-full bg-black h-[270px] flex justify-around items-center">
      <div className="footerList h-[50%] ">
        <div className="footerItem flex flex-col justify-between items-start gap-6">
          <img
            src="/src/assets/img/airbnb.png"
            alt="logo doesn't show"
            className="footerLogo  "
          />
          <span>Contactn number :0458712 </span>
          <div className="footerSoacial flex justify-between gap-6 text-lg cursor-pointer">
            <span className="linkdin">
              <FaLinkedinIn />
            </span>
            <span className="github">
              <FaGithub />
            </span>
          </div>
        </div>
      </div>
      <div className="footerList flex flex-col gap-4 justify-start items-start h-[50%]">
        <span>Company</span>
        <ul className="footerItem ">
          <li className="mb-2 cursor-pointer">Home</li>
          <li className="mb-2 cursor-pointer">About us</li>
          <li className="mb-2 cursor-pointer">Our team</li>
        </ul>
      </div>
      <div className="footerList  flex flex-col gap-4 justify-start items-start h-[50%]">
        <span>Guests</span>
        <ul className="footerItem">
          <li className="mb-2 cursor-pointer">Blog</li>
        </ul>
      </div>
      <div className="footerList flex flex-col gap-4 justify-start items-start h-[50%]">
        <span>Privacy</span>
        <ul className="footerItem ">
          <li className="mb-2 cursor-pointer">Terms of Serviece</li>
          <li className="mb-2 cursor-pointer">Privacy Policy</li>
        </ul>
      </div>
      <div className="footerList flex flex-col gap-4 justify-start items-start h-[50%]">
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

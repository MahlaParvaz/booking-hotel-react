import { useLocation } from 'react-router-dom';
import LaptopHeader from './LaptopHeader';
import MobileHeader from './MobileHeader';

function Header() {
  const location = useLocation();
  const hideHeader = location.state?.hideHeader;

  if (hideHeader) {
    return null;
  }
  return (
    <div className="w-full p-0 relative flex flex-col justify-start items-center gap-4 ">
      <MobileHeader />
      <LaptopHeader />
    </div>
  );
}

export default Header;

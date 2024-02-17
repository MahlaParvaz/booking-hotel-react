import { useRef, useState } from 'react';
import { BiHomeAlt2 } from 'react-icons/bi';
import { FiBookmark, FiSearch } from 'react-icons/fi';
import { RiFileList3Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useClickAway } from 'react-use';
import { AnimatePresence, motion } from 'framer-motion';
import { Squash as Hamburger } from 'hamburger-react';

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

const MobileNavbar = () => {
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
            className="sticky w-full  left-0 shadow-4xl right-0 top-[3.5rem] p-5 pt-0 bg-neutral-950 border-b border-b-white/20"
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
export default MobileNavbar;

import { useState } from 'react';
import { FaQuestion } from 'react-icons/fa6';
import { IoChevronDown } from 'react-icons/io5';
const data = [
  {
    id: 1,
    title: 'Can we find the geographical location on the map?',
    text: 'You can find a new location on the map, add it to your bookmarks, and easily view new locations on the map. Explore the positions of all the countries you are interested in.',
  },
  {
    id: 2,
    title: 'What price range is available for hotels, and for which countries?',
    text: ' Prices are available for all ranges, from the most affordable to the most luxurious and luxurious hotels for any country you have in mind, with any number of family members',
  },
  {
    id: 3,
    title: 'Is it possible to cancel the accommodation and receive a refund? ',
    text: ' If you cancel the accommodation up to two days before the reservation, the amount will be refunded with a ten percent deduction. If you cancel it up to 24 hours before the stay, 60 percent of the amount will be deducted, and the remainder will be refunded to you.',
  },
];
function Accordion() {
  const [open, setOpen] = useState(null);

  const handleOpen = (id) => {
    setOpen(id === open ? null : id);
  };

  return (
    <div className="accordion ">
      <h2 className="w-[85%] px-4  text-lg font-bold ">Your questions</h2>

      <div className="accordion__item ">
        {data.map((item) => (
          <AccordionItem
            key={item.id}
            id={item.id}
            title={item.title}
            onOpen={handleOpen}
            open={open}
          >
            {item.text}
          </AccordionItem>
        ))}
      </div>
    </div>
  );
}
export default Accordion;
function AccordionItem({ id, title, onOpen, open, children }) {
  const isOpen = id === open;

  return (
    <div
      className={`accordion-item   ${
        isOpen
          ? 'accordion__expanded p-2  max-h-[100vh] ease-in-out duration-200 '
          : ''
      }`}
    >
      <div className="item__header " onClick={() => onOpen(id)}>
        <FaQuestion className="text-[20px] -text--dark-green -bg--light-green w-[35px] h-[35px] rounded-full p-2" />
        <div className=" w-full pl-4">{title}</div>
        <IoChevronDown
          className={`item__chevron   ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </div>
      <div
        className={`item__content  ${
          isOpen ? 'max-h-[100vh] opacity-100' : ''
        }`}
      >
        {children}
      </div>
    </div>
  );
}

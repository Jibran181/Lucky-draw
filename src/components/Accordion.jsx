import React, { useState } from 'react';

function Accordion({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b-2 border-gray-200 py-4">
      <button
        onClick={toggleAccordion}
        className="w-full text-left flex justify-between items-center text-lg font-bold text-green-600"
      >
        {title}
        <span>{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && <p className="mt-2 text-gray-700">{content}</p>}
    </div>
  );
}

export default Accordion;

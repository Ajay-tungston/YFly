import React, { useRef, useState } from "react";

const HorizontalScroll = () => {
  const scrollRef = useRef(null);
  const [position, setPosition] = useState(0);

  const handleDrag = (event) => {
    if (scrollRef.current) {
      const scrollWidth = scrollRef.current.clientWidth;
      let newPosition = event.clientX - scrollRef.current.getBoundingClientRect().left;
      
      // Prevent the button from going out of bounds
      if (newPosition < 0) newPosition = 0;
      if (newPosition > scrollWidth - 40) newPosition = scrollWidth - 40; // 40 is button width
      
      setPosition(newPosition);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-96 h-6 bg-gray-200 rounded-full overflow-hidden" ref={scrollRef}>
        {/* Track */}
        <div className="absolute top-1/2 left-0 h-1 w-full bg-gray-400 transform -translate-y-1/2"></div>

        {/* Draggable Button */}
        <div
          className="absolute top-1/2 w-10 h-6 bg-blue-500 rounded-full border border-black cursor-pointer transform -translate-y-1/2"
          style={{ left: `${position}px` }}
          onMouseDown={(e) => {
            e.preventDefault();
            document.addEventListener("mousemove", handleDrag);
            document.addEventListener("mouseup", () => {
              document.removeEventListener("mousemove", handleDrag);
            });
          }}
        ></div>
      </div>
    </div>
  );
};

export default HorizontalScroll;

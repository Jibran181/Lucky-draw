import React, { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Modal from "react-modal";
import ReactDOM from "react-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">Too lale...</div>;
  }

  return (
    <div className="timer">
      <div className="text">Remaining</div>
      <div className="value">{remainingTime}</div>
      <div className="text">seconds</div>
    </div>
  );
};
export default function Timer() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);

  const deadline = "june, 1, 2024";

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();
    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMins(Math.floor((time / (1000 * 60)) % 60));
    setSecs(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);
    return () => clearInterval(interval);
  }, []);
  const settings = {
    arrows: false,
    infinite: true,
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    variableWidth: true,
    draggable: true,

    // variableHeight: true,
    responsive: [
      {
        breakpoint: 1540,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          // initialSlide: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const slider = React.useRef(null);
  const timers = [
    {
      heading: "          Lucky Draw No# 1234",
      duration: 3440,
    },
    {
      heading: "          Lucky Draw No# 1234",
      duration: 440,
    },
    {
      heading: "          Lucky Draw No# 1234",
      duration: 5440,
    },
    {
      heading: "          Lucky Draw No# 1234",
      duration: 2440,
    },
    {
      heading: "          Lucky Draw No# 1234",
      duration: 1040,
    },
    {
      heading: "          Lucky Draw No# 1234",
      duration: 3440,
    },
    {
      heading: "          Lucky Draw No# 1234",
      duration: 340,
    },
  ];
  return (
    <div className="flex gap-8 flex-wrap">
      <Slider ref={slider} {...settings}>
        {Array.isArray(timers) &&
          timers.map((timers) => (
            <div className="flex flex-col gap-9 justify-center content-center items-center !mx-4 w-[320px] h-[280px] ">
              <h1 className="md:text-2xl md:font-bold text-[24px] bg-clip-text text-center text-transparent bg-gradient-to-r to-[#233545] from-[#efb23a] font-bold my-4">
                {timers.heading}{" "}
              </h1>
              <div className="timer-wrapper flex justify-center">
                <CountdownCircleTimer
                  isPlaying
                  duration={timers.duration}
                  colors={["#efb23a", "#233545", "#efb23a", "#233545"]}
                  colorsTime={[10, 6, 3, 0]}
                  onComplete={() => ({ delay: 1 })}
                >
                  {renderTime}
                </CountdownCircleTimer>
              </div>
            </div>
          ))}
      </Slider>

      {/* <div className="animate-pulse flex justify-center my-[60px] text-[18px] md:text-4xl">
        <div className="px-[4px] md:px-[24px]  border-2 rounded-l-lg">{days}<br></br>Days</div>
        <div className="px-[4px] md:px-[24px]  border-2 ">{hours}<br></br>Hours</div>
        <div className="px-[4px] md:px-[24px]  border-2">{mins}<br></br>Minutes</div>
        <div className="px-[4px] md:px-[24px]  border-2 rounded-r-lg">{secs}<br></br>Seconds</div>
        </div> */}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Modal from "react-modal";
import ReactDOM from "react-dom";
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

  return (
    <div className="flex gap-8 flex-wrap">
      <div className="flex flex-col gap-9 justify-center items-center">
        <h1 className="md:text-2xl md:font-bold text-[24px] bg-clip-text text-transparent bg-gradient-to-r to-[#233545] from-[#efb23a] font-bold my-4">
          Lucky Draw No# 1234
        </h1>
        <div className="timer-wrapper">
          <CountdownCircleTimer
            isPlaying
            duration={3440}
            colors={["#efb23a", "#233545", "#efb23a", "#233545"]}
            colorsTime={[10, 6, 3, 0]}
            onComplete={() => ({ delay: 1 })}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>
      </div>
      <div className="flex flex-col gap-9 justify-center items-center">
        <h1 className="md:text-2xl md:font-bold text-[24px] bg-clip-text text-transparent bg-gradient-to-r to-[#233545] from-[#efb23a] font-bold my-4">
          Lucky Draw No# 2424
        </h1>
        <div className="timer-wrapper">
          <CountdownCircleTimer
            isPlaying
            duration={400}
            colors={["#efb23a", "#233545", "#efb23a", "#233545"]}
            colorsTime={[10, 6, 3, 0]}
            onComplete={() => ({ delay: 1 })}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>
      </div>{" "}
      <div className="flex flex-col gap-9 justify-center items-center">
        <h1 className="md:text-2xl md:font-bold text-[24px] bg-clip-text text-transparent bg-gradient-to-r to-[#233545] from-[#efb23a] font-bold my-4">
          Lucky Draw No# 2424
        </h1>
        <div className="timer-wrapper">
          <CountdownCircleTimer
            isPlaying
            duration={40000}
            colors={["#efb23a", "#233545", "#efb23a", "#233545"]}
            colorsTime={[10, 6, 3, 0]}
            onComplete={() => ({ delay: 1 })}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>
      </div>{" "}
      <div className="flex flex-col gap-9 justify-center items-center">
        <h1 className="md:text-2xl md:font-bold text-[24px] bg-clip-text text-transparent bg-gradient-to-r to-[#233545] from-[#efb23a] font-bold my-4">
          Lucky Draw No# 2424
        </h1>
        <div className="timer-wrapper">
          <CountdownCircleTimer
            isPlaying
            duration={40000}
            colors={["#efb23a", "#233545", "#efb23a", "#233545"]}
            colorsTime={[10, 6, 3, 0]}
            onComplete={() => ({ delay: 1 })}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>
      </div>
      {/* <div className="animate-pulse flex justify-center my-[60px] text-[18px] md:text-4xl">
        <div className="px-[4px] md:px-[24px]  border-2 rounded-l-lg">{days}<br></br>Days</div>
        <div className="px-[4px] md:px-[24px]  border-2 ">{hours}<br></br>Hours</div>
        <div className="px-[4px] md:px-[24px]  border-2">{mins}<br></br>Minutes</div>
        <div className="px-[4px] md:px-[24px]  border-2 rounded-r-lg">{secs}<br></br>Seconds</div>
        </div> */}
    </div>
  );
}

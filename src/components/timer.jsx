import React, { useEffect, useState } from "react";

export default function Timer() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);

const deadline = "june, 1, 2024";

const getTime = ()=>{
    const time = Date.parse(deadline)-Date.now();
    setDays(Math.floor(time/(1000*60*60*24)))
    setHours(Math.floor(time/(1000*60*60)%24))
    setMins(Math.floor(time/(1000*60)%60))
    setSecs(Math.floor(time/(1000)%60))
}

useEffect(()=>{
    const interval = setInterval(()=>getTime(),1000)
    return () => clearInterval(interval)
},[])

  return (
    <div>
        <h1 className="md:text-5xl md:font-bold text-[24px] bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 font-bold my-16">Lucky Draw Ends In : </h1>
        <div className="animate-pulse flex justify-center my-[60px] text-[18px] md:text-4xl">
        <div className="px-[4px] md:px-[24px]  border-2 rounded-l-lg">{days}<br></br>Days</div>
        <div className="px-[4px] md:px-[24px]  border-2 ">{hours}<br></br>Hours</div>
        <div className="px-[4px] md:px-[24px]  border-2">{mins}<br></br>Minutes</div>
        <div className="px-[4px] md:px-[24px]  border-2 rounded-r-lg">{secs}<br></br>Seconds</div>
        </div>
    </div>
  );
}

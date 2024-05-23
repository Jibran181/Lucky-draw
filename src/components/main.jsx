import React from "react";
import { useState } from "react";
import Timer from "./timer";
import BgImage from "../assets/112-r.png";
import crypto from "../assets/234.png";


export default function Main(){

        //  Counter is a state initialized to 0
        const [counter, setCounter] = useState(0);
 
        // Function is called everytime increment button is clicked
        const handleClick1 = () => {
            // Counter state is incremented
            setCounter(counter + 1);
        };
     
        // Function is called everytime decrement button is clicked
        const handleClick2 = () => {
            // Counter state is decremented
            setCounter(counter - 1);
        };
     

    return(
        <>
        <div className="grid md:grid-cols-2 p-2 md:p-6 my-4 text-white text-center">
        <div className="p-2 md:p-8 h-25 grid place-items-center">
            <img src={BgImage} className=" motion-safe:animate-pulse w-[250px] h-[300px] md:h-auto md:w-[300px]" />
        </div>
        <div className="px-2 md:p-10  bg-slate-900 border-sky-500 border-2 shadow-black shadow-xl rounded-xl"> 
                {/* <img src={Anim} className="items-center m-auto h-[100px] md:h-[180px] my-5" /> */}
                <img src={crypto} ></img>
                <p className=" animate-pulse text-[20px] md:text-2xl outline-double bg-gray-800 my-10">Ticket Price : 0.01 ETH </p>
                <p className=" text-shadow text-shadow-black text-shadow-x-3 shadow-black text-[14px] md:text-2xl font-semibold my-8">
                Participants will automatically receive a lucky draw ticket after completing the transaction. Each lucky draw ticket entitles them to one try at the Lucky Draw.
                    </p>
        </div>
        </div>

                        <div className="grid p-2 md:p-6 my-4 text-white text-center" >                
                            <div>
                                <Timer />
                        </div>

            <div className="my-7">
                <ul className="flex justify-center items-center text-2xl md:text-3xl">
                    <li className="mx-1 ">
                        <button type="button" className="bg-slate-500 px-3 rounded" onClick={handleClick2} >
                            -
                        </button>
                    </li>
                    <li className="mx-5">   
                        {counter}
                    </li>
                    <li>
                        <button type="button" className="bg-slate-500 px-3 rounded" onClick={handleClick1} >
                            +
                        </button>
                    </li>
                    <br></br>
                </ul>
                <br></br>
                <br></br>
                &nbsp;&nbsp;<button type="button" className=" text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-[18px] md:text-2xl px-5 py-2.5 text-center me-2 mb-2">
                    Buy Ticket Now</button>
            </div>
        </div>
        
        </>
    );
}
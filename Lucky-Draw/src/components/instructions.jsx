import React from "react";

export default function Details(){
    return(
        <div className="p-3">
            <h1 className="text-[15px] md:text-2xl text-white font-bold underline">These are Instructions for Lottery : </h1>
            <ul className="text-[12px] text-white p-4">
                <li> You Must participate before the Deadline. </li>
                <li> you must buy minimum 1 ticket to be eligible for the Prize. </li>
                <li> Others will be written Here </li>
                <li> More Instructions goes here</li>
            </ul>
        </div>
    );
}
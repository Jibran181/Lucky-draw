import React from "react";
import { useState, useEffect, useContext } from "react";
import Timer from "./timer";
import BgImage from "../assets/112-r.png";
import crypto from "../assets/234.png";
import Modal from "react-modal";
import { ethers } from "ethers";
import coins from "../assets/flying-gold-coins-vector-illustration.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { Web3Context } from "./web3context";
import abi from "./abi";
export default function Main() {
  const {
    isConnectedd,
    web3,
    connectedAddress,
    connectToMetaMask,
    signer,
    Network,
    isOpen,
    dopen,
    setdopen,
  } = useContext(Web3Context);
  //  Counter is a state initialized to 0
  const [counter, setCounter] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedLottery, setSelectedLottery] = useState({});
  const [BalanceOf, setBalanceOf] = useState();
  useEffect(() => {
    AOS.init({ duration: 3000 });
  }, []);
  const data = [
    {
      number: "12345",
      token: "ETH",
      winner: "",
      startTime: "01/01/2024 12:00 PM",
      endTime: "01/15/2024 12:00 PM",
      status: "Active",
      address: "0x123...abcd",
    },
    {
      number: "67890",
      token: "ETH",
      winner: "Jane Smith",
      startTime: "02/01/2024 01:00 PM",
      endTime: "02/15/2024 01:00 PM",
      status: "Non-Active",
      address: "0x456...efgh",
    },
    {
      number: "11223",
      token: "ETH",
      winner: "",
      startTime: "03/01/2024 02:00 PM",
      endTime: "03/15/2024 02:00 PM",
      status: "Active",
      address: "0x789...ijkl",
    },
    {
      number: "44556",
      token: "ETH",
      winner: "Bob Brown",
      startTime: "04/01/2024 03:00 PM",
      endTime: "04/15/2024 03:00 PM",
      status: "Non-Active",
      address: "0x101...mnop",
    },
    {
      number: "77889",
      token: "ETH",
      winner: "",
      startTime: "05/01/2024 04:00 PM",
      endTime: "05/15/2024 04:00 PM",
      status: "Active",
      address: "0x121...qrst",
    },
  ];

  const openModal = async (lottery) => {
    try {
      const ct = new ethers.Contract(address, abi, web3);
      const BalanceOfA = await ct.balanceOf(connectedAddress);
      setBalanceOf(BalanceOfA.toString());
      // setBalanceOf(await ct.balanceOf(bAddress));
      if (BalanceOf > 0) {
        setSelectedLottery(lottery);
        setModalIsOpen(true);
      }
    } catch (error) {
      alert(error.code);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

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

  return (
    <>
      <div className="bg-1">
        <div className="flex justify-around items-center content-center ">
          <div data-aos="fade-right" class="centered-div w-1/2 ">
            Dream Big, Win Big: Your Fortune Awaits!
          </div>
          <img data-aos="fade-left" className="w-1/2" src={coins} alt="" />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mt-12">
        <div
          data-aos="fade-up"
          class="centered-div w-1/2 !text-[#233545] !text-center"
        >
          Current Stats{" "}
        </div>
        <div data-aos="fade-up" className="p-4 md:px-10 md:py-5 col-span-8">
          <table className="w-full text-white bg-[#233545] bg-opacity-50 border-[#efb23a] border-2 shadow-[#233545] shadow-xl rounded-xl">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Lottery Number</th>
                <th className="px-4 py-2 border-b">Token</th>
                <th className="px-4 py-2 border-b">Winner</th>
                <th className="px-4 py-2 border-b">Start Time</th>
                <th className="px-4 py-2 border-b">End Time</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">Claim/Buy Ticket</th>
                <th className="px-4 py-2 border-b">Winner's Address</th>
              </tr>
            </thead>
            <tbody>
              {data.map((lottery, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border-t">{lottery.number}</td>
                  <td className="px-4 py-2 border-t">{lottery.token}</td>
                  <td className="px-4 py-2 border-t">
                    {lottery.status === "Non-Active" ? lottery.winner : "N/A"}
                  </td>
                  <td className="px-4 py-2 border-t">{lottery.startTime}</td>
                  <td className="px-4 py-2 border-t">{lottery.endTime}</td>
                  <td className="px-4 py-2 border-t">
                    <span
                      className={`text-${
                        lottery.status === "Active" ? "green" : "red"
                      }-500`}
                    >
                      &#x2022; {lottery.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-t">
                    <button
                      className="bg-[#efb23a] text-white px-3 py-1 rounded hover:bg-[#233545]"
                      onClick={() => openModal(lottery)}
                    >
                      Claim/Buy Ticket
                    </button>
                  </td>
                  <td className="px-4 py-2 border-t">{lottery.address}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Claim/Buy Ticket Confirmation"
            className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto mt-20"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          >
            <h2 className="text-xl font-bold mb-4">
              Claim/Buy Ticket Confirmation
            </h2>
            <p>
              Are you sure you want to Claim/Buy Ticket this lottery number?
            </p>
            <div className="mt-4">
              <p>
                <strong>Lottery Number:</strong> {selectedLottery.number}
              </p>
              <p>
                <strong>Token:</strong> {selectedLottery.token}
              </p>
              <p>
                <strong>Winner:</strong>{" "}
                {selectedLottery.status === "Non-Active"
                  ? selectedLottery.winner
                  : "N/A"}
              </p>
              <p>
                <strong>Start Time:</strong> {selectedLottery.startTime}
              </p>
              <p>
                <strong>End Time:</strong> {selectedLottery.endTime}
              </p>
              <p>
                <strong>Winner's Address:</strong> {selectedLottery.address}
              </p>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button className="bg-[#efb23a] text-white px-3 py-1 rounded hover:bg-[#233545]">
                Confirm
              </button>
            </div>
          </Modal>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-12 bg-[#233545]">
        <div
          data-aos="fade-up"
          class="centered-div w-1/2 !text-[#efb23a] !text-center mt-12"
        >
          Lottery Details{" "}
        </div>
        <div className="flex my-12 gap-4">
          <div
            data-aos="fade-up"
            class="max-w-sm p-6 bg-white hover:bg-[#efb23a] border border-gray-200 rounded-lg shadow "
          >
            <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-[#233545] ">
                Stopwatch{" "}
              </h5>
            </a>
            <p class="mb-3 font-normal text-[#233545] ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              iusto neque dignissimos tempore nesciunt architecto ab at
              temporibus praesentium vel impedit dolorum commodi,
            </p>
            <a
              href="#"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center hover:bg-white text-white bg-[#233545] rounded-lg hover:text-[#233545] "
            >
              Read more
              <svg
                class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
          <div
            data-aos="fade-up"
            class="max-w-sm p-6 bg-white hover:bg-[#efb23a] border border-gray-200 rounded-lg shadow "
          >
            <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-[#233545] ">
                Buy ticket{" "}
              </h5>
            </a>
            <p class="mb-3 font-normal text-[#233545] ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              iusto neque dignissimos tempore nesciunt architecto ab at
              temporibus praesentium vel impedit dolorum commodi,
            </p>
            <a
              href="#"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center hover:bg-white text-white bg-[#233545] rounded-lg hover:text-[#233545] "
            >
              Read more
              <svg
                class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
          <div
            data-aos="fade-up"
            class="max-w-sm p-6 bg-white hover:bg-[#efb23a] border border-gray-200 rounded-lg shadow "
          >
            <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-[#233545] ">
                Claim here{" "}
              </h5>
            </a>
            <p class="mb-3 font-normal text-[#233545] ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              iusto neque dignissimos tempore nesciunt architecto ab at
              temporibus praesentium vel impedit dolorum commodi,
            </p>
            <a
              href="#"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center hover:bg-white text-white bg-[#233545] rounded-lg hover:text-[#233545] "
            >
              Read more
              <svg
                class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-12">
        <div
          data-aos="fade-up"
          class="centered-div w-1/2 !text-[#233545] !text-center"
        >
          Clock is ticking!{" "}
        </div>
        <div data-aos="fade-up">
          {" "}
          <Timer />
        </div>
      </div>
      {/* <div className="grid grid-cols-12 p-2 md:p-6 my-4 text-white text-center "> */}
      {/* <div className="p-2 md:p-8 h-25 grid col-span-4 place-items-center">
          <img
            src={BgImage}
            className=" motion-safe:animate-pulse w-[250px] h-[300px] md:h-auto md:w-[300px]"
          />
        </div> */}
      {/* <div className="px-2 md:p-10  bg-slate-900 border-sky-500 border-2 shadow-black shadow-xl rounded-xl"> 
                <img src={crypto} ></img>
                <p className=" animate-pulse text-[20px] md:text-2xl outline-double bg-gray-800 my-10">Ticket Price : 0.01 ETH </p>
                <p className=" text-shadow text-shadow-black text-shadow-x-3 shadow-black text-[14px] md:text-2xl font-semibold my-8">
                Participants will automatically receive a lucky draw ticket after completing the transaction. Each lucky draw ticket entitles them to one try at the Lucky Draw.
                    </p>
                    </div> */}
      {/* </div> */}

      <div className="grid p-2 md:p-6 my-4 text-white text-center">
        {/* <div className="px-2 md:p-10  bg-slate-900 border-sky-500 border-2 shadow-black shadow-xl rounded-xl"> 
                <img src={crypto} ></img>
                <p className=" animate-pulse text-[20px] md:text-2xl outline-double bg-gray-800 my-10">Ticket Price : 0.01 ETH </p>
                <p className=" text-shadow text-shadow-black text-shadow-x-3 shadow-black text-[14px] md:text-2xl font-semibold my-8">
                Participants will automatically receive a lucky draw ticket after completing the transaction. Each lucky draw ticket entitles them to one try at the Lucky Draw.
                    </p>
        </div> */}
        {/* <div>
        </div> */}

        {/* <div className="my-7">
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
            </div> */}
      </div>
    </>
  );
}

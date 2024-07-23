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
import axios from "axios";
import Accordion from './Accordion';
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
  const [lotteries, setLotteries] = useState([]);
  const faqs = [
    {
      question: 'How do I know the game is fair?',
      answer: 'The game uses smart contracts to handle ticket purchases, draws, and payouts, ensuring that everything is automated and transparent.',
    },
    {
      question: 'Can I buy multiple tickets for one game?',
      answer: 'Yes, you can purchase multiple tickets to increase your chances of winning.',
    },
    {
      question: 'What happens if there are technical issues?',
      answer: 'In the unlikely event of technical issues, the game will pause, and no new tickets will be sold until the issue is resolved. Any ongoing games will continue once the system is back online.',
    },
    {
      question: 'Do I need ETH in my Metamask wallet to play?',
      answer: 'Yes, you need to have ETH in your Metamask wallet to purchase tickets and pay for transaction fees.',
    },
    {
      question: 'How are winners selected?',
      answer: 'Winners are selected randomly using a secure algorithm implemented in the smart contract.',
    },
  ];

  const address = "0xAA67bcf897081D4716260890f8Ca9EfFf3eC1584";
  useEffect(() => {
    fetchData();
    AOS.init({ duration: 3000 });
  }, []);
  const fetchData = async () => {
    axios
      .get("https://lucky-backend-rosy.vercel.app/lottery/")
      // .get(
      //   `https://token-generator-backend-eta.vercel.app/airdrop/GetAirdrop/123`
      // )

      .then((response) => {
        // Set the retrieved data to the state
        setLotteries(response?.data?.Lottery);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error, e.g., show an error message
      });
    console.log(lotteries, "lott");
  };

  const openModal = async (lottery) => {
    try {
      const ct = new ethers.Contract(address, abi, web3);
      const BalanceOfA = await ct.balanceOf(connectedAddress);
      console.log("cccccccccc", BalanceOfA.toString());
      setBalanceOf(BalanceOfA.toString());
      // setBalanceOf(await ct.balanceOf(bAddress));
      if (BalanceOfA > 0) {
        setSelectedLottery(lottery);
        setModalIsOpen(true);
      } else {
        alert("Insufficient UFT Tokens :  ", BalanceOfA);
      }
    } catch (error) {
      alert(error);
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
          <div data-aos="fade-right" class=" centered-div w-1/2 ">


            <div className="fontasf">
              Welcome to the Ethereum Coin Lottery Game!
            </div>
            <p className="text-white"> Are you ready to test your luck and win big? Our Ethereum Coin Lottery game is an exciting way to potentially earn significant ETH prizes by participating in our fun and straightforward lottery system. Here’s everything you need to know to get started:</p>
          </div>
          <div>
          </div>
          <img data-aos="fade-left" className="w-1/2" src={coins} alt="" />
        </div>
      </div>
      <div id="about" className="mt-10  p-14">
        <h2 className="text-2xl text-center font-bold text-green-600 border-b-2 border-green-600 pb-2">What is the Ethereum Coin Lottery Game?</h2>
        <p className="mt-4 text-center">The Ethereum Coin Lottery Game is a decentralized lottery game where users can participate by purchasing tickets using their Metamask wallet. Every 10 minutes, a new game starts, and one lucky ticket is randomly selected as the winner, receiving the entire prize pool accumulated from ticket sales.</p>
      </div>


      <div className="grid grid-cols-12">
        <div className="col-span-6 p-6">

          <div id="how-to-play" className="mt-10">
            <h2 className="text-2xl font-bold text-green-600 border-b-2 border-green-600 pb-2">How to Play</h2>
            <ol className="list-decimal list-inside mt-4 space-y-4">
              <li>
                <h3 className="font-bold">Connect Your Wallet:</h3>
                <p>Ensure you have a Metamask wallet installed and set up. Click on the "Connect Wallet" button on the website to link your Metamask wallet to the game.</p>
              </li>
              <li>
                <h3 className="font-bold">Buy a Ticket:</h3>
                <p>Once your wallet is connected, click the "Buy Ticket" button. Confirm the transaction in your Metamask wallet. The ticket price will be deducted from your ETH balance. After the transaction is confirmed, you will receive a unique ticket number.</p>
              </li>
              <li>
                <h3 className="font-bold">Wait for the Draw:</h3>
                <p>Games run every 10 minutes. You can see the countdown timer for the next draw on the website. During this period, more players can join, and the prize pool will grow with each ticket purchased.</p>
              </li>
              <li>
                <h3 className="font-bold">Check the Results:</h3>
                <p>When the timer hits zero, the draw starts, and a winning ticket is randomly selected. If your ticket number matches the winning ticket, you win the entire prize pool! The prize money will be automatically transferred to your Metamask wallet.</p>
              </li>
              <li>
                <h3 className="font-bold">Join the Next Game:</h3>
                <p>Whether you win or not, you can join the next game by purchasing another ticket. Remember, new games start every 10 minutes, giving you plenty of chances to win!</p>
              </li>
            </ol>
          </div>
        </div>
        <div className="col-span-6"> <div className="flex flex-col justify-center items-center mt-12">
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
                  {/* <th className="px-4 py-2 border-b">Token</th> */}
                  <th className="px-4 py-2 border-b">Winner</th>
                  <th className="px-4 py-2 border-b">Start Time</th>
                  <th className="px-4 py-2 border-b">End Time</th>
                  {/* <th className="px-4 py-2 border-b">Status</th> */}
                  <th className="px-4 py-2 border-b">Claim/Buy Ticket</th>
                  {/* <th className="px-4 py-2 border-b">Winner's Address</th> */}
                </tr>
              </thead>
              <tbody>
                {lotteries?.map((lottery, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border-t">
                      {lottery.LotteryNumber}
                    </td>
                    {/* <td className="px-4 py-2 border-t">{lottery.token}</td> */}
                    <td className="px-4 py-2 border-t">
                      {lottery.status === "Non-Active" ? lottery.Winner : "N/A"}
                    </td>
                    <td className="px-4 py-2 border-t">{lottery.start}</td>
                    <td className="px-4 py-2 border-t">{lottery.end}</td>
                    {/* <td className="px-4 py-2 border-t">
                    <span
                      className={`text-${
                        lottery.status === "Active" ? "green" : "red"
                      }-500`}
                    >
                      &#x2022; {lottery.status}
                    </span>
                  </td> */}
                    <td className="px-4 py-2 border-t">
                      <button
                        className="bg-[#efb23a] text-white px-3 py-1 rounded hover:bg-[#233545]"
                        onClick={() => openModal(lottery)}
                      >
                        Claim/Buy Ticket
                      </button>
                    </td>
                    {/* <td className="px-4 py-2 border-t">{lottery.address}</td> */}
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
        </div></div>
      </div>
      <section id="key-features" className="mt-10 p-8">
        <h2 className="text-2xl font-bold text-center text-green-600 border-b-2 border-green-600 pb-2">Key Features</h2>
        <div className="flex flex-wrap justify-center mt-4">
          <div className="bg-white shadow-md rounded-lg p-6 m-4">
            <p className="text-gray-700">Instant Payouts: Winners receive their prizes instantly after the draw ends.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 m-4">
            <p className="text-gray-700">Decentralized and Transparent: All transactions and draws are recorded on the Ethereum blockchain, ensuring transparency and fairness.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 m-4">
            <p className="text-gray-700">Regular Games: New games start every 10 minutes, providing frequent opportunities to win..</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 m-4">
            <p className="text-gray-700">Secure:All interactions are secured via your Metamask wallet, keeping your funds safe..</p>
          </div>
        </div>
      </section>


      <div className="flex flex-col justify-center items-center mt-12 bg-[#233545]">
        <div
          data-aos="fade-up"
          class="centered-div w-1/2 !text-[#efb23a] !text-center mt-12 text-[30px]"
        >
          Blogs{" "}
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
      <section id="faqs" className="mt-10">
      <h2 className="text-2xl font-bold text-center text-green-600 border-b-2 border-green-600 pb-2">FAQs</h2>
      <div className="mt-4 px-10">
        {faqs.map((faq, index) => (
          <Accordion key={index} title={faq.question} content={faq.answer} />
        ))}
      </div>
    </section>
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

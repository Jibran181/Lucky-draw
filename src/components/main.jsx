import { useState, useEffect, useContext } from "react";
import Timer from "./timer";
import Modal from "react-modal";
import { ethers } from "ethers";
import coins from "../assets/flying-gold-coins-vector-illustration.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { Web3Context } from "./web3context";
import abi from "./abi";
import axios from "axios";
import Accordion from "./Accordion";
import { toast } from "react-toastify";
import Env from "../../helper/Helper";
import { formatDate } from "../utils/dateFormat";
import Loading from "./loading";
export default function Main() {
  const { web3, connectedAddress, signer } = useContext(Web3Context);
  //  Counter is a state initialized to 0
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedLottery, setSelectedLottery] = useState({});
  const [balanceOf, setBalanceOf] = useState();
  const [lotteries, setLotteries] = useState([]);
  const [loading, setLoading] = useState(false);
  const faqs = [
    {
      question: "How do I know the game is fair?",
      answer:
        "The game uses smart contracts to handle ticket purchases, draws, and payouts, ensuring that everything is automated and transparent.",
    },
    {
      question: "Can I buy multiple tickets for one game?",
      answer:
        "Yes, you can purchase multiple tickets to increase your chances of winning.",
    },
    {
      question: "What happens if there are technical issues?",
      answer:
        "In the unlikely event of technical issues, the game will pause, and no new tickets will be sold until the issue is resolved. Any ongoing games will continue once the system is back online.",
    },
    {
      question: "Do I need ETH in my Metamask wallet to play?",
      answer:
        "Yes, you need to have ETH in your Metamask wallet to purchase tickets and pay for transaction fees.",
    },
    {
      question: "How are winners selected?",
      answer:
        "Winners are selected randomly using a secure algorithm implemented in the smart contract.",
    },
  ];

  const address = "0xAA67bcf897081D4716260890f8Ca9EfFf3eC1584";
  useEffect(() => {
    fetchData();
    AOS.init({ duration: 3000 });
  }, []);
  const fetchData = async () => {
    axios
      .get(`${Env.BASE_URL}/lottery/`)
      // .get(
      //   `https://token-generator-backend-eta.vercel.app/airdrop/GetAirdrop/123`
      // )

      .then((response) => {
        // Set the retrieved data to the state
        setLotteries(response?.data?.Lottery);
        console.log(response, "response");
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error, e.g., show an error message
      });
  };

  const addUser = async () => {
    try {
      const response = await axios.post(
        `${Env.BASE_URL}/buyer/purchaseTicket`,
        {
          Address: connectedAddress,
          lotteryNumber: selectedLottery.number,
        }
      );
      console.log("Buyer added & Ticket Purchased:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error entering buyer info:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleConfirmation = async () => {
    setLoading(true); // Start loading
    try {
      // Fixed address to which tokens will be transferred
      const OwnerAddress = "0xd21d7783c26EFA1C629D0f302Ec054b3182DD9Bc";

      // Log selected lottery details for debugging
      console.log(selectedLottery, "ctt");

      // Convert prize to the appropriate format
      const transferAmount = ethers.utils.parseUnits(
        selectedLottery.TicketPrice.toString(),
        18
      );

      // Initialize the contract
      const ct = new ethers.Contract(address, abi, signer);

      // Execute the transfer function
      const tx = await ct.transfer(OwnerAddress, transferAmount);

      // Wait for the transaction to be confirmed
      await tx.wait();
      // Call the addUser function after successful transfer
      const result = await addUser();

      if (result) {
        toast.success("Ticket purchased succesfully ");
      }
    } catch (error) {
      console.error(
        "Error during transfer or adding buyer:",
        error.response ? error.response.data : error.message
      );
      toast.error(
        "Error during transfer or adding buyer:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false); // Stop loading
      setModalIsOpen(false);
    }
  };
  const openModal = async (lottery) => {
    try {
      const ct = new ethers.Contract(address, abi, web3);
      const BalanceOfA = await ct.balanceOf(connectedAddress);
      console.log("cccccccccc", balanceOf);
      setBalanceOf(BalanceOfA.toString());
      // setBalanceOf(await ct.balanceOf(bAddress));
      if (BalanceOfA > 0) {
        setSelectedLottery(lottery);
        setModalIsOpen(true);
      } else {
        // alert("Insufficient UFT Tokens :  ", BalanceOfA);
        toast.warning("Insufficient UFT Tokens :  ", BalanceOfA);
      }
    } catch (error) {
      toast.error("something wrong or check wallet", error);
      console.log(error);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <div className="bg-1">
        <div className="flex justify-around items-center content-center ">
          <div
            data-aos="fade-right"
            className=" centered-div md:w-1/2 mx-auto "
          >
            <div className="fontasf md:!text-left !text-center">
              Welcome to the Ethereum Coin Lottery Game!
            </div>
            <p className="text-white md:text-left text-center">
              {" "}
              Are you ready to test your luck and win big? Our Ethereum Coin
              Lottery game is an exciting way to potentially earn significant
              ETH prizes by participating in our fun and straightforward lottery
              system. Here’s everything you need to know to get started:
            </p>
          </div>
          <div></div>
          <img
            data-aos="fade-left"
            className="w-1/2 md:block hidden"
            src={coins}
            alt=""
          />
        </div>
      </div>
      <div id="about" className="mt-10  p-14">
        <h2
          data-aos="fade-up"
          className="text-2xl !text-center font-bold !text-[#233545] pb-2 fontasf leading-[50px] "
        >
          What is the Ethereum Coin Lottery Game?
        </h2>
        <p data-aos="fade-up" className="mt-4 text-center text-[20px]">
          The Ethereum Coin Lottery Game is a decentralized lottery game where
          users can participate by purchasing tickets using their Metamask
          wallet. Every 10 minutes, a new game starts, and one lucky ticket is
          randomly selected as the winner, receiving the entire prize pool
          accumulated from ticket sales.
        </p>
      </div>
      <div id="how-to-play" className="mt-10 bg-[#233545] ">
        <div className=" w-full px-10  p-5  flex items-center flex-col ">
          <h2
            data-aos="fade-up"
            className="text-2xl !text-center font-bold !text-white pb-2 fontasf mt-20 leading-[50px] "
          >
            How to Play
          </h2>
          <div className="flex items-center w-full my-2 mt-16">
            <div className="leading-none text-white mr-6 text-base font-bold md:w-1/6 ">
              Connect Your Wallet
            </div>
            <ol className="relative border-s border-gray-200 ">
              <li className="ms-4 flex items-center">
                <div className="absolute w-6 h-6 bg-[#efb23a]  rounded-full mt-1.5 -start-3 border border-white"></div>
                <div className="ml-4 border border-white p-3 rounded-lg max-w-md md:max-w-5xl">
                  <h3 className="text-lg font-semibold text-white">
                    Ensure you have a Metamask wallet installed and set up.
                    Click on the " Connect Wallet " button on the website to
                    link your Metamask wallet to the game.
                  </h3>
                </div>
              </li>
            </ol>
          </div>
          <div className="flex items-center w-full my-2 ">
            <div className="leading-none text-white mr-6 text-base font-bold md:w-1/6 ">
              Buy a Ticket
            </div>
            <ol className="relative border-s border-gray-200 ">
              <li className="ms-4 flex items-center">
                <div className="absolute w-6 h-6 bg-[#efb23a]  rounded-full mt-1.5 -start-3 border border-white"></div>
                <div className="ml-4 border border-white p-3 rounded-lg max-w-md md:max-w-5xl">
                  <h3 className="text-lg font-semibold text-white">
                    Once your wallet is connected, click the "Buy Ticket"
                    button. Confirm the transaction in your Metamask wallet. The
                    ticket price will be deducted from your ETH balance. After
                    the transaction is confirmed, you will receive a unique
                    ticket number.
                  </h3>
                </div>
              </li>
            </ol>
          </div>{" "}
          <div className="flex items-center w-full my-2 ">
            <div className="leading-none text-white mr-6 text-base font-bold md:w-1/6 ">
              Wait for the Draw{" "}
            </div>
            <ol className="relative border-s border-gray-200 ">
              <li className="ms-4 flex items-center">
                <div className="absolute w-6 h-6 bg-[#efb23a]  rounded-full mt-1.5 -start-3 border border-white"></div>
                <div className="ml-4 border border-white p-3 rounded-lg max-w-md md:max-w-5xl">
                  <h3 className="text-lg font-semibold text-white">
                    Games run every 10 minutes. You can see the countdown timer
                    for the next draw on the website. During this period, more
                    players can join, and the prize pool will grow with each
                    ticket purchased.
                  </h3>
                </div>
              </li>
            </ol>
          </div>{" "}
          <div className="flex items-center w-full my-2 ">
            <div className="leading-none text-white mr-6 text-base font-bold md:w-1/6 ">
              Check the Results{" "}
            </div>
            <ol className="relative border-s border-gray-200 ">
              <li className="ms-4 flex items-center">
                <div className="absolute w-6 h-6 bg-[#efb23a]  rounded-full mt-1.5 -start-3 border border-white"></div>
                <div className="ml-4 border border-white p-3 rounded-lg max-w-md md:max-w-5xl">
                  <h3 className="text-lg font-semibold text-white">
                    When the timer hits zero, the draw starts, and a winning
                    ticket is randomly selected. If your ticket number matches
                    the winning ticket, you win the entire prize pool! The prize
                    money will be automatically transferred to your Metamask
                    wallet.
                  </h3>
                </div>
              </li>
            </ol>
          </div>{" "}
          <div className="flex items-center w-full my-2 mb-16">
            <div className="leading-none text-white mr-6 text-base font-bold md:w-1/6 ">
              Join the Next Game
            </div>
            <ol className="relative border-s border-gray-200 ">
              <li className="ms-4 flex items-center">
                <div className="absolute w-6 h-6 bg-[#efb23a]  rounded-full mt-1.5 -start-3 border border-white"></div>
                <div className="ml-4 border border-white p-3 rounded-lg max-w-md md:max-w-5xl">
                  <h3 className="text-lg font-semibold text-white">
                    Whether you win or not, you can join the next game by
                    purchasing another ticket. Remember, new games start every
                    10 minutes, giving you plenty of chances to win!
                  </h3>
                </div>
              </li>
            </ol>
          </div>{" "}
        </div>
      </div>{" "}
      <div className="flex flex-col justify-center items-center mt-12">
        <div
          data-aos="fade-up"
          className="text-2xl !text-center font-bold !text-[#233545] pb-2 fontasf mt-20 leading-[50px]"
        >
          Current Stats{" "}
        </div>
        <div data-aos="fade-up" className="p-4 md:px-10 md:py-5 w-[100%] ">
          <div className="overflow-x-auto  ">
            <table className="max-w-full text-white bg-[#233545] bg-opacity-50 border-[#efb23a] border-2 shadow-[#233545] shadow-xl rounded-xl">
              <thead>
                <tr>
                  <th className="px-2 py-2 border-b">Lottery Number</th>
                  <th className="px-2 py-2 border-b">Winning Prize</th>
                  <th className="px-2 py-2 border-b">Ticket Prize</th>
                  <th className="px-2 py-2 border-b">Winner</th>
                  <th className="px-2 py-2 border-b">Start Time</th>
                  <th className="px-2 py-2 border-b">End Time</th>
                  <th className="px-2 py-2 border-b">Buy Ticket</th>
                </tr>
              </thead>
              <tbody>
                {lotteries?.map((lottery, index) => (
                  <tr key={index}>
                    <td className="px-2 py-2 border-t">
                      {lottery.LotteryNumber}
                    </td>
                    <td className="px-2 py-2 border-t">
                      {lottery.Prize ? lottery.Prize : "N/A"}
                    </td>
                    <td className="px-2 py-2 border-t">
                      {lottery.TicketPrice ? lottery.TicketPrice : "N/A"}
                    </td>
                    <td className="px-2 py-2 border-t ">
                      {lottery.Winner ? lottery.Winner : "N/A"}
                    </td>
                    <td className="px-2 py-2 border-t ">
                      {formatDate(lottery?.start)}
                    </td>
                    <td className="px-2 py-2 border-t">
                      {formatDate(lottery?.end)}
                    </td>

                    <td className="px-2 py-2 border-t">
                      {lottery.Winner ? (
                        <button className="bg-[green] text-white px-3 py-1 rounded hover:bg-[#233545]">
                          Completed
                        </button>
                      ) : (
                        <button
                          className="bg-[#efb23a] text-white px-3 py-1 rounded hover:bg-[#233545]"
                          onClick={() => openModal(lottery)}
                        >
                          Buy Ticket
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Claim/Buy Ticket Confirmation"
            className="bg-white p-8 rounded-lg shadow-lg md:w-1/6 mx-auto mt-20"
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
                {console.log(selectedLottery, "selectedlottery")}
                <strong>Lottery Number:</strong>{" "}
                {selectedLottery?.LotteryNumber}
              </p>
              <p>
                <strong>Winning Prize:</strong>{" "}
                {selectedLottery?.Prize ? selectedLottery?.Prize : "N/A"}
              </p>
              <p>
                <strong>Ticket Prize:</strong>{" "}
                {selectedLottery?.TicketPrice
                  ? selectedLottery?.TicketPrice
                  : "N/A"}
              </p>
              {/* <p>
                <strong>Winner:</strong>{" "}
                {console.log(selectedLottery, "selectedLottery")}
                {selectedLottery.status === "Non-Active"
                  ? selectedLottery.winner
                  : "N/A"}
              </p> */}
              <p>
                <strong>Start Time:</strong>
                {formatDate(selectedLottery?.start)}
              </p>
              <p>{formatDate(selectedLottery?.end)}</p>
              <p>
                <strong className="truncate">Winner's Address:</strong>{" "}
                {selectedLottery?.Winner ? selectedLottery?.Winner : "N/A"}
              </p>
            </div>
            {loading ? (
              <Loading /> // Assuming you have a Loading component
            ) : (
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  className="bg-gray-300 text-black px-4 py-2 rounded"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  className="bg-[#efb23a] text-white px-3 py-1 rounded hover:bg-[#233545]"
                  onClick={handleConfirmation}
                >
                  Confirm
                </button>
              </div>
            )}
          </Modal>
        </div>
      </div>
      <section id="key-features" className="mt-10 p-8 bg-[#233545]">
        <h2
          data-aos="fade-up"
          className="text-2xl !text-white !text-center font-bold  pb-2 fontasf mt-20 leading-[50px]"
        >
          Key Features
        </h2>
        <div data-aos="fade-up" className="flex flex-wrap justify-center mt-4">
          <div className="bg-white shadow-md shadow-[#efb23a] hover:shadow-xl hover:shadow-[#efb23a] rounded-lg p-6 m-4 border border-[#efb23a] ">
            <p className="text-gray-700">
              Instant Payouts: Winners receive their prizes instantly after the
              draw ends.
            </p>
          </div>
          <div className="bg-white shadow-md shadow-[#efb23a] hover:shadow-xl hover:shadow-[#efb23a] rounded-lg p-6 m-4 border border-[#efb23a]  ">
            <p className="text-gray-700">
              Decentralized and Transparent: All transactions and draws are
              recorded on the Ethereum blockchain, ensuring transparency and
              fairness.
            </p>
          </div>
          <div className="bg-white shadow-md shadow-[#efb23a] hover:shadow-xl hover:shadow-[#efb23a] rounded-lg p-6 m-4 border border-[#efb23a]">
            <p className="text-gray-700">
              Regular Games: New games start every 10 minutes, providing
              frequent opportunities to win..
            </p>
          </div>
          <div className="bg-white shadow-md shadow-[#efb23a] hover:shadow-xl hover:shadow-[#efb23a] rounded-lg p-6 m-4 border border-[#efb23a]">
            <p className="text-gray-700">
              Secure:All interactions are secured via your Metamask wallet,
              keeping your funds safe..
            </p>
          </div>
        </div>
      </section>
      <div
        className=" flex-col justify-center items-center mt-12"
        data-aos="fade-up"
      >
        <div className="text-2xl !text-[#233545] !text-center font-bold  pb-2 fontasf my-20 leading-[50px]">
          Clock is ticking!{" "}
        </div>
        <div data-aos="fade-up">
          {" "}
          <Timer />
        </div>
      </div>{" "}
      <section className="flex flex-col justify-center items-center mt-12 bg-[#233545]">
        <div className="text-2xl !text-[#efb23a]! font-bold !text-white pb-2 fontasf mt-20 leading-[50px]">
          Blogs{" "}
        </div>
        <div className="flex my-12 gap-4 md:flex-nowrap flex-wrap justify-center">
          <div className="max-w-sm p-6 bg-white hover:bg-[#efb23a] border border-gray-200 rounded-lg shadow ">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#233545] ">
                Stopwatch{" "}
              </h5>
            </a>
            <p className="mb-3 font-normal text-[#233545] ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              iusto neque dignissimos tempore nesciunt architecto ab at
              temporibus praesentium vel impedit dolorum commodi,
            </p>
            <a
              href="#"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center hover:bg-white text-white bg-[#233545] rounded-lg hover:text-[#233545] "
            >
              Read more
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
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
          <div className="max-w-sm p-6 bg-white hover:bg-[#efb23a] border border-gray-200 rounded-lg shadow ">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#233545] ">
                Buy ticket{" "}
              </h5>
            </a>
            <p className="mb-3 font-normal text-[#233545] ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              iusto neque dignissimos tempore nesciunt architecto ab at
              temporibus praesentium vel impedit dolorum commodi,
            </p>
            <a
              href="#"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center hover:bg-white text-white bg-[#233545] rounded-lg hover:text-[#233545] "
            >
              Read more
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                {/* prettier-ignore */}
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
          <div className="max-w-sm p-6 bg-white hover:bg-[#efb23a] border border-gray-200 rounded-lg shadow ">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#233545] ">
                Claim here{" "}
              </h5>
            </a>
            <p className="mb-3 font-normal text-[#233545] ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              iusto neque dignissimos tempore nesciunt architecto ab at
              temporibus praesentium vel impedit dolorum commodi,
            </p>
            <a
              href="#"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center hover:bg-white text-white bg-[#233545] rounded-lg hover:text-[#233545] "
            >
              Read more
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
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
      </section>
      <section id="faqs" className="mt-10">
        <h2 className="text-2xl !text-[#233545] !text-center font-bold  pb-2 fontasf mt-20">
          FAQs
        </h2>
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

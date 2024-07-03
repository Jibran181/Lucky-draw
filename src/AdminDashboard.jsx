import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import CreateLotteryPage from "./CreateLotteryPage";
import axios from "axios";

Modal.setAppElement("#root");

export default function AdminDashboard() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedLottery, setSelectedLottery] = useState(null);
  const [selectedWinner, setSelectedWinner] = useState(null);
  const [lotteries, setLotteries] = useState([]);

  useEffect(() => {
    fetchData();
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

  const openModal = (lottery) => {
    setSelectedLottery(lottery);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedLottery({ ...selectedLottery, [name]: value });
  };

  const handleSelectWinner = (address) => {
    setSelectedWinner(address);
  };

  const handleSubmitWinner = async () => {
    try {
      await axios.post("https://your-api-url.com/selectWinner", {
        lotteryNumber: selectedLottery.number,
        winner: selectedWinner,
      });
      // Update the lotteries data after selecting the winner
      fetchData();
      setModalIsOpen(false);
    } catch (error) {
      console.error("Error selecting winner:", error);
    }
  };
  const navigate = useNavigate();

  const handlecreateLotteryPage = () => {
    navigate("/admin/createLotteryPage");
  };
  return (
    <div className="admin-dashboard-container mt-28 px-4">
      <h2 className="text-2xl font-bold text-white text-center py-8 cursor-pointer w-full  bg-[#233545] bg-opacity-50 border-[#efb23a] border-2 shadow-[#233545] shadow-xl rounded-xl">
        Admin Dashboard
      </h2>
      <CreateLotteryPage />
      <div className=" ">
        <table className="w-full text-white bg-[#233545] bg-opacity-50 border-[#efb23a] border-2 shadow-[#233545] shadow-xl rounded-xl mb-28 text-left">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Lottery Number</th>
              {/* <th className="px-4 py-2 border-b">Token</th> */}
              <th className="px-4 py-2 border-b">Winner</th>
              <th className="px-4 py-2 border-b">Start Time</th>
              <th className="px-4 py-2 border-b">End Time</th>
              {/* <th className="px-4 py-2 border-b">Status</th> */}
              <th className="px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {lotteries?.map((lottery, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border-t">{lottery?.LotteryNumber}</td>
                {/* <td className="px-4 py-2 border-t">{lottery?.token}</td> */}
                <td className="px-4 py-2 border-t">{lottery?.Winner}</td>
                <td className="px-4 py-2 border-t">{lottery?.start}</td>
                <td className="px-4 py-2 border-t">{lottery?.end}</td>
                {/* <td className="px-4 py-2 border-t">
                  <span
                    className={`text-${
                      lottery?.status === "Active" ? "green" : "red"
                    }-500`}
                  >
                    &#x2022; {lottery?.status}
                  </span>
                </td> */}
                <td className="px-4 py-2 border-t">
                  <button
                    className="bg-[#efb23a] text-white px-3 py-1 rounded hover:bg-[#233545]"
                    onClick={() => openModal(lottery)}
                  >
                    View Winner
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Select Winner"
        className="bg-white p-8 rounded-lg shadow-lg max-w-[700px] mx-auto mt-28"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 "
      >
        <h2 className="text-xl font-bold mb-4">Winner details</h2>
        {selectedLottery && (
          <div>
            <p>
              <strong>Lottery Number:</strong> {selectedLottery.number}
            </p>
            {/* <p>
              <strong>Token:</strong> {selectedLottery.token}
            </p> */}
            <p>
              <strong>Start Time:</strong> {selectedLottery.startTime}
            </p>
            <p>
              <strong>End Time:</strong> {selectedLottery.endTime}
            </p>
            <p>
              <strong>Addresses:</strong>
              {selectedLottery.Winner}
            </p>
            {/* <ul>
              {selectedLottery.addresses.map((address, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    value={address}
                    onChange={() => handleSelectWinner(address)}
                    checked={selectedWinner === address}
                  />
                  {address}
                </li>
              ))}
            </ul> */}
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={closeModal}
              >
                Back
              </button>
              {/* <button
                className="bg-[#efb23a] text-white px-3 py-1 rounded hover:bg-[#233545]"
                onClick={handleSubmitWinner}
              >
                Confirm
              </button> */}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

import React, { useState, useContext } from "react";
import Web3 from "web3";
import icon from "../assets/metmask-icon.png";
import { Web3Context } from "./web3context";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root"); // Assuming your root element id is "root"

export default function Navbar() {
  const [ownerAddress, setOwnerAddress] = useState("");
  const { isConnectedd, web3, connectedAddress, connectToMetaMask } =
    useContext(Web3Context);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    LotteryNumber: "",
    Address: [""],
    Winner: "",
    start: "",
    end: "",
  });

  const handleConnect = async () => {
    if (isConnectedd === false) {
      await connectToMetaMask();
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressChange = (index, event) => {
    const newAddresses = formData.Address.map((address, i) => {
      if (i === index) {
        return event.target.value;
      }
      return address;
    });
    setFormData({ ...formData, Address: newAddresses });
  };

  const addAddressField = () => {
    setFormData({ ...formData, Address: [...formData.Address, ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      LotteryNumber: formData.LotteryNumber,
      Address: formData.Address.filter((address) => address.trim() !== ""), // Remove empty addresses
      Winner: formData.Winner,
      start: formData.start,
      end: formData.end,
    };
    console.log(requestData)
    // return
    try {
      const response = await axios.post('https://localhost:4444/lottery/addLottery', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      closeModal();
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
  };

  return (
    <nav className="w-full items-center px-4 py-4 md:p-4 h-15 bg-[#080d1854] flex justify-between">
      <div className="text-2xl font-bold text-white shadow-lg shadow-black cursor-pointer">
        Eth Lucky Draw{" "}
      </div>
      <div className="flex flex-row gap-3">
        <button className="create-lottery-button" onClick={openModal}>
          Create Lucky Draw
        </button>
        <button onClick={handleConnect} className="md:hidden">
          {" "}
          <img src={icon} className="h-11" />{" "}
        </button>

        <button
          onClick={handleConnect}
          type="button"
          className="hidden md:block text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 rounded-lg text-sm p-3 text-center text-[15px] font-bold me-2 mb-2 px-7"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 inline-block mx-2 items-center"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
            />
          </svg>
          {connectedAddress
            ? `${connectedAddress.slice(0, 4)}...${connectedAddress.slice(
                connectedAddress.length - 4
              )}`
            : "Connect"}
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Create Lucky Draw"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Create Lucky Draw</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Lottery Number:
            <input
              type="text"
              name="LotteryNumber"
              value={formData.LotteryNumber}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Address:
            {formData.Address.map((address, index) => (
              <input
                key={index}
                type="text"
                value={address}
                onChange={(e) => handleAddressChange(index, e)}
                required
              />
            ))}
            <button type="button" onClick={addAddressField}>
              Add Address
            </button>
          </label>
          <label>
            Winner:
            <input
              type="text"
              name="Winner"
              value={formData.Winner}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Start Date-Time:
            <input
              type="datetime-local"
              name="start"
              value={formData.start}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            End Date-Time:
            <input
              type="datetime-local"
              name="end"
              value={formData.end}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </nav>
  );
}

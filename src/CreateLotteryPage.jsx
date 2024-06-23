import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateLotteryPage() {
  const [formData, setFormData] = useState({
    LotteryNumber: "",
    Address: [""],
    Winner: "",
    start: "",
    end: "",
  });

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
    try {
      const response = await axios.post(
        "https://localhost:4444/lottery/addLottery",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };
  const navigate = useNavigate();

  const handlecreateLotteryPage = () => {
    navigate("/admin/dashboard");
  };
  return (
    <>
      <div className="flex flex-row justify-end px-4 mt-28">
        <button
          onClick={handlecreateLotteryPage}
          class=" transition-colors inline-flex justify-center items-center p-4  font-medium !text-center !text-xl !border-2 !border-[#efb23a] hover:!bg-[#efb23a] text-white !bg-[#233545] rounded-lg  "
        >
          View All Lotteries
        </button>
      </div>
      <div className="flex  justify-center ">
        <div className="bg-white p-8 rounded-lg border-[#efb23a] border-2 shadow-[#233545] shadow-xl w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Create Lucky Draw
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="lotteryNumber"
              >
                Lottery Number
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                id="lotteryNumber"
                type="text"
                name="LotteryNumber"
                value={formData.LotteryNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="winner"
              >
                Winner
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                id="winner"
                type="text"
                name="Winner"
                value={formData.Winner}
                onChange={handleChange}
                required
              />
            </div>
            {/* Address fields */}
            {formData.Address.map((address, index) => (
              <div className="mb-4" key={index}>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor={`address${index}`}
                >
                  Address {index + 1}
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  id={`address${index}`}
                  type="text"
                  value={address}
                  onChange={(e) => handleAddressChange(index, e)}
                  required
                />
              </div>
            ))}
            <div className="mb-4">
              <button
                class="w-full transition-colors inline-flex justify-center items-center px-3 py-2 text-sm font-medium !text-center hover:!bg-[#efb23a] text-white !bg-[#233545] rounded-lg  "
                type="button"
                onClick={addAddressField}
              >
                Add Address
              </button>
            </div>
            {/* Start and End Date-Time fields */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="start"
              >
                Start Date-Time:
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                id="start"
                type="datetime-local"
                name="start"
                value={formData.start}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="end"
              >
                End Date-Time:
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                id="end"
                type="datetime-local"
                name="end"
                value={formData.end}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                class="w-full transition-colors inline-flex justify-center items-center px-3 py-2 text-sm font-medium !text-center hover:!bg-[#efb23a] text-white !bg-[#233545] rounded-lg  "
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

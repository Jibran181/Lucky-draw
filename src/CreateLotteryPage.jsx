import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

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
            const response = await axios.post('https://localhost:4444/lottery/addLottery', requestData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error('There was an error submitting the form!', error);
        }
    };
    const navigate = useNavigate();

    const handlecreateLotteryPage = () => {
        navigate('/admin/dashboard');
    }
    return (
        <>
            <div className="flex flex-row justify-end mx-10">
                <button onClick={handlecreateLotteryPage} className="create-lottery-button">
                    View All Lotteries
                </button>
            </div><div className="flex  justify-center  h-screen">
                <div className="max-w-md w-full bg-white shadow-md rounded px-8 pt-2 pb-2">


                    <h2 className="text-2xl font-bold mb-4 text-center">Create Lucky Draw</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lotteryNumber">
                                Lottery Number:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="lotteryNumber"
                                type="text"
                                name="LotteryNumber"
                                value={formData.LotteryNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="winner">
                                Winner:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`address${index}`}>
                                    Address {index + 1}:
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={addAddressField}
                            >
                                Add Address
                            </button>
                        </div>
                        {/* Start and End Date-Time fields */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="start">
                                Start Date-Time:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="start"
                                type="datetime-local"
                                name="start"
                                value={formData.start}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="end">
                                End Date-Time:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useNavigate } from 'react-router-dom';

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
        setLotteries([
            {
                number: '12345',
                token: 'ETH',
                winner: '',
                startTime: '01/01/2024 12:00 PM',
                endTime: '01/15/2024 12:00 PM',
                status: 'Active',
                addresses: [
                    '0x123...abcd',
                    '0x456...efgh',
                    '0x789...ijkl',
                    '0x101...mnop',
                    '0x121...qrst'
                ]
            },
            // Add other lottery data here
        ]
        );

        return
        try {
            const response = await axios.get("https://your-api-url.com/lotteries");
            setLotteries(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
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
                winner: selectedWinner
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
        navigate('/admin/createLotteryPage');
    }
    return (
        <div className="admin-dashboard-container">
            <h2 className="text-2xl font-bold text-white text-center shadow-lg shadow-black cursor-pointer">Admin Dashboard</h2>
            <div className="flex flex-row justify-end mx-10">
                <button onClick={handlecreateLotteryPage} className="create-lottery-button">
                    Create Lucky Draw
                </button>
            </div>
            <div className="p-4 md:px-10 md:py-5 col-span-8">
                <table className="w-full text-white bg-slate-900 bg-opacity-50 border-sky-500 border-2 shadow-black shadow-xl rounded-xl">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b">Lottery Number</th>
                            <th className="px-4 py-2 border-b">Token</th>
                            <th className="px-4 py-2 border-b">Winner</th>
                            <th className="px-4 py-2 border-b">Start Time</th>
                            <th className="px-4 py-2 border-b">End Time</th>
                            <th className="px-4 py-2 border-b">Status</th>
                            <th className="px-4 py-2 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lotteries.map((lottery, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2 border-t">{lottery.number}</td>
                                <td className="px-4 py-2 border-t">{lottery.token}</td>
                                <td className="px-4 py-2 border-t">{lottery.winner}</td>
                                <td className="px-4 py-2 border-t">{lottery.startTime}</td>
                                <td className="px-4 py-2 border-t">{lottery.endTime}</td>
                                <td className="px-4 py-2 border-t">
                                    <span className={`text-${lottery.status === 'Active' ? 'green' : 'red'}-500`}>
                                        &#x2022; {lottery.status}
                                    </span>
                                </td>
                                <td className="px-4 py-2 border-t">
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => openModal(lottery)}>
                                        Select Winner
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
                className="bg-white p-8 rounded-lg shadow-lg max-w-[700px] mx-auto mt-20"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                <h2 className="text-xl font-bold mb-4">Select Winner</h2>
                {selectedLottery && (
                    <div>
                        <p><strong>Lottery Number:</strong> {selectedLottery.number}</p>
                        <p><strong>Token:</strong> {selectedLottery.token}</p>
                        <p><strong>Start Time:</strong> {selectedLottery.startTime}</p>
                        <p><strong>End Time:</strong> {selectedLottery.endTime}</p>
                        <p><strong>Addresses:</strong></p>
                        <ul>
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
                        </ul>
                        <div className="mt-6 flex justify-end space-x-4">
                            <button className="bg-gray-300 text-black px-4 py-2 rounded" onClick={closeModal}>
                                Cancel
                            </button>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmitWinner}>
                                Confirm
                            </button>
                        </div>
                    </div>
                )}
            </Modal>

        </div>
    );
}

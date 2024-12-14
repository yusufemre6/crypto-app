import React, { useState, useEffect } from 'react';
import "../styles/Home.css";
import Header from "../components/Header";

function Home() {
    const [cryptoData, setCryptoData] = useState([]);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:5242/marketHub');

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message?.data) {
                setCryptoData((prev) => {
                    const updated = [...prev];
                    message.data.forEach((coin) => {
                        const index = updated.findIndex((c) => c.instId === coin.instId);
                        if (index !== -1) updated[index] = coin;
                        else updated.push(coin);
                    });
                    return updated;
                });
            }
        };

        return () => ws.close();
    }, []);

    const handleDetailsClick = (coin) => {
        if (!localStorage.getItem('token')) {
            window.location.href = '/login';
        } else {
            setSelectedCoin(coin);
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCoin(null);
    };

    return (
        <div>
            <Header></Header>
            <h1>Kripto Para Fiyatları</h1>
            <table>
                <thead>
                    <tr>
                        <th>Coin Adı</th>
                        <th>Fiyat</th>
                        <th>Detaylar</th>
                    </tr>
                </thead>
                <tbody>
                    {cryptoData.map((crypto) => (
                        <tr key={crypto.instId}>
                            <td>{crypto.instId}</td>
                            <td>{crypto.last}</td>
                            <td>
                                <button onClick={() => handleDetailsClick(crypto)}>Ayrıntılar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && selectedCoin && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{selectedCoin.instId} Ayrıntıları</h2>
                        <p>Son Fiyat: {selectedCoin.last}</p>
                        <p>24 Saatlik Yüksek: {selectedCoin.high24h}</p>
                        <p>24 Saatlik Düşük: {selectedCoin.low24h}</p>
                        <p>Hacim: {selectedCoin.vol24h}</p>
                        <button onClick={closeModal}>Kapat</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
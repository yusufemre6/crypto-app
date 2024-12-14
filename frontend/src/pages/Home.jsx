import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../services/websocket";
import Modal from "../components/Modal";

const Home = () => {
  const [prices, setPrices] = useState([]); // Kripto fiyatlarını saklar
  const [selectedSymbol, setSelectedSymbol] = useState(null); // Modal için seçili sembol
  const [modalData, setModalData] = useState(null); // Modal detay verileri
  const navigate = useNavigate();

  // WebSocket bağlantısı kurma
  useEffect(() => {
    socket.on("cryptoPrices", (data) => {
      setPrices(data);
    });

    return () => {
      socket.off("cryptoPrices");
    };
  }, []);

  // Bir sembol seçildiğinde modal açılır
  const handleSymbolClick = (symbol) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Modal detayları için API çağrısı (WebSocket kullanarak alabilirsiniz)
    const symbolData = prices.find((item) => item.symbol === symbol);
    setModalData(symbolData);
    setSelectedSymbol(symbol);
  };

  const closeModal = () => {
    setSelectedSymbol(null);
    setModalData(null);
  };

  return (
    <div>
      <h1>Crypto Prices</h1>
      <ul>
        {prices.map((price, index) => (
          <li key={index} onClick={() => handleSymbolClick(price.symbol)}>
            <strong>{price.symbol}</strong>: {price.lastPrice}
          </li>
        ))}
      </ul>

      {/* Modal Bileşeni */}
      {selectedSymbol && modalData && (
        <Modal symbol={selectedSymbol} data={modalData} onClose={closeModal} />
      )}
    </div>
  );
};

export default Home;
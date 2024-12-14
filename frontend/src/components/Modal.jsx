import React from "react";

const Modal = ({ symbol, data, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{symbol}</h2>
        <p>Son Fiyat: {data.lastPrice}</p>
        <p>24 Saat En Yüksek: {data.high24h}</p>
        <p>24 Saat En Düşük: {data.low24h}</p>
        <p>Hacim: {data.volume}</p>
        <button onClick={onClose}>Kapat</button>
      </div>
    </div>
  );
};

export default Modal;
// src/components/SymbolModal.js
import React from 'react';

const SymbolModal = ({ symbol }) => {
  return (
    <div className="modal">
      <h2>{symbol.name} Detayları</h2>
      <p>Son Fiyat: {symbol.lastPrice}</p>
      <p>24 Saatlik Yüksek: {symbol.high24h}</p>
      <p>24 Saatlik Düşük: {symbol.low24h}</p>
      <p>24 Saatlik Hacim: {symbol.volume24h}</p>
    </div>
  );
};

export default SymbolModal;
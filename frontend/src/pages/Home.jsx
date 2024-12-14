import React, { useContext } from "react";
import HeaderBar from "../components/Header";
import "../styles/global.css";
import  WebSocketContext  from "../context/WebSocketContext";

const Home = () => {
  const cryptoData = useContext(WebSocketContext);
  return (
    <div>
      <HeaderBar></HeaderBar>
      <h1>Anlık Kripto Para Fiyatları</h1>
      <table>
        <thead>
          <tr>
            <th>Sembol</th>
            <th>Fiyat</th>
            <th>24 Saat Hacim</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData.map((item, index) => (
            <tr key={index}>
              <td>{item.instId}</td>
              <td>{item.last}</td>
              <td>{item.vol24h}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;

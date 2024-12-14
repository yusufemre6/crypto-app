import React, { useContext } from "react";
import { WebSocketContext } from "../context/WebSocketContext";
import HeaderBar from "../components/Header";

const Home = () => {
  const { data } = useContext(WebSocketContext);

  return (
    <div>
      <HeaderBar></HeaderBar>
      <h1>Crypto Prices</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <strong>{item.symbol}</strong>: {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

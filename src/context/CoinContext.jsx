import React, { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = ({ children }) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  const fetchAllCoin = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-TqLgG2HJX7m1d9vohkpjpz84", // ✅ Your key added here
      },
    };

    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
        options
      );

      const contentType = res.headers.get("content-type");

      if (!res.ok) {
        const errorMessage = contentType.includes("application/json")
          ? await res.json()
          : await res.text();
        throw new Error(`Error ${res.status}: ${errorMessage}`);
      }

      const data = await res.json();
      setAllCoin(data);
    } catch (err) {
      console.error("❌ Error fetching coins:", err.message);
    }
  };

  useEffect(() => {
    fetchAllCoin();
  }, [currency]);

  const contextValue = {
    allCoin,
    currency,
    setCurrency,
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
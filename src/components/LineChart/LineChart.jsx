import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([["Date", "Price"]]);

  useEffect(() => {
    if (historicalData?.prices) {
      const datacopy = [["Date", "Price"]];
      historicalData.prices.forEach((item) => {
        const formattedDate = new Date(item[0])
          .toLocaleDateString()
          .slice(0, -5); // Removes last 5 characters from date string
        datacopy.push([formattedDate, item[1]]);
      });
      setData(datacopy);
    }
  }, [historicalData]);

  return (
    <Chart
      chartType="LineChart"
      data={data}
      height="100%"
      legendToggle
    />
  );
};

export default LineChart;
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const FinancialFlowChart = () => {
  const [timeRange, setTimeRange] = useState("Jan 2024 - Jun 2024");

  const generateRandomData = (min, max) => {
    return Array.from(
      { length: 6 },
      () => Math.floor(Math.random() * (max - min + 1)) + min
    );
  };

  const dataSets = {
    "Jan 2024 - Jun 2024": {
      approved: generateRandomData(20, 80),
      pending: generateRandomData(10, 70),
      rejected: generateRandomData(15, 60),
    },
    "Jul 2024 - Dec 2024": {
      approved: generateRandomData(30, 90),
      pending: generateRandomData(20, 80),
      rejected: generateRandomData(25, 70),
    },
    "Jan 2025 - Jun 2025": {
      approved: generateRandomData(40, 100),
      pending: generateRandomData(30, 90),
      rejected: generateRandomData(35, 80),
    },
  };

  const chartOptions = {
    chart: {
      height: 350,
      type: "line",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.5,
      },
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      background: "transparent",
    },
    colors: ["#1E90FF", "#00E396", "#FFA500"], // Updated colors
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0,
      },
    },
    markers: {
      size: 5,
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      title: {
        text: "Month",
      },
    },
    yaxis: {
      title: {
        text: "Claims",
      },
      min: 0,
      max: 100,
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
    },
  };

  const chartSeries = [
    {
      name: "Approved Claims",
      data: dataSets[timeRange].approved,
    },
    {
      name: "Pending Claims",
      data: dataSets[timeRange].pending,
    },
    {
      name: "Rejected Claims",
      data: dataSets[timeRange].rejected,
    },
  ];

  return (
    <div>
      <div className="flex justify-end">
        <select
          onChange={(e) => setTimeRange(e.target.value)}
          value={timeRange}
          className="border rounded px-3 py-1 my-2"
        >
          <option value="Jan 2024 - Jun 2024">Jan 2024 - Jun 2024</option>
          <option value="Jul 2024 - Dec 2024">Jul 2024 - Dec 2024</option>
          <option value="Jan 2025 - Jun 2025">Jan 2025 - Jun 2025</option>
        </select>
      </div>

      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="line"
        height={350}
      />
    </div>
  );
};

export default FinancialFlowChart;

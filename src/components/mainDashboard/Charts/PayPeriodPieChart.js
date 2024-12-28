import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const PayPeriodChart = () => {
  const [timeRange, setTimeRange] = useState("Jan 1, 2024 - Jan 15, 2024");

  const dataSets = {
    "Jan 1, 2024 - Jan 15, 2024": [20, 15, 10],
    "Jan 16, 2024 - Jan 31, 2024": [25, 20, 15],
    "Feb 1, 2024 - Feb 15, 2024": [30, 25, 20],
  };

  const chartOptions = {
    chart: {
      type: "pie",
      width: 380,
    },
    labels: ["Approved", "Pending", "Rejected"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    tooltip: {
      y: {
        formatter: (val) => `${val}`,
      },
    },
    legend: {
      position: "bottom",
    },
  };

  const chartSeries = dataSets[timeRange] || [];

  return (
    <div>
      <div className="flex justify-end">
        <select
          onChange={(e) => setTimeRange(e.target.value)}
          value={timeRange}
          className="border rounded px-3 py-1 my-2"
        >
          <option value="Jan 1, 2024 - Jan 15, 2024">
            Jan 1, 2024 - Jan 15, 2024
          </option>
          <option value="Jan 16, 2024 - Jan 31, 2024">
            Jan 16, 2024 - Jan 31, 2024
          </option>
          <option value="Feb 1, 2024 - Feb 15, 2024">
            Feb 1, 2024 - Feb 15, 2024
          </option>
        </select>
      </div>
      <div className="mt-10">
        {chartSeries.length > 0 ? (
          <ReactApexChart
            options={chartOptions}
            series={chartSeries}
            type="pie"
          />
        ) : (
          <div>No data available</div>
        )}
      </div>
    </div>
  );
};

export default PayPeriodChart;

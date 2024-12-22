import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const PayPeriodChart = () => {
    const [timeRange, setTimeRange] = useState("Jan 1, 2024 - Jan 15, 2024");

    const dataSets = {
        "Jan 1, 2024 - Jan 15, 2024": [15000, 12000, 10000, 5000, 3000],
        "Jan 16, 2024 - Jan 31, 2024": [20000, 15000, 12000, 8000, 4000],
        "Feb 1, 2024 - Feb 15, 2024": [18000, 14000, 11000, 6000, 3500],
    };

    const chartOptions = {
        chart: {
            type: "donut",
            width: 300,
        },
        labels: ["Medicaid", "UCare", "BCBS", "Medcia", "Health Partners"],
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
                formatter: (val) => `$${val}`,
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
                >
                    <option value="Jan 1, 2024 - Jan 15, 2024">Jan 1, 2024 - Jan 15, 2024</option>
                    <option value="Jan 16, 2024 - Jan 31, 2024">Jan 16, 2024 - Jan 31, 2024</option>
                    <option value="Feb 1, 2024 - Feb 15, 2024">Feb 1, 2024 - Feb 15, 2024</option>
                </select>
            </div>
            <div className="mt-10">
                {chartSeries.length > 0 ? (
                    <ReactApexChart
                        options={chartOptions}
                        series={chartSeries}
                        type="donut"
                    />
                ) : (
                    <div>No data available</div>
                )}
            </div>

        </div>
    );
};

export default PayPeriodChart;
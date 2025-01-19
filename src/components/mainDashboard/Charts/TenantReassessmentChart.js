import React from "react";
import ReactApexChart from "react-apexcharts";

const TenantReassessmentChart = ({ dayCounts, onBarClick }) => {
    const chartOptions = {
        chart: {
            type: "bar",
            toolbar: {
                show: false,
            },
            events: {
                dataPointSelection: (event, chartContext, config) => {
                    const { dataPointIndex } = config;
                    const days = ["90", "60", "30", "15", "5"][dataPointIndex];
                    onBarClick(days);
                },
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "50%",
                borderRadius: 5,
            },
        },
        xaxis: {
            categories: ["90", "60", "30", "15", "5"],
            labels: {
                style: {
                    colors: "#333",
                    fontSize: "12px",
                    fontWeight: "normal",
                },
            },
            title: {
                text: "Days",
                style: {
                    color: "#333",
                    fontSize: "14px",
                    fontWeight: "normal",
                },
            },
        },
        yaxis: {
            title: {
                text: "Count",
                style: {
                    color: "#333",
                    fontSize: "14px",
                    fontWeight: "normal",
                },
            },
            labels: {
                style: {
                    colors: "#333",
                    fontSize: "12px",
                    fontWeight: "normal",
                },
            },
        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            y: {
                formatter: (val) => val,
            },
        },
        legend: {
            position: "bottom",
            horizontalAlign: "center",
            labels: {
                colors: "#333",
                fontWeight: "normal",
            },
        },
        colors: ["#1E90FF"],
    };

    const chartSeries = [
        {
            name: "Reassessments",
            data: [
                dayCounts["90"],
                dayCounts["60"],
                dayCounts["30"],
                dayCounts["15"],
                dayCounts["5"],
            ],
        },
    ];

    return (
        <div className="chart-container" style={{ cursor: 'pointer' }}>
            <ReactApexChart
                options={chartOptions}
                series={chartSeries}
                type="bar"
                height={350}
            />
        </div>
    );
};

export default TenantReassessmentChart;
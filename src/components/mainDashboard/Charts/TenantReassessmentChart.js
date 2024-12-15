import React from "react";
import ReactApexChart from "react-apexcharts";

const TenantReassessmentChart = ({ dayCounts }) => {
    const chartOptions = {
        chart: {
            type: "bar",
            toolbar: {
                show: false, // Disable the toolbar
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
            categories: ["90", "60", "30", "15", "5"], // Reverse order
            labels: {
                style: {
                    colors: "#333",
                    fontSize: "12px",
                    fontWeight: "normal", // Ensure labels are not bold
                },
            },
            title: {
                text: "Days",
                style: {
                    color: "#333",
                    fontSize: "14px",
                    fontWeight: "normal", // Ensure title is not bold
                },
            },
        },
        yaxis: {
            title: {
                text: "Count",
                style: {
                    color: "#333",
                    fontSize: "14px",
                    fontWeight: "normal", // Ensure title is not bold
                },
            },
            labels: {
                style: {
                    colors: "#333",
                    fontSize: "12px",
                    fontWeight: "normal", // Ensure labels are not bold
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
                fontWeight: "normal", // Ensure legend labels are not bold
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
        <ReactApexChart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={350}
        />
    );
};

export default TenantReassessmentChart;
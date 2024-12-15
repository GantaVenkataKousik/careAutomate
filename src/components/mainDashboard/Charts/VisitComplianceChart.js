import React from "react";
import ReactApexChart from "react-apexcharts";

const VisitComplianceChart = ({ categories, visitData }) => {
    const chartOptions = {
        chart: {
            type: "bar",
            width: 400,
            stacked: true,
            toolbar: {
                show: false, // Disable the toolbar
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "55%",
                borderRadius: 5,
            },
        },
        xaxis: {
            categories: categories,
        },
        yaxis: {
            title: {
                text: "Visits",
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
    };

    const chartSeries = [
        {
            name: "Direct",
            data: visitData.direct,
        },
        {
            name: "Indirect",
            data: visitData.indirect,
        },
        {
            name: "Remote",
            data: visitData.remote,
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

export default VisitComplianceChart;
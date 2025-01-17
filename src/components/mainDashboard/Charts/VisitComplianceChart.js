import React from "react";
import ReactApexChart from "react-apexcharts";

const VisitComplianceChart = ({ categories, visitData, onBarClick }) => {
    const chartOptions = {
        chart: {
            type: "bar",
            width: 400,
            stacked: true,
            toolbar: {
                show: false,
            },
            events: {
                dataPointSelection: (event, chartContext, config) => {
                    const { dataPointIndex, seriesIndex } = config;
                    const method = ["direct", "indirect", "remote"][seriesIndex];
                    const month = categories[dataPointIndex];
                    onBarClick(method, month);
                },
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "55%",
                borderRadius: 5,
                cursor: 'pointer',
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
        }, legend: {
            position: "bottom",
            horizontalAlign: "center",
        },
        colors: ["#1E90FF", "#FF6347", "#32CD32"],
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
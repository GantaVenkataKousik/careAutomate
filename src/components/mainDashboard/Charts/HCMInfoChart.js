import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { API_ROUTES } from "../../../routes.js";

const HCMInfoChart = () => {
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                type: 'area',
                height: 300,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            markers: {
                size: 5, // Size of the dots
            },
            xaxis: {
                categories: [], // Months
            },
            yaxis: {
                title: {
                    text: 'Number of Units'
                }
            },
            legend: {
                horizontalAlign: 'center'
            },
            colors: ['#FFA500', '#00E396'] // Different color set
        }
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_ROUTES.HCM.GET_INFO}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const result = await response.json();

                if (result.success) {
                    const data = result.data["2024"];
                    const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    const months = Object.keys(data);

                    const getRandomValue = () => Math.floor(Math.random() * 9) + 2;

                    const activeUnitsData = allMonths.map(month => data[month]?.activeUnits ?? getRandomValue());
                    const releasedUnitsData = allMonths.map(month => data[month]?.releasedUnits ?? getRandomValue());

                    setChartData({
                        series: [
                            {
                                name: "Active",
                                data: activeUnitsData
                            },
                            {
                                name: "Released",
                                data: releasedUnitsData
                            }
                        ],
                        options: {
                            ...chartData.options,
                            xaxis: {
                                categories: allMonths
                            }
                        }
                    });
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div id="chart">
                <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="area"
                    height={350}
                />
            </div>
        </div>
    );
};

export default HCMInfoChart;
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { API_ROUTES } from "../../../routes.js";

const TenantAreaChart = () => {
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
                    text: 'Number of Tenants'
                }
            },
            legend: {
                horizontalAlign: 'center'
            }
        }
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_ROUTES.TENANTS.GET_INFO}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const result = await response.json();

                if (result.success) {
                    const data = result.response["2024"];
                    const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    const months = Object.keys(data);
                    const getRandomValue = () => Math.floor(Math.random() * 9) + 2;

                    const movedOutData = allMonths.map(month => data[month]?.movedOut ?? getRandomValue());
                    const receivingServicesData = allMonths.map(month => data[month]?.receivingServices ?? getRandomValue());
                    setChartData({
                        series: [
                            {
                                name: "Active",
                                data: receivingServicesData
                            },
                            {
                                name: "Released",
                                data: movedOutData
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

export default TenantAreaChart;
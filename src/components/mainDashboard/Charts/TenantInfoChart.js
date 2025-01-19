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
                size: 6, // Size of the dots
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
    const [selectedYear, setSelectedYear] = useState("");
    const [availableYears, setAvailableYears] = useState([]);
    const [loading, setLoading] = useState(true);

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
                    const years = Object.keys(result.response);
                    setAvailableYears(years);
                    setSelectedYear(years[0]); // Set the first available year as the default

                    const data = result.response[years[0]];
                    const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                    // Use null for months without data
                    const movedOutData = allMonths.map(month => data[month]?.movedOut ?? null);
                    const receivingServicesData = allMonths.map(month => data[month]?.receivingServices ?? null);

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

    useEffect(() => {
        if (!selectedYear) return;

        const token = localStorage.getItem('token');
        const fetchDataForYear = async () => {
            try {
                const response = await fetch(`${API_ROUTES.TENANTS.GET_INFO}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const result = await response.json();

                if (result.success) {
                    const data = result.response[selectedYear];
                    const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                    // Use null for months without data
                    const movedOutData = allMonths.map(month => data[month]?.movedOut ?? null);
                    const receivingServicesData = allMonths.map(month => data[month]?.receivingServices ?? null);

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

        fetchDataForYear();
    }, [selectedYear]);

    return (
        <div>
            <div className="mb-4">
                <label htmlFor="year-select" className="mr-2">Select Year:</label>
                <select
                    id="year-select"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="border border-gray-300 rounded-md p-2"
                >
                    {availableYears.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>
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
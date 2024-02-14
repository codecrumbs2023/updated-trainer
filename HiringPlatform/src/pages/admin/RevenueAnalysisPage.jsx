import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
 
function RevenueAnalysisPage() {
  const [quarterlyRevenue, setQuarterlyRevenue] = useState([]);
 
  useEffect(() => {
    fetchQuarterlyRevenue();
  }, []);
 
  const fetchQuarterlyRevenue = async () => {
    try {
      // Fetch quarterly revenue data from the backend
      const response = await axios.get(
        "http://localhost:3001/quarterly-revenue"
      );
      // Set the data to state
      setQuarterlyRevenue(response.data);
    } catch (error) {
      console.error("Error fetching quarterly revenue:", error);
    }
  };
 
  // Sample data for demonstration (quarterly revenue)
  const quarterlyRevenueData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Quarterly Revenue",
        data: [
          10000,
          15000,
          20000,
          18000, // Update with your quarterly revenue data
        ],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };
 
  return (
    <div>
      <h4 className="text-lg font-bold mb-4">Quarterly Revenue Analysis:</h4>
      <div className="mb-4" style={{ width: "50%", margin: "0 auto" }}>
        {/* Render the chart */}
        <Bar
          data={quarterlyRevenueData}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
          width={400} // Adjust width as needed
          height={300} // Adjust height as needed
        />
      </div>
    </div>
  );
}
 
export default RevenueAnalysisPage;
import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import "../css/Barchart.css";
const BarChart = ({ chartData, chartData2 }) => {
  return (
    <React.Fragment>
      <div className="charts">
        <h1>User Analytics</h1>
        <div className="ch">
          <Pie data={chartData} style={{ height: "250px", width: "250px" }} />
          <Bar data={chartData2} style={{ height: "250px", width: "250px" }} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default BarChart;

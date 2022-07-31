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
          <Pie data={chartData} />
          <Bar data={chartData2} style={{ height: "500px", width: "500px" }} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default BarChart;

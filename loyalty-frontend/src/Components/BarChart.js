import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import '../css/Barchart.css';
const BarChart = ({ chartData }) => {
  return (
    <React.Fragment>
      <div className="charts">
        <Pie data={chartData} style={{ height: "40%", width: "19%" }} />
        <Bar data={chartData} style={{ height: "40%", width: "19%" }} />
      </div>
    </React.Fragment>
  );
};

export default BarChart;

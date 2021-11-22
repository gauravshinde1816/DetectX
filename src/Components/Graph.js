import React from "react";
import { Doughnut, Pie } from "react-chartjs-2";
const Graph = ({ predictions }) => {
  const res = predictions && predictions.map((p) => +p.result);
  const labels = predictions && predictions.map((p) => p.name);
  const data = {
    labels,
    datasets: [
      {
        label: "Covid19 Prediction",
        data: res,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <div>
      {predictions && (
        <Pie
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: true,
          }}
        />
      )}
    </div>
  );
};

export default Graph;

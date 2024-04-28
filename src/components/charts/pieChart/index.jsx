import React from "react";
import { Chart as ChartJS, Legend, Tooltip, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";
import pieChart from "./pie.module.scss";
import { generateUniqueColor } from "services/generateUniqueColors";
ChartJS.register(Legend, Tooltip, ArcElement);

export function PieChart({
  data,
  title,
  subtitle,
  textBottom,
  width = "100%",
  label,
  height = "100%",
}) {
  // console.log(data, "dataa");

  const options = {
    responsive: true,
    cutoutPercentage: 300,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        font: { weight: "bold" },
      },
    },
  };
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: label,
        data: Object.values(data),
        backgroundColor: generateUniqueColor(Object.keys(data).length),
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className={pieChart.chart}>
        {title ? <h1>{title}</h1> : null}
        {subtitle ? <p className={pieChart.subtitle}>{subtitle}</p> : null}
        <div className={pieChart.chart2}>
          <Pie className={pieChart.pie} data={chartData} options={options} />
        </div>
        {textBottom ? (
          <p className={pieChart.text_bottom}>{textBottom}</p>
        ) : null}
      </div>
    </>
  );
}


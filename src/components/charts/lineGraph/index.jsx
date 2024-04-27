import React from "react";
import lineGraphScss from "./line.module.scss";
import { generateUniqueColor } from "services/generateUniqueColors";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

function LineGraph({
  data,
  title,
  subtitle,
  textBottom,
  isMonthUniqueLabels = true,
  width = "100%",
  height = "100%",
}) {
  const labels = data.reduce((allLabels, item) => {
    return allLabels.concat(Object.keys(item).filter((key) => key !== "label"));
  }, []);
  const monthOrder = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const uniqueLabels = [...new Set(labels)];
  if (isMonthUniqueLabels) {
    uniqueLabels.sort((a, b) => {
      return monthOrder.indexOf(a) - monthOrder.indexOf(b);
    });
  }

  const datasets = data.map((item) => {
    const label = item.label;
    const data = uniqueLabels.map((label) => item[label] || 0);
    const uniqueColor = generateUniqueColor(1);
    return {
      label: label,
      data: data,
      backgroundColor: uniqueColor,
      borderColor: uniqueColor,
      pointBorderColor: uniqueColor,
      pointBackgroundColor: uniqueColor,
      pointRadius: 6,
      pointHoverRadius: 10,
      borderWidth: 2,
    };
  });

  const chartData = {
    labels: uniqueLabels,
    datasets: datasets,
  };
  return (
    <div className={lineGraphScss.chartContainer}>
      {title ? <h1 className={lineGraphScss.title}>{title}</h1> : null}
      {subtitle ? <p className={lineGraphScss.subtitle}>{subtitle}</p> : null}
      <div className={lineGraphScss.chart}>
        <Line
          data={chartData}
          options={options}
          width={width}
          height={height}
        />
      </div>
      {textBottom ? (
        <p className={lineGraphScss.text_bottom}>{textBottom}</p>
      ) : null}
    </div>
  );
}
export default LineGraph;

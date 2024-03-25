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
function LineGraph({
  data,
  title,
  subtitle,
  textBottom,
  width = "100%",
  height = "100%",
}) {
  const labels = data.reduce((allLabels, item) => {
    return allLabels.concat(Object.keys(item).filter((key) => key !== "label"));
  }, []);

  const uniqueLabels = [...new Set(labels)];

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
      borderWidth: 2,
    };
  });

  const chartData = {
    labels: uniqueLabels,
    datasets: datasets,
  };
  return (
    <div>
      <>
        <div className={lineGraphScss.chart}>
          {title ? <h1>{title}</h1> : null}
          {subtitle ? (
            <p className={lineGraphScss.subtitle}>{subtitle}</p>
          ) : null}
          <div className={lineGraphScss.chart2}>
            <Line data={chartData} />
          </div>
          {textBottom ? (
            <p className={lineGraphScss.text_bottom}>{textBottom}</p>
          ) : null}
        </div>
      </>
    </div>
  );
}
export default LineGraph;

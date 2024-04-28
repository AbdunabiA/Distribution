import { generateUniqueColor } from "services/generateUniqueColors";
import barchart from "./barchart.module.scss";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
<<<<<<< HEAD
function BarChart({
  data,
  title,
  subtitle,
  textBottom,
  isMonthUniqueLabels = true,
}) {
=======
export function BarChart({ data, title, subtitle, textBottom, isMonthUniqueLabels=true }) {
>>>>>>> f1d60b82010043dd621d4af37c5a992df95a4b11
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
      borderWidth: 2,
    };
  });

  const barData = {
    labels: uniqueLabels,
    datasets: datasets,
  };
  return (
    <div className={barchart.basic}>
      <div className={barchart.bare}>
        {title ? <h1 className={barchart.title}>{title}</h1> : null}
        {subtitle ? <p className={barchart.subtitle}>{subtitle}</p> : null}
        <div className={barchart.bar}>
          <Bar options={options} data={barData} />
        </div>
        {textBottom ? (
          <p className={barchart.text_bottom}>{textBottom}</p>
        ) : null}
      </div>
    </div>
  );
}



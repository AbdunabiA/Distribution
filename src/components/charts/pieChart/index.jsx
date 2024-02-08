import React from "react";
import { Chart as ChartJS, Legend, Tooltip, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";
import pieChart from './pie.module.scss'
ChartJS.register(Legend, Tooltip, ArcElement);
export const options = {
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
function PieChart({ 
    data,
    title, 
    subtitle, 
    textBottom, 
    width="100%", 
    height= "100%",
 }) {
  console.log(data, "dataa");
  return(
    <>
    <div className={pieChart.chart}>
      {title ? <h1>{title}</h1> : null}
      {subtitle ? <p className={pieChart.subtitle}>{subtitle}</p>:null}
      <div className={pieChart.chart2}>
        <Pie className={pieChart.pie}  style={{width:{width},  height:{height}}} data={data} options={options} />
      </div>
      {textBottom ? <p className={pieChart.text_bottom}>{textBottom}</p> : null}
    </div>
    </>
  );
}

export default PieChart;

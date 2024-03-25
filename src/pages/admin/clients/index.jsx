import React from "react";
import BarChart from "components/charts/barChart";
import { data } from "assets/db";
import { data1 } from "assets/db";
import PieChart from "components/charts/pieChart";
import clientScss from "./clients.module.scss";
import LineGraph from "components/charts/lineGraph";
const Clients = () => {
  return (
    <>
      <div className={"container"}>
        <BarChart data={data} />
        <PieChart
          data={{
            January: "30",
            February: "40",
            March: "60",
            May: "70",
            Sebtember: "87",
          }}
          label={"mijozlar o'sishi"}
          subtitle={"hello"}
          title={"PieChart"}
          textBottom={
            "Bu bitta kompaniyaning bir yillik hisobotini korsatuvchi chart"
          }
        />
        <LineGraph
          data={[
            {
              label: "Malumot osishi",
              January: "14",
              February: "13",
              March: "60",
              May: "76",
              Sebtember: "87",
              December: "90",
            },
            {
              label: "Soqqa kopayishi",
              January: "10",
              February: "40",
              March: "34",
              May: "89",
              Sebtember: "100",
              December: "70",
            },
            {
              label: "Mahsulot kopayishi",
              January: "17",
              February: "0",
              March: "10",
              May: "70",
              Sebtember: "27",
              December: "50",
            },
          ]}
          title={"LineGraph of the company"}
          subtitle={"Bu linegraph companiyaning foydasini korsatadi"}
          textBottom={"Kompaniyaning bir yillik daromadi "}
          label={"Daromad osishi"}
        />
      </div>
    </>
  );
};

export default Clients;

import React from "react";
import BarChart from "components/charts/barChart";
import { data } from "assets/db";
import PieChart from "components/charts/pieChart";
import clientScss from "./clients.module.scss";
const Clients = () => {
  return (
    <>
      <div className={"container"}>
        <BarChart data={data} />
        <PieChart
          data={{
            January:"30",
            February:"40",
            March:"60",
            May:"70",
            Sebtember:"87",
          }}
          label={"mijozlar o'sishi"}
          subtitle={"hello"}
          title={"PieChart"}
          textBottom={
            "Bu bitta kompaniyaning bir yillik hisobotini korsatuvchi chart"
          }
        />
      </div>
    </>
  );
};

export default Clients;

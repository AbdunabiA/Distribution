import React from "react";
import BarChart from "components/charts/barChart";
import { data } from "assets/db";
import PieChart from "components/charts/pieChart";
import clientScss from './clients.module.scss'
const Clients = () => {
  const dataLabels = ["Yakshanba", "Dushanba", "seshanba", "chorshanba"];

  return (
    <>
      <div className={"container"}>
        <BarChart data={data}/>
        <PieChart
          data={data}
		  subtitle={'hello'}
		  title={'PieChart'}
		  textBottom={'Bu bitta kompaniyaning bir yillik hisobotini korsatuvchi chart'}
        />
      </div>
    </>
  );
};

export default Clients;

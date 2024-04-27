import BarChart from "components/charts/barChart";
import { data1 } from "assets/db";
import LineGraph from "components/charts/lineGraph";
const ManagerProducts = () => {
  return (
    <div>
      <BarChart
        data={[
          {
            label: "Malumot osishi",
            January: "14",
            February: "13",
            March: "60",
            May: "76",
            September: "87",
            December: "90",
          },
          {
            label: "Soqqa kopayishi",
            January: "10",
            February: "40",
            March: "34",
            May: "89",
            September: "100",
            December: "70",
          },
          {
            label: "Mahsulot kopayishi",
            January: "17",
            February: "0",
            March: "10",
            May: "70",
            September: "27",
            December: "50",
          },
          {
            label: "Ishchi kopayishi",
            January: "17",
            March: "19",
            April: "99",
            May: "23",
            September: "47",
            November: "65",
          },
          {
            label: "Ishchi kopayishi",
            January: "17",
            March: "19",
            April: "99",
            May: "23",
            September: "47",
            // November: "65",
          },
        ]}
        title={"Mahsulot osishi"}
        subtitle={"Bu bar chart mahulotning bir yillik osishini korsatadi."}
        textBottom={
          "Siz bu grafic orqali kampaniya mahsulotlari osishi hajmni korishingiz mumkin."
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
            November: "30",
            December: "50",
          },
        ]}
        title={"LineGraph of the company"}
        subtitle={"Bu linegraph companiyaning foydasini korsatadi"}
        textBottom={"Kompaniyaning bir yillik daromadi "}
        label={"Daromad osishi"}
      />
    </div>
  );
};

export default ManagerProducts;

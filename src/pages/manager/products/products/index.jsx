import { BarChart } from "components/charts/barChart";
import { data1 } from "assets/db";
import { LineGraph } from "components/charts/lineGraph";
import CustomTable from "components/table";
import { Button, Modal } from "antd";
import CreateProductCategory from "components/forms/createProductCategory";
import { useState } from "react";
const columns2 = [
  {
    key: 1,
    title: "name",
    dataIndex: "name",
  },
  {
    key: 2,
    title: "month",
    dataIndex: "month",
    sorter: (a, b) => a.month.localeCompare(b.month),
  },
  {
    key: 3,
    title: "salary",
    dataIndex: "salary",
    sorter: (a, b) => a.salary - b.salary,
  },
  {
    key: 4,
    title: "bonus",
    dataIndex: "bonus",
    sorter: (a, b) => a.bonus - b.bonus,
  },
  {
    key: 5,
    title: "jarima",
    dataIndex: "jarima",
    sorter: (a, b) => a.jarima - b.jarima,
  },
  {
    key: 6,
    title: "jami",
    dataIndex: "jami",
    sorter: (a, b) => a.jami - b.jami,
  },
];
const items2 = [
  {
    id: "1",
    name: "Mordayev Akmaljon",
    month: "Yanvar",
    salary: 2000000,
    bonus: 30000,
    jarima: 50000,
    jami: 2250000,
  },
  {
    id: "2",
    name: "Mordayev Akmaljon",
    month: "Fevral",
    salary: 3000000,
    bonus: 400000,
    jarima: 50000,
    jami: 3350000,
  },

  {
    id: "3",
    name: "Mordayev Akmaljon",
    month: "Mart",
    salary: 4000000,
    bonus: 500000,
    jarima: 50000,
    jami: 4450000,
  },
  {
    id: "4",
    name: "Mordayev Akmaljon",
    month: "Aprel",
    salary: 2000000,
    bonus: 600000,
    jarima: 50000,
    jami: 2550000,
  },
  {
    id: "5",
    name: "Mordayev Akmaljon",
    month: "May",
    salary: 2000000,
    bonus: 700000,
    jarima: 50000,
    jami: 2650000,
  },
];
const ManagerProducts = () => {
  const [categoryModal, setCategoryModal] = useState(false)
  console.log(import.meta.env.VITE_BASE_URL);
  return (
    <div className="container">
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
      <Modal destroyOnClose centered footer={false} open={categoryModal} onCancel={()=>setCategoryModal(false)}>
        <CreateProductCategory setCategoryModal={setCategoryModal}/>
      </Modal>
      <CustomTable
        {...{
          columns: columns2,
          items: items2,
          title: "Maosh to’lo’vi ",
          minHeigth: "230px",
          hasStatus: true,
          scrollY: true,
          height: 230,
          hideColumns: true,
          hasPagination: true,
          buttons:[<Button key={'category'} type="primary" onClick={()=>setCategoryModal(true)}>Kategoriya qo'shish</Button>]
        }}
      />
    </div>
  );
};

export default ManagerProducts;

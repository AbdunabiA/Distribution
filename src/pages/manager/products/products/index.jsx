import { BarChart } from "components/charts/barChart";
import { LineGraph } from "components/charts/lineGraph";
import CustomTable from "components/table";
import { Button, Modal } from "antd";
import { useState } from "react";
import { CreateProduct, CreateProductCategory } from "components/forms";
import { useGet } from "crud";
import PlusIcon from "assets/icons/PlusIcon.svg?react";

const productsColumns = [
  {
    key: 1,
    title: "Nomi",
    dataIndex: "name",
  },
  {
    key: 2,
    title: "Narxi",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    key: 3,
    title: "Status",
    dataIndex: "status",
  },
  {
    key: 4,
    title: "Kategoriya",
    dataIndex: "category",
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
  const [modal, setModal] = useState({ isOpen: false, form: null, data: null });
  const { data, isLoading } = useGet({
    url: "/products/all/",
    queryKey: ["products"],
  });
  return (
    <div className="container">
      {/* <BarChart
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
      /> */}
      {/* <LineGraph
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
      /> */}
      <Modal
        destroyOnClose
        centered
        footer={false}
        open={modal.isOpen}
        onCancel={() => setModal({ isOpen: false, form: null, data: null })}
      >
        {modal.form === "category" ? (
          <CreateProductCategory {...{ setModal, data: modal.data }} />
        ) : modal.form === "product" ? (
          <CreateProduct {...{ setModal, data: modal.data }} />
        ) : null}
      </Modal>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <CustomTable
          {...{
            columns: productsColumns,
            items: data?.data,
            title: "Mahsulotlar",
            minHeigth: "230px",
            scrollY: true,
            height: 230,
            hideColumns: true,
            hasPagination: true,
            deleteAction: () => {},
            updateAction: (data) =>
              setModal({ isOpen: true, form: "product", data: data }),
            hasDelete: true,
            hasUpdate: true,
            buttons: [
              <Button
                icon={<PlusIcon />}
                key={"category"}
                type="primary"
                onClick={() =>
                  setModal({ isOpen: true, form: "category", data: null })
                }
              >
                Kategoriya qo'shish
              </Button>,
              <Button
                icon={<PlusIcon />}
                key={"product"}
                type="primary"
                onClick={() =>
                  setModal({ isOpen: true, form: "product", data: null })
                }
              >
                Mahsulot qo'shish
              </Button>,
            ],
          }}
        />
      )}
    </div>
  );
};

export default ManagerProducts;

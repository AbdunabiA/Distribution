import CustomTable from "components/table";
import { Button, Modal } from "antd";
import { useState } from "react";
import { CreateProduct, CreateProductCategory } from "components/forms";
import { useGet, usePost } from "crud";
import PlusIcon from "assets/icons/PlusIcon.svg?react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

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

const BranchDirectorProducts = () => {
  const [modal, setModal] = useState({ isOpen: false, form: null, data: null });
  const { data, isLoading } = useGet({
    url: "/products/all/",
    queryKey: ["/products/all/"],
  });
  const queryClient = useQueryClient();
  const { mutate: deleteProduct } = usePost();
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
            deleteAction: (data) =>
              deleteProduct({
                url: `/products/${data.id}/`,
                method: "delete",
                onSuccess: () => {
                  queryClient.invalidateQueries("/products/all/");
                  toast.success("Mahsulot o'chirildi");
                },
                onError: () => toast.error("Mahsulot o'chirilmadi"),
              }),
            updateAction: (data) =>
              setModal({ isOpen: true, form: "product", data: data }),
            hasDelete: true,
            hasUpdate: true,
            onRowNavigationUrl: "/products/",
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

export default BranchDirectorProducts;

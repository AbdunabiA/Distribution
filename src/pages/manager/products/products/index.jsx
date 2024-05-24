import CustomTable from "components/table";
import { Button, Modal } from "antd";
import { useState } from "react";
import { CreateProduct, CreateProductCategory } from "components/forms";
import { useGet, usePost } from "crud";
import PlusIcon from "assets/icons/PlusIcon.svg?react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Loader from "components/loader";
const categoriesColumns = [
  {
    key: 0,
    title: "#",
    width: "70px",
    render: (a, b, i) => i + 1,
  },
  {
    key: "name",
    title: "Nomi",
    dataIndex: "name",
  },
  {
    key: "status",
    title: "Status",
    dataIndex: "status",
  },
  {
    key: "created_at",
    title: "Qo'shilgan sana",
    dataIndex: "created_at",
    render: (date) => dayjs(date).format("YYYY-MM-DD"),
  },
];

const productsColumns = [
  {
    key: 0,
    title: "#",
    width: "70px",
    render: (a, b, i) => i + 1,
  },
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
    render: (text, record) => text?.name,
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
  const { data: productsData, isLoading: productsLoading, error } = useGet({
    url: "/products/all/",
    queryKey: ["/products/all/"],
  });
  const { data: categoriesData, isLoading: categoriesLoading, err } = useGet({
    url: "/categories/",
    queryKey: ["/categories/"],
  });  
  const { mutate: deleteProduct } = usePost();
  const { mutate: deleteCategories } = usePost();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return (
    <div className="container">
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
      <CustomTable
        columns={categoriesColumns}
        items={categoriesData?.data?.results}
        height={300}
        minHeight={"200px"}
        title={`Kategoriyalar soni: ${categoriesData?.data?.results ? categoriesData?.data?.results.length : ''}`}
        hideColumns
        scrollY
        isLoading={categoriesLoading}
        hasDelete
        hasUpdate
        deleteAction={(data) =>
          deleteCategories({
            url: `category/${data.id}`,
            method: "delete",
            onSuccess: () => {
              queryClient.invalidateQueries("/categories/");
              toast.success("Kategoriya o'chirildi");
            },
            onError: () => toast.error("Kategoriya o'chirilmadi"),
          })
        }
        updateAction={(data) =>
          setModal({ isOpen: true, form: "category", data: data })
        }
        buttons={[
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
        ]}
      />
      <div style={{ marginTop: "20px" }}>
        <CustomTable
          {...{
            isLoading: productsLoading,
            columns: productsColumns,
            height: 300,
            minHeight: "200px",
            scrollY: true,
            items: productsData?.data?.results,
            title: `Mahsulotlar soni : ${productsData?.data?.results ? productsData?.data?.results.length : ''}`,
            hideColumns: true,
            deleteAction: (data) =>
              deleteProduct({
                url: `/products/${data.id}/`,
                method: "delete",
                onSuccess: () => {
                  queryClient.invalidateQueries("/products/all/");
                  toast.success("Mahsulot o'chirildi");
                },
                onError: (err) => toast.error(err.message),
              }),
            updateAction: (data) =>
              setModal({ isOpen: true, form: "product", data: data }),
            hasDelete: true,
            hasUpdate: true,
            onRowNavigationUrl: "/products/",
            buttons: [
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
      </div>
    </div>
  );
};

export default ManagerProducts;

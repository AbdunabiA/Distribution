import CustomTable from "components/table";
import { Button, Modal } from "antd";
import { useState } from "react";
import { CreateProduct, CreateProductCategory } from "components/forms";
import { useGet, usePost } from "crud";
import PlusIcon from "assets/icons/PlusIcon.svg?react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

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

const OperatorProducts = () => {
  const [modal, setModal] = useState({ isOpen: false, form: null, data: null });
  const { data: productsData, isLoading: productsLoading } = useGet({
    url: "/products/all/",
    queryKey: ["/products/all/"],
  });
  const { data: categoriesData, isLoading: categoriesLoading } = useGet({
    url: "/categories/",
    queryKey: ["/categories/"],
  });
  const { mutate: deleteProduct } = usePost();
  const { mutate: deleteCategories } = usePost();
  const queryClient = useQueryClient();
  console.log(productsData);
  return (
    <div className="container">
      <div style={{ marginTop: "20px" }}>
        <CustomTable
          {...{
            isLoading: productsLoading,
            columns: productsColumns,
            height: 300,
            minHeight: "200px",
            scrollY: true,
            items: productsData?.data,
            title: `Mahsulotlar soni : ${productsData?.data.length}`,
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
          }}
        />
      </div>
    </div>
  );
};

export default OperatorProducts
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

const SupervisorProducts = () => {
  const [modal, setModal] = useState({ isOpen: false, form: null, data: null });
  const { data: productsData, isLoading: productsLoading } = useGet({
    url: "/products/all/",
    queryKey: ["/products/all/"],
  });
  const { mutate: deleteProduct } = usePost();
  const queryClient = useQueryClient();
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
            onRowNavigationUrl: "/products/",
          }}
        />
      </div>
    </div>
  );
};

export default SupervisorProducts;

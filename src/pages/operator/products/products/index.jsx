import CustomTable from "components/table";
import { Button, Modal } from "antd";
import { useState } from "react";
import { CreateProduct, CreateProductCategory } from "components/forms";
import { useGet, usePost } from "crud";
import PlusIcon from "assets/icons/PlusIcon.svg?react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const productsColumns = [
  {
    key: "product",
    title: "Nomi",
    dataIndex: "product",
    render: (text, record) => text?.name,
  },
  {
    key: "amount",
    title: "Miqdori",
    dataIndex: "amount",
  },
  {
    key: "invalids_amount",
    title: "Yaroqsiz miqdori",
    dataIndex: "invalids_amount",
  },
  {
    key: "category",
    title: "Kategoriya",
    dataIndex: "product",
    render: (text, record) => text?.category?.name,
  },
  {
    key: "price",
    title: "1/Narxi",
    dataIndex: "product",
    render: (text, record) => text?.price,
  },
  {
    key: "warehouse",
    title: "Filial",
    dataIndex: "warehouse",
    render: (text, record) => text?.name,
  },
];

const OperatorProducts = () => {
  const { data: userData } = useSelector((state) => state.auth);
  const { data: productsData, isLoading: productsLoading } = useGet({
    url: `/warehouses/${userData?.warehouse?.id}/products/`,
    queryKey: [`/warehouses/${userData?.warehouse?.id}/products/`],
  });
  console.log(productsData?.data);
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
            title: `Mahsulotlar soni : ${productsData?.data?.length}`,
            hideColumns: true,
            // deleteAction: (data) =>
            //   deleteProduct({
            //     url: `/products/${data.id}/`,
            //     method: "delete",
            //     onSuccess: () => {
            //       queryClient.invalidateQueries("/products/all/");
            //       toast.success("Mahsulot o'chirildi");
            //     },
            //     onError: () => toast.error("Mahsulot o'chirilmadi"),
            //   }),
            // updateAction: (data) =>
            //   setModal({ isOpen: true, data: data }),
            // hasDelete: true,
            // hasUpdate: true,
            // onRowNavigationUrl: "/products/",
          }}
        />
      </div>
    </div>
  );
};

export default OperatorProducts;

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
    dataIndex: "product",
    render: (text, record) => text?.name,
  },
  {
    key: 2,
    title: "Narxi",
    dataIndex: "product",
    render: (text, record) => text?.price,
    sorter: (a, b) => a.price - b.price,
  },
  {
    key: 3,
    title: "Miqdori",
    dataIndex: "amount",
  },
  {
    key: 4,
    title: "Yroqsizlar miqdori",
    dataIndex: "invalids_amount",
  },
  {
    key: 5,
    title: "Kategoriya",
    dataIndex: "product",
    render: (text, record) => text?.category?.name,
  },
];

const BranchDirectorProducts = () => {
  const [modal, setModal] = useState({ isOpen: false, data: null });
  const { data: userData } = useSelector((state) => state?.auth);
  const { data: productsData, isLoading: productsLoading } = useGet({
    url: `/warehouses/${userData?.warehouse?.id}/products/`,
    queryKey: ["/warehouses/", userData?.warehouse?.id, "/products/"],
  });
  const { mutate: deleteProduct } = usePost();
  const queryClient = useQueryClient();
  console.log(productsData?.data);
  return (
    <div className="container">
      <Modal
        destroyOnClose
        centered
        footer={false}
        open={modal.isOpen}
        onCancel={() => setModal({ isOpen: false, data: null })}
      >
        <CreateProduct {...{ setModal, data: modal.data }} />
      </Modal>
      <div style={{ marginTop: "20px" }}>
        <CustomTable
          {...{
            isLoading: productsLoading,
            columns: productsColumns,
            height: 300,
            minHeight: "200px",
            scrollY: true,
            items: productsData?.data?.results,
            title: `Mahsulotlar soni : ${productsData?.data?.results.length}`,
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
            // updateAction: (data) => setModal({ isOpen: true, data: data }),
            // hasDelete: true,
            // hasUpdate: true,
          }}
        />
      </div>
    </div>
  );
};

export default BranchDirectorProducts;

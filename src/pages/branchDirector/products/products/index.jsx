import CustomTable from "components/table";
import { Button, Modal } from "antd";
import { useState } from "react";
import { CreateProduct, CreateProductCategory, SetInvalidProducts } from "components/forms";
import { useGet, usePost } from "crud";
import PlusIcon from "assets/icons/PlusIcon.svg?react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { formatNums } from "services/formatNums";
import { useLocation } from "react-router-dom";
import qs from 'qs'
import { get } from "lodash";


const BranchDirectorProducts = () => {
    const location = useLocation();
    const params = qs.parse(location.search, { ignoreQueryPrefix: true });
    const [invalidsModal, setInvalidsModal] = useState({
      isOpen: false,
      data: null,
    });
  const [modal, setModal] = useState({ isOpen: false, data: null });
  const { data: userData } = useSelector((state) => state?.auth);
  const { data: productsData, isLoading: productsLoading } = useGet({
    url: `/warehouses/${userData?.warehouse?.id}/products/`,
    queryKey: ["/warehouses/", userData?.warehouse?.id, "/products/"],
    params: { page: +get(params, "page", 1) },
  });
  const { mutate: deleteProduct } = usePost();
  const queryClient = useQueryClient();
  console.log(productsData?.data?.results);
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
       width: "120px",
       render: (data) => formatNums(data),
     },
     {
       key: "invalids_amount",
       title: "Yaroqsiz",
       dataIndex: "invalids_amount",
       width: "100px",
       render: (data) => formatNums(data),
     },
     {
       key: "category",
       title: "Kategoriya",
       dataIndex: "product",
       width: "150px",
       render: (text, record) => text?.category?.name,
     },
     {
       key: "price",
       title: "1/Narxi",
       dataIndex: "product",
       render: (data) => formatNums(data?.price),
     },
     {
       key: "total_sum",
       title: "Jami narxi",
       dataIndex: "total_sum",
       width:"150px",
       render: (data) => formatNums(data),
     },
     {
       key: "warehouse",
       title: "Filial",
       dataIndex: "warehouse",
       render: (text, record) => text?.name,
     },
     {
       key: "Action",
       title: "Action",
       render: (data, rec) => (
         <Button
           type="primary"
           onClick={(e) => {
             e.stopPropagation();
             console.log("rec", rec);
             setInvalidsModal({ isOpen: true, data: rec });
           }}
         >
           Yaroqsizga chiqarish
         </Button>
       ),
     },
   ];
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
            hasPagination: true,
            meta: { total: productsData?.data?.count },
            isLoading: productsLoading,
            columns: productsColumns,
            height: 300,
            minHeight: "200px",
            scrollY: true,
            items: productsData?.data?.results,
            title: `Mahsulotlar soni : ${productsData?.data?.count}`,
            hideColumns: true,
          }}
        />
        <Modal
          open={invalidsModal.isOpen}
          destroyOnClose
          centered
          footer={false}
          onCancel={() => setInvalidsModal({ isOpen: false, data: null })}
        >
          <SetInvalidProducts
            data={invalidsModal?.data}
            setModal={setInvalidsModal}
            invalidateQuery={`/warehouses/${userData?.warehouse?.id}/products/`}
          />
        </Modal>
      </div>
    </div>
  );
};

export default BranchDirectorProducts;

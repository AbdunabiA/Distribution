import { useQueryClient } from "@tanstack/react-query";
import { Button, Modal } from "antd";
import { CreateOrder } from "components/forms";
import Loader from "components/loader";
import CustomTable from "components/table";
import { usePost } from "crud";
import { GetAll } from "modules";
import { useState } from "react";
import { toast } from "sonner";
import PlusIcon from "assets/icons/PlusIcon.svg?react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const columns = [
  {
    key: "product",
    title: "Mahsulot",
    dataIndex: "product",
    render: (text, record) => <span>{record?.product?.product?.name}</span>,
  },
  {
    key: "amount",
    title: "Miqdori",
    dataIndex: "amount",
  },
  {
    key: "total_price",
    title: "Umumiy narxi",
    dataIndex: "total_price",
  },
  {
    key: "deadline",
    title: "Deadline",
    dataIndex: "deadline",
    render: (text) => dayjs(text).format("DD/MM/YYYY"),
  },
  {
    key: "driver",
    title: "Yetkazib beruvchi",
    dataIndex: "driver",
    render: (text, record) => text?.first_name + " " + text?.last_name,
  },
  {
    key: "customer",
    title: "Mijoz",
    dataIndex: "customer",
    render: (text, record) => text?.name,
  },
  {
    key: "operator",
    title: "Operator",
    dataIndex: "operator",
    render: (text, record) => text?.first_name + " " + text?.last_name,
  },
  {
    key: "status",
    title: "Status",
    dataIndex: "status",
  },
];

const BranchDirectorOrders = () => {
  const [orderModal, setOrderModal] = useState({ isOpen: false, data: null });
  const { data: userData } = useSelector((state) => state.auth);

  return (
    <GetAll
      url={`/warehouses/${userData?.warehouse?.id}/orders/`}
      queryKey={[`/warehouses/${userData?.warehouse?.id}/orders/`]}
    >
      {({ data, isLoading, isError, error }) => {
        if (isLoading) return <Loader />;
        if (isError) return <h1>{error.message}</h1>;

        console.log(data?.data);
        return (
          <div className="container">
            <Modal
              open={orderModal.isOpen}
              centered
              destroyOnClose
              onCancel={() => setOrderModal({ isOpen: false, data: null })}
              footer={false}
            >
              <CreateOrder data={orderModal.data} setModal={setOrderModal} />
            </Modal>
            <CustomTable
              title={`Buyurtmalar: ${data?.data?.results.length} ta`}
              columns={columns}
              // hasDelete
              // hasUpdate
              minHeight={"200px"}
              height={"300px"}
              scrollY
              // updateAction={(data) => setOrderModal({ isOpen: true, data })}
              // deleteAction={(data) => {
              //   orderDelete({
              //     url: `/orders/${data?.id}/details`,
              //     method: "delete",
              //     onSuccess: () => {
              //       toast.success("Buyurtma o'chirildi");
              //       queryClient.invalidateQueries("/orders/all/");
              //     },
              //     onError: (error) => {
              //       toast.error(error.message);
              //     },
              //   });
              // }}
              hideColumns
              items={data?.data?.results}
              buttons={[
                <Button
                  icon={<PlusIcon />}
                  type="primary"
                  onClick={() => setOrderModal({ isOpen: true, data: null })}
                  key={"1"}
                >
                  Buyurtma qo'shish
                </Button>,
              ]}
            />
          </div>
        );
      }}
    </GetAll>
  );
};

export default BranchDirectorOrders;

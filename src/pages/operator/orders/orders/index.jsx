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
import { formatNums } from "services/formatNums";

const columns = [
  {
    key: "operator",
    title: "Operator",
    dataIndex: "operator",
    render: (data) => data?.first_name + " " + data?.last_name,
  },
  {
    key: "customer",
    title: "Mijoz",
    dataIndex: "customer",
    render: (data) => data?.name,
  },
  {
    key: "driver",
    title: "Yetkazib beruvchi",
    dataIndex: "driver",
    render: (data) => data?.first_name + " " + data?.last_name,
  },
  {
    key: "warehouse",
    title: "Filial",
    dataIndex: "warehouse",
    render: (data) => data?.name,
  },
  {
    key: "comment",
    title: "Comment",
    dataIndex: "comment",
  },
  {
    key: "deadline",
    title: "Deadline",
    dataIndex: "deadline",
    render: (data) => dayjs(data).format("DD-MM-YYYY"),
  },
  {
    key: "discount",
    title: "Chegirma",
    dataIndex: "discount",
    render: (data) => formatNums(data),
  },
  {
    key: "sum",
    title: "Jami narxi",
    dataIndex: "sum",
    render: (data) => formatNums(data),
  },
  {
    key: "final_price",
    title: "Yakuniy narx",
    dataIndex: "final_price",
    render: (data) => formatNums(data),
  },
  {
    key: "status",
    title: "Status",
    dataIndex: "status",
  },
];

const OperatorOrders = () => {
  const [orderModal, setOrderModal] = useState({ isOpen: false, data: null });
  const { data: userData } = useSelector((state) => state.auth);
  const { mutate: orderDelete } = usePost();
  const queryClient = useQueryClient();

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
              title={`Buyurtmalar: ${data?.data?.count} ta`}
              columns={columns}
              hasDelete
              hasUpdate
              updateAction={(data) => setOrderModal({ isOpen: true, data:{...data, deadline:dayjs(data?.deadline).format('YYYY-MM-DD')} })}
              deleteAction={(data) => {
                orderDelete({
                  url: `/orders/${data?.id}/details`,
                  method: "delete",
                  onSuccess: () => {
                    toast.success("Buyurtma o'chirildi");
                    queryClient.invalidateQueries("/orders/all/");
                  },
                  onError: (error) => {
                    toast.error(error.message);
                  },
                });
              }}
              hideColumns
              items={data?.data?.results}
              minHeight={"200px"}
              height={"300px"}
              scrollY
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
export default OperatorOrders;

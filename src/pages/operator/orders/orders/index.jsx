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
import { useLocation } from "react-router-dom";
import qs from "qs";
import { get } from "lodash";

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
  const location = useLocation();
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const [orderModal, setOrderModal] = useState({ isOpen: false, data: null });
  const { data: userData } = useSelector((state) => state.auth);
  const { mutate: orderDelete } = usePost();
  const queryClient = useQueryClient();

  return (
    <GetAll
      url={`/warehouses/${userData?.warehouse?.id}/orders/`}
      queryKey={[`/warehouses/${userData?.warehouse?.id}/orders/`]}
      params={{ page: +get(params, "page", 1) }}
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
              hasPagination
              meta={{ total: data?.data?.count }}
              title={`Buyurtmalar: ${data?.data?.count} ta`}
              columns={columns}
              hasDelete
              hasUpdate
              updateAction={(data) =>
                setOrderModal({
                  isOpen: true,
                  data: {
                    ...data,
                    deadline: dayjs(data?.deadline).format("YYYY-MM-DD"),
                  },
                })
              }
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
                  onClick={() => {
                    const today = dayjs();

                    // Add one day to get tomorrow's date
                    const tomorrow = today.add(1, "day");

                    // Format the date as needed (optional)
                    const formattedTomorrow = tomorrow.format("YYYY-MM-DD");
                    console.log("DEADLINE: " + formattedTomorrow);
                    setOrderModal({
                      isOpen: true,
                      data: {
                        operator: { id: userData?.id },
                        deadline: formattedTomorrow,
                      },
                    });
                  }}
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

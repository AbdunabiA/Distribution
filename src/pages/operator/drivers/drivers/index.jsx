import { Button, Modal } from "antd";
import DateFilter from "components/dateFilter";
import CustomTable from "components/table";
import { GetAll } from "modules";
import PlusIcon from "assets/icons/PlusIcon.svg?react";
import Loader from "components/loader";
import { useQueryClient } from "@tanstack/react-query";
import { usePost } from "crud";
import { toast } from "sonner";
import { useState } from "react";
import { CreateOrder } from "components/forms";



const OperatorDrivers = () => {
  const queryClient = useQueryClient();
  const [orderModal, setOrderModal] = useState({isOpen:false, data:null})
  const { mutate: deleteUsers } = usePost();
  const employeeColumns = [
  {
    key: 0,
    title: "#",
    width: "70px",
    render: (a, b, i) => i + 1,
  },
  {
    key: "name",
    title: "Ism",
    render: (_, row) => `${row.first_name + " " + row.last_name}`,
  },
  {
    key: "username",
    title: "Username",
    dataIndex: "username",
  },
  {
    key: "status",
    title: "Status",
    dataIndex: "status",
  },
  {
    key: "role",
    title: "Role",
    dataIndex: "role",
  },
  {
    key: "number",
    title: "Tel raqam",
    dataIndex: "phone_number",
  },
  {
    key: "warehouse",
    title: "Filial",
    dataIndex: "warehouse",
    render: (text) => text?.name,
  },
  {
    key: "addOrder",
    title: "Buyurtma qo'shish",
    render: (_, row) => <Button type="primary" onClick={(e) => {
      e.stopPropagation();
      setOrderModal({ isOpen: true, data: {driver:row} })}}>Buyurtma qo'shish</Button>,
  },
];
  return (
    <GetAll
      queryKey={["/users/drivers/"]}
      url={"/users/all/"}
      params={{ extra: { role: "driver" } }}
    >
      {({ data, isLoading, isError, error }) => {
        if (isLoading) return <Loader />;
        if (isError) return <h1>Error</h1>;
        console.log(data);
        return (
          <div className="container">
            <div style={{ marginTop: "20px" }}>
              <Modal
                open={orderModal.isOpen}
                destroyOnClose
                centered
                footer={false}
                onCancel={() => setOrderModal({ isOpen: false, data: null })}
              >
                <CreateOrder data={orderModal.data} setModal={setOrderModal} />
              </Modal>
              <CustomTable
                columns={employeeColumns}
                items={data?.data}
                title={`Xodimlar soni: ${data?.data.length}`}
                hideColumns
                height={300}
                minHeight={"200px"}
                scrollY
                scrollX
                hasDelete
                hasUpdate
                deleteAction={(data) =>
                  deleteUsers({
                    url: `/users/details/${data?.id}/`,
                    method: "delete",
                    onSuccess: () => {
                      toast.success("Foydalanuvchi o'chirildi");
                      queryClient.invalidateQueries(["/users/all/"]);
                    },
                    onError: (err) => toast.error(err?.message),
                  })
                }
                updateAction={(data) =>
                  setUserModal({ isOpen: true, data: data })
                }
                onRowNavigationUrl={"/employee/"}
                isLoading={isLoading}
              />
            </div>
          </div>
        );
      }}
    </GetAll>
  );
};

export default OperatorDrivers;

import { Button, Modal } from "antd";
import DateFilter from "components/dateFilter";
import CustomTable from "components/table";
import { GetAll } from "modules";
import PlusIcon from "assets/icons/PlusIcon.svg?react";
import { useState } from "react";
import { CreateCar, CreateTask, CreateUserForm } from "components/forms";
import Loader from "components/loader";
import { useQueryClient } from "@tanstack/react-query";
import { usePost } from "crud";
import { toast } from "sonner";

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
];

const ManagerEmployees = () => {
  const [userModal, setUserModal] = useState({ isOpen: false, data: null });
  const [carModal, setCarModal] = useState({ isOpen: false, data: null });
  const queryClient = useQueryClient();
  const { mutate: deleteUsers } = usePost();
  return (
    <GetAll
      queryKey={["/users/all/"]}
      url={"/users/all/"}
      // params={{ extra: { role: "agent" } }}
    >
      {({ data, isLoading, isError, error }) => {
        if (isLoading) return <Loader />;
        if (isError) return <h1>Error</h1>;
        console.log(data);
        return (
          <div className="container">
            <DateFilter />
            <Modal
              open={userModal.isOpen}
              destroyOnClose
              centered
              footer={false}
              onCancel={() => setUserModal({ isOpen: false, data: null })}
            >
              <CreateUserForm
                {...{ setModal: setUserModal, data: userModal.data }}
              />
            </Modal>
            <Modal
              open={carModal.isOpen}
              destroyOnClose
              centered
              footer={false}
              onCancel={() => setCarModal({ isOpen: false, data: null })}
            >
              <CreateCar {...{ setModal: setCarModal, data: carModal.data }} />
            </Modal>
            <div style={{ marginTop: "20px" }}>
              <CustomTable
                columns={employeeColumns}
                items={data?.data}
                title={`Xodimlar soni: ${data?.data.length}`}
                hideColumns
                height={300}
                minHeight={"200px"}
                scrollY
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
                buttons={[
                  <Button
                    icon={<PlusIcon />}
                    type="primary"
                    key={"1"}
                    onClick={() => setCarModal({ isOpen: true, data: null })}
                  >
                    Mashina qo'shish
                  </Button>,
                  <Button
                    icon={<PlusIcon />}
                    type="primary"
                    key={"2"}
                    onClick={() => setUserModal({ isOpen: true, data: null })}
                  >
                    Xodim qo'shish
                  </Button>,
                ]}
              />
            </div>
          </div>
        );
      }}
    </GetAll>
  );
};

export default ManagerEmployees;

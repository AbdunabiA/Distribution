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
import { useSelector } from "react-redux";

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

const BarnchDirectorEmployees = () => {
  const [userModal, setUserModal] = useState({ isOpen: false, data: null });
  const [carModal, setCarModal] = useState({ isOpen: false, data: null });
  const {data:userData} = useSelector(state=>state.auth)
  const queryClient = useQueryClient();
  const { mutate: deleteUsers } = usePost();
  return (
    <GetAll
      queryKey={[`/warehouses/${userData?.warehouse?.id}/employees/`]}
      url={`/warehouses/${userData?.warehouse?.id}/employees/`}
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
                items={data?.data?.results}
                title={`Xodimlar soni: ${data?.data.length}`}
                hideColumns
                height={300}
                minHeight={"200px"}
                scrollY
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

export default BarnchDirectorEmployees;

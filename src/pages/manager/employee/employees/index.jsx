import { Button, Modal } from "antd";
import DateFilter from "components/dateFilter";
import CustomTable from "components/table";
import { GetAll } from "modules";
import PlusIcon from "assets/icons/PlusIcon.svg?react";
import { useState } from "react";
import { CreateCar, CreateUserForm } from "components/forms";
import { useNavigate } from "react-router-dom";

const employeeColumns = [
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
];

const ManagerEmployees = () => {
  const [userModal, setUserModal] = useState({ isOpen: false, data: null });
  const [carModal, setCarModal] = useState({ isOpen: false, data:null})
  const navigate = useNavigate();
  // const {mutation} = usePost({url:""})
  return (
    <GetAll
      queryKey={["/users/all/"]}
      url={"/users/all/"}
      // params={{ extra: { role: "agent" } }}
    >
      {({ data, isLoading, isError, error }) => {
        if (isLoading) return <h1>Loading...</h1>;
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
              <CreateCar
                {...{ setModal: setCarModal, data: carModal.data }}
              />
            </Modal>
            <div style={{ marginTop: "20px" }}>
              <CustomTable
                columns={employeeColumns}
                title={"Xodimlar"}
                hideColumns
                hasDelete
                hasUpdate
                onRow={(data, index) => ({
                  onClick: () => navigate(`/employee/${data.id}`),
                  style: { cursor: "pointer" },
                })}
                isLoading={isLoading}
                items={data?.data}
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

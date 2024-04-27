import { Button, Modal } from "antd";
import DateFilter from "components/dateFilter";
import CustomTable from "components/table";
import { GetAll } from "modules";
import PlusIcon from "assets/icons/PlusIcon.svg?react";
import { useState } from "react";
import { CreateUserForm } from "components/forms";
import { usePost } from "crud";
import { render } from "react-dom";


const employeeColumns = [
  {
    key: "name",
    title: "Ism",
    render:(_, row) => `${row.first_name + row.last_name}`
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

const ManagerEmployee = () => {
  const [modal, setModal] = useState({ isOpen: false, data: null });
  // const {mutation} = usePost({url:""})
  return (
    <GetAll queryKey={["/users/all/"]} url={"/users/all/"}>
      {({ data, isLoading, isError, error }) => {
        if (isLoading) return <h1>Loading...</h1>;
        if (isError) return <h1>Error</h1>;
        console.log(data);
        return (
          <div className="container">
            <DateFilter />
            <Modal
              open={modal.isOpen}
              destroyOnClose
              centered
              footer={false}
              onCancel={() => setModal({ isOpen: false, data: null })}
            >
              <CreateUserForm {...{ setModal, data: modal.data }} />
            </Modal>
            <div style={{ marginTop: "20px" }}>
              <CustomTable
                columns={employeeColumns}
                title={"Xodimlar"}
                hasPagination
                hasDelete
                hasUpdate
                isLoading={isLoading}
                items={data?.data}
                buttons={[
                  <Button
                    icon={<PlusIcon />}
                    type="primary"
                    key={"1"}
                    onClick={() => setModal({ isOpen: true, data: null })}
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

export default ManagerEmployee;

import { Modal } from "antd";
import DateFilter from "components/dateFilter";
import { CreateUserForm } from "components/forms";
import Loader from "components/loader";
import CustomTable from "components/table";
import { GetAll } from "modules";
import { useState } from "react";
import { useParams } from "react-router-dom";

const usersColumns = [
  {
    key: "name",
    title: "Ism",
    render: (_, data) => data?.first_name + " " + data.last_name,
  },
  {
    key: "phone",
    title: "Tel. raqam",
    dataIndex: "phone_number",
  },
  {
    key: "role",
    title: "Lavozimi",
    dataIndex: "role",
  },
];

const ManagerBranchEmployees = () => {
  const { branchId } = useParams();
  const [userModal, setUserModal] = useState({ isOpen: false, data: null });
  return (
    <GetAll
      url={`/warehouses/${branchId}/employees`}
      queryKey={["branchEmployees"]}
    >
      {({ data, isLoading, isError, error }) => {
        if (isLoading) return <Loader />;
        if (isError) return <h1>{error.message}</h1>;
        console.log(data?.data);
        return (
          <div className="container">
            <DateFilter />
            <Modal
              open={userModal.isOpen}
              centered
              destroyOnClose
              footer={false}
              onCancel={() => setUserModal({ isOpen: false, data: null })}
            >
              <CreateUserForm
                invalidateQueries="branchEmployees"
                data={userModal?.data}
                setModal={setUserModal}
              />
            </Modal>
            <div style={{ marginTop: "20px" }}>
              <CustomTable
                columns={usersColumns}
                items={data?.data}
                hideColumns
                title={"Filial xodimlari"}
                hasUpdate
                updateAction={(data) =>
                  setUserModal({ isOpen: true, data: data })
                }
              />
            </div>
          </div>
        );
      }}
    </GetAll>
  );
};

export default ManagerBranchEmployees;

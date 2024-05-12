import { useQueryClient } from "@tanstack/react-query";
import { Modal } from "antd";
import DateFilter from "components/dateFilter";
import { CreateUserForm } from "components/forms";
import Loader from "components/loader";
import CustomTable from "components/table";
import { usePost } from "crud";
import { GetAll } from "modules";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

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
  const { mutate: deleteUsers } = usePost();
  const queryClient = useQueryClient();
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
                hasDelete
                deleteAction={(data) =>
                  deleteUsers({
                    url: `/users/details/${data?.id}/`,
                    method: "delete",
                    onSuccess: () => {
                      toast.success("Foydalanuvchi o'chirildi");
                      queryClient.invalidateQueries("branchEmployees");
                    },
                    onError: (err) => toast.error(err?.message),
                  })
                }
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

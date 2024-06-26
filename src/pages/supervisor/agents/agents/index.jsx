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
import { CreateOrder, CreateTask } from "components/forms";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import qs from 'qs'
import { get } from "lodash";

const SupervisorAgents = () => {
    const location = useLocation();
    const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const queryClient = useQueryClient();
  const { data: userData } = useSelector((state) => state.auth);
  const [taskModal, setTaskModal] = useState({ isOpen: false, data: null });
  const { mutate: deleteUsers } = usePost();
  // console.log(userData);
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
      title: "Topshiriq qo'shish",
      render: (_, row) => (
        <Button
          type="primary"
          onClick={(e) => {
            e.stopPropagation();
            setTaskModal({
              isOpen: true,
              data: { task_executors: [row], role: "agent" },
            });
          }}
        >
          Add
        </Button>
      ),
    },
  ];
  return (
    <GetAll
      queryKey={["/users/all/"]}
      url={"/users/all/"}
      params={{
        extra: {
          role: "agent",
          warehouse_id: userData?.warehouse?.id,
        },
        page: +get(params, 'page', 1)
      }}
    >
      {({ data, isLoading, isError, error }) => {
        if (isLoading) return <Loader />;
        if (isError) return <h1>Error</h1>;
        console.log(data);
        return (
          <div className="container">
            <div style={{ marginTop: "20px" }}>
              <Modal
                open={taskModal.isOpen}
                destroyOnClose
                centered
                footer={false}
                onCancel={() => setTaskModal({ isOpen: false, data: null })}
              >
                <CreateTask data={taskModal.data} setModal={setTaskModal} />
              </Modal>
              <CustomTable
                columns={employeeColumns}
                items={data?.data?.results}
                title={`Agentlar soni: ${data?.data?.count}`}
                hideColumns
                height={300}
                minHeight={"200px"}
                scrollY
                scrollX
                meta={{total: data?.data?.count}}
                hasPagination
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
                onRowNavigationUrl={"/agents/"}
                isLoading={isLoading}
              />
            </div>
          </div>
        );
      }}
    </GetAll>
  );
};

export default SupervisorAgents;

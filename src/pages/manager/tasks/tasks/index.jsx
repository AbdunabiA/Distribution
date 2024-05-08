import { useState } from "react";
import DateFilter from "components/dateFilter";
import { LineGraph } from "components/charts";
import CustomTable from "components/table";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { data } from "assets/db";
import { useQueryClient } from "@tanstack/react-query";
import { useGet, usePost } from "crud";
import { toast } from "sonner";
import { CreateTask } from "components/forms/createTask";
import PlusIcon from "assets/icons/PlusIcon.svg?react";
import { useSelector } from "react-redux";
const columns = [
  {
    key: 1,
    title: "Task",
    dataIndex: "text",
    sorter: (a, b) => a.text.localeCompare(b.text),
  },
  {
    key: 2,
    title: "Berilgan sana",
    dataIndex: "created_at",
    sorter: (a, b) => a.created_at.localeCompare(b.created_at),
  },
  {
    key: 3,
    title: "Deadline",
    dataIndex: "deadline",
    sorter: (a, b) => a.deadline - b.deadline,
  },
  {
    key: 4,
    title: "status",
    dataIndex: "status",
    sorter: (a, b) => a.status - b.status,
  },
];
const ManagerTasks = () => {
  const [modal, setModal] = useState({ isOpen: false, form: null, data: null });
  const [dateValue, setDateValue] = useState("");
  const { data: userData } = useSelector((state) => state.auth);
  let id = userData.id;
  let role = userData.role;
  const onChange = (value) => {
    setDateValue(value);
    console.log(dateValue);
  };
  const { data: taskData, isLoading: tasksLoading } = useGet({
    url: "/tasks/all/",
    queryKey: ["/tasks/all/"],
  });

  const { data: berilganTaskData, isLoading: berilganTasksLoading } = useGet({
    url: `/users/bergan_tasklari/${id}`,
    queryKey: [`/users/bergan_tasklari/${id}`],
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: deleteClient } = usePost();
  return (
    <div className="container">
      <div style={{ margin: "32px 10px" }}>
        <DateFilter onChange={onchange} value={dateValue} />
      </div>
      <Modal
        destroyOnClose
        centered
        footer={false}
        open={modal.isOpen}
        onCancel={() => setModal({ isOpen: false, form: null, data: null })}
      >
        {modal.form === "task" ? (
          <CreateTask {...{ setModal, data: modal.data }} />
        ) : null}
      </Modal>
      {tasksLoading || berilganTasksLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <CustomTable
            {...{
              columns: columns,
              items: berilganTaskData?.data,
              hasDelete: true,
              hasUpdate: true,
              title: `${role} bergan topshiriqlar: ${berilganTaskData?.data.length}`,
              minHeigth: "230px",
              // onRowNavigationUrl: `/clients/`,
              hideColumns: true,
              // deleteAction: (data) =>
              // deleteClient({
              //   url: `/customers/${data.id}/detail`,
              //   method: "delete",
              //   onSuccess: () => {
              //     queryClient.invalidateQueries("/customers/all/");
              //     toast.success("Client o'chirildi");
              //   },
              //   onError: () => toast.error("Client o'chirilmadi"),
              // }),
              // updateAction: (data) =>
              //   setModal({ isOpen: true, form: "client", data: data }),
              // scrollY: true,
              // hasPagination: true,
              buttons: [
                <Button
                  icon={<PlusIcon />}
                  type="primary"
                  key={"task"}
                  onClick={() =>
                    setModal({ isOpen: true, form: "task", data: null })
                  }
                  // onClick={() =>
                  //   setModal({ isOpen: true, form: "client", data: null })
                  // }
                >
                  Topshiriq qo'shish
                </Button>,
              ],
            }}
          />
          <div style={{ marginTop: "40px" }}>
            <CustomTable
              {...{
                columns: columns,
                items: taskData?.data,
                // hasDelete: true,
                // hasUpdate: true,
                title: `Topshiriqlar soni : ${taskData?.data.length}`,
                minHeigth: "230px",
                // onRowNavigationUrl: `/clients/`,
                hideColumns: true,
                // deleteAction: (data) =>
                // deleteClient({
                //   url: `/customers/${data.id}/detail`,
                //   method: "delete",
                //   onSuccess: () => {
                //     queryClient.invalidateQueries("/customers/all/");
                //     toast.success("Client o'chirildi");
                //   },
                //   onError: () => toast.error("Client o'chirilmadi"),
                // }),
                // updateAction: (data) =>
                //   setModal({ isOpen: true, form: "client", data: data }),
                scrollY: true,
                height:250,
                // hasPagination: true,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerTasks;

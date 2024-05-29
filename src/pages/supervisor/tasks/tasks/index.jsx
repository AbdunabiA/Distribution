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
    key: 0,
    title: "#",
    width: "70px",
    render: (a, b, i) => i + 1,
  },
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

const SupervisorTasks = () => {
  const [modal, setModal] = useState({ isOpen: false, data: null });
  const { data: userData } = useSelector((state) => state.auth);
  let id = userData.id;
  // const { data: taskData, isLoading: tasksLoading } = useGet({
  //   url: "/tasks/all/",
  //   queryKey: ["/tasks/all/"],
  // });

  const { data: berilganTaskData, isLoading: berilganTasksLoading } = useGet({
    url: `/users/bergan_tasklari/${id}`,
    queryKey: [`/users/bergan_tasklari/${id}`],
  });

  const queryClient = useQueryClient();
  const { mutate: deleteTask } = usePost();
  return (
    <div className="container">
      {/* <div style={{ margin: "32px 10px" }}>
        <DateFilter onChange={onchange} value={dateValue} />
      </div> */}
      <Modal
        destroyOnClose
        centered
        footer={false}
        open={modal.isOpen}
        onCancel={() => setModal({ isOpen: false, data: null })}
      >
        <CreateTask {...{ setModal, data: modal.data }} />
      </Modal>
      <div>
        <CustomTable
          {...{
            columns: columns,
            items: berilganTaskData?.data?.results,
            isLoading: berilganTasksLoading,
            hasDelete: true,
            hasUpdate: true,
            title: `${userData?.first_name} bergan topshiriqlar: ${berilganTaskData?.data?.count}`,
            minHeigth: "230px",
            // onRowNavigationUrl: `/clients/`,
            hideColumns: true,
            deleteAction: (data) => {
              deleteTask({
                url: `/tasks/${data?.id}/delete/`,
                method: "delete",
                onSuccess: () => {
                  queryClient.invalidateQueries([
                    `/users/bergan_tasklari/${id}`,
                  ]);
                  toast.success("Topshiriq o'chirildi");
                },
                onError: (err) => toast.error(err?.message),
              });
            },
            //   onError: () => toast.error("Client o'chirilmadi"),
            // }),
            updateAction: (data) =>
              setModal({
                isOpen: true,
                data: {
                  ...data,
                  task_executors: data?.task_executors?.map((item) => item.id),
                },
              }),
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
          {/* <CustomTable
            {...{
              columns: columns,
              items: taskData?.data,
              isLoading: tasksLoading,
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
              height: 250,
              // hasPagination: true,
            }}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default SupervisorTasks;

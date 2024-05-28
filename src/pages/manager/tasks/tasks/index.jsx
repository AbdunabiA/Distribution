import { useState } from "react";
import DateFilter from "components/dateFilter";
import { LineGraph } from "components/charts";
import CustomTable from "components/table";
import { Button, Modal } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { data } from "assets/db";
import { useQueryClient } from "@tanstack/react-query";
import { useGet, usePost } from "crud";
import { toast } from "sonner";
import { CreateTask } from "components/forms/createTask";
import PlusIcon from "assets/icons/PlusIcon.svg?react";
import { useSelector } from "react-redux";
import qs from "qs";
import { get } from "lodash";
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

const ManagerTasks = () => {
  const location = useLocation();
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const [modal, setModal] = useState({ isOpen: false, data: null });
  console.log(data, "dataaa");
  const [dateValue, setDateValue] = useState("");
  const { data: userData } = useSelector((state) => state.auth);
  let id = userData.id;
  const onChange = (value) => {
    setDateValue(value);
    console.log(dateValue);
  };
  const { data: taskData, isLoading: tasksLoading } = useGet({
    url: "/tasks/all/",
    queryKey: ["/tasks/all/"],
    params: { page: +get(params, "tasks", 1) },
  });

  const { data: berilganTaskData, isLoading: berilganTasksLoading } = useGet({
    url: `/users/bergan_tasklari/${id}`,
    queryKey: [`/users/bergan_tasklari/${id}`],
    params: { page: +get(params, "berilganTask", 1) },
  });

  const queryClient = useQueryClient();
  const { mutate: deleteTask } = usePost();
  console.log(berilganTaskData, "berilganTaskData");
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
        onCancel={() => setModal({ isOpen: false, data: null })}
      >
        <CreateTask {...{ setModal, data: modal.data }} />
      </Modal>
      <div>
        <CustomTable
          {...{
            hasPagination: true,
            meta: { total: berilganTaskData?.data?.count },
            onChangeNavigate:(page) => {
              return {
                navigate: { berilganTask: page },
                paramsKey: "berilganTask",
              };
            },
            columns: columns,
            items: berilganTaskData?.data?.results,
            isLoading: berilganTasksLoading,
            hasDelete: true,
            hasUpdate: true,
            title: `${userData?.first_name} bergan topshiriqlar: ${
              berilganTaskData?.data?.results
                ? berilganTaskData?.data?.results.length
                : ""
            }`,
            minHeigth: "230px",
            height: "300px",
            // onRowNavigationUrl: `/clients/`,
            hideColumns: true,
            deleteAction: (data) => {
              deleteTask({
                url: `/tasks/${data?.id}/delete/`,
                method: "delete",
                onSuccess: () => {
                  queryClient.invalidateQueries(`/users/bergan_tasklari/${id}`);
                  toast.success("Topshiriq o'chirildi");
                },
                onError: (err) => toast.error(err?.message),
              });
            },
            updateAction: (data) =>
              setModal({
                isOpen: true,
                data: {
                  ...data,
                  task_executors: data?.task_executors?.map((item) => item.id),
                },
              }),
            buttons: [
              <Button
                icon={<PlusIcon />}
                type="primary"
                key={"task"}
                onClick={() => setModal({ isOpen: true, data: null })}
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
              hasPagination: true,
              meta: { total: taskData?.data?.count },
              onChangeNavigate:(page) => {
                return {
                  navigate: { tasks: page },
                  paramsKey: "tasks",
                };
              },
              columns: columns,
              items: taskData?.data?.results,
              isLoading: tasksLoading,
              title: `Topshiriqlar: ${
                taskData?.data?.results ? taskData.data?.results.length : ""
              }`,
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
          />
        </div>
      </div>
    </div>
  );
};

export default ManagerTasks;

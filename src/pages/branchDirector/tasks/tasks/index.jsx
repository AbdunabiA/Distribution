import { useState } from "react";
import s from './tasks.module.scss'
import CustomTable from "components/table";
import { Button, Modal, Tooltip } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { data } from "assets/db";
import { useQueryClient } from "@tanstack/react-query";
import { useGet, usePost } from "crud";
import { toast } from "sonner";
import { CreateTask } from "components/forms/createTask";
import PlusIcon from "assets/icons/PlusIcon.svg?react";
import { useSelector } from "react-redux";
import qs from 'qs'
import { get } from "lodash";

const columns = [
  {
    key: 1,
    title: "Task",
    dataIndex: "text",
    // sorter: (a, b) => a.text.localeCompare(b.text),
    width:"200px",
    render: (comment) => (
      <Tooltip title={comment} placement="topLeft">
        <span className={s.clamped}>{comment}</span>
      </Tooltip>
    ),
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
  {
    key: 5,
    title: "Kim bergan",
    dataIndex: "task_setter",
    render: (text, record) => text?.first_name + " " + text?.last_name,
  },
  {
    key: 5,
    title: "Kimga berilgan",
    dataIndex: "task_executors",
    width:"300px",
    render: (text, record) =>
      text?.reduce(
        (acc, user) => acc + user?.first_name + " " + user?.last_name + ", ",
        ""
      ),
  },
];

const BranchDiretorTasks = () => {
    const location = useLocation();
    const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const [modal, setModal] = useState({ isOpen: false, data: null });
  const { data: userData } = useSelector((state) => state.auth);
  let id = userData.id;
  const { data: taskData, isLoading: tasksLoading } = useGet({
    url: `/warehouses/${userData?.warehouse?.id}/tasks/`,
    queryKey: [`/warehouses/${userData?.warehouse?.id}/tasks/`],
    params: { page: +get(params, "allTasks", 1) },
  });

  const { data: berilganTaskData, isLoading: berilganTasksLoading } = useGet({
    url: `/users/bergan_tasklari/${id}`,
    queryKey: [`/users/bergan_tasklari/${id}`],
    params: { page: +get(params, "givenTasks",1)},
  });

  const queryClient = useQueryClient();
  const { mutate: deleteTask } = usePost();
  console.log(taskData);
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
            title: `${userData?.first_name} bergan topshiriqlar: ${berilganTaskData?.data.length}`,
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
            height: "300px",
            scrollY: true,
            hasPagination: true,
            meta: { total: berilganTaskData?.data?.count },
            onChangeNavigate: (page) => {
              return {
                navigate: { givenTasks: page },
                paramsKey: "givenTasks",
              };
            },
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
              items: taskData?.data?.results,
              isLoading: tasksLoading,
              // hasDelete: true,
              // hasUpdate: true,
              title: `Topshiriqlar soni : ${taskData?.data?.count}`,
              minHeigth: "230px",
              // onRowNavigationUrl: `/clients/`,
              hideColumns: true,
              scrollY: true,
              height: 250,
              hasPagination: true,
              meta: { total: taskData?.data?.count },
              onChangeNavigate: (page) => {
                return {
                  navigate: { allTasks: page },
                  paramsKey: "allTasks",
                };
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BranchDiretorTasks;

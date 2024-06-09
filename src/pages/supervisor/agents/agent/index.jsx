import React from "react";
import s from "./agent.module.scss";
import CustomTable from "components/table";
import { useState } from "react";
import { ProfileData } from "pages/profile/profiledata";
import { Button, Modal, Tooltip } from "antd";
import { useGet } from "crud";
import { useLocation, useParams } from "react-router-dom";
import Loader from "components/loader";
import { CreateUserForm } from "components/forms";
import dayjs from "dayjs";
import qs from "qs";
import { get } from "lodash";


const tasksColumns = [
  {
    key: "text",
    title: "Topshiriq",
    dataIndex: "text",
    width: "200px",
    render: (text) => (
      <Tooltip title={text} placement="topLeft">
        <span className={s.clamped}>{text}</span>
      </Tooltip>
    ),
  },
  {
    key: "deadline",
    title: "Deadline",
    dataIndex: "deadline",
    render: (date) => dayjs(date).format("DD-MM-YYYY"),
  },
  {
    key: "created_at",
    title: "Berilgan",
    dataIndex: "created_at",
    render: (date) => dayjs(date).format("DD-MM-YYYY"),
  },
  {
    key: "task_setter",
    title: "Bergan",
    dataIndex: "task_setter",
    render: (data) => data?.first_name + " " + data?.last_name,
  },
  {
    key: "status",
    title: "Status",
    dataIndex: "status",
  },
];

const SuperviserAgen = () => {
  const location = useLocation();
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const { employeeId } = useParams();
  const [userModal, setUserModal] = useState({ isOpen: false, data: null });

  const { data: userProfileData, isLoading, isError, error } = useGet({
    url: `/users/details/${employeeId}`,
    queryKey: [`/users/details/${employeeId}`],
  });

  const { data: olinganTaskData, isLoading: berilganTasksLoading } = useGet({
    url: `/users/olgan_tasklari/${employeeId}`,
    queryKey: [`/users/olgan_tasklari/${employeeId}`],
    params: { page: +get(params, "tasksPage", 1) },
  });

  const { data: salaryData } = useGet({
    url: `/users/${employeeId}/salary_params/`,
    queryKey: [`/users/${employeeId}/salary_params/`],
  });




  const { data: calculatedSalary } = useGet({
    url: `/users/salary_calculate/${employeeId}/${dayjs().year()}/${dayjs().month() +
      1}`,
    queryKey: [
      `/users/salary_calculate/${employeeId}/${dayjs().year()}/${dayjs().month() +
        1}`,
    ],
  });

  if (isLoading) return <Loader />;
  if (isError) return <h1>Error</h1>;
  return (
    <div className="container">
      <Modal
        open={userModal.isOpen}
        centered
        destroyOnClose
        footer={false}
        onCancel={() => setUserModal({ isOpen: false })}
      >
        <CreateUserForm setModal={setUserModal} data={userProfileData?.data} />
      </Modal>
      <div className={s.biggest_wrapper}>
        <div className={s.flex_div}>
          <ProfileData
            height={"495px"}
            userProfile={{
              ...userProfileData?.data,
              ...salaryData?.data,
              ...calculatedSalary?.data,
            }}
            buttons={[
              <Button
                type="primary"
                key={"1"}
                onClick={() =>
                  setUserModal({
                    isOpen: true,
                    data: userProfileData?.data,
                  })
                }
              >
                O’zgartirish
              </Button>,
            ]}
          />
          <div className={s.table}>
            <CustomTable
              {...{
                columns: tasksColumns,
                items: olinganTaskData?.data?.results,
                title: `Topshiriqlar soni: ${olinganTaskData?.data?.count}`,
                minHeight: 335,
                scrollY: true,
                // scrollX: true,
                height: "100%",
                hideColumns: true,
                onChangeNavigate: (page) => {
                  return {
                    navigate: { tasksPage: page },
                    paramsKey: "tasksPage",
                  };
                },
                hasPagination: true,
                meta: { total: olinganTaskData?.data?.count },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperviserAgen;

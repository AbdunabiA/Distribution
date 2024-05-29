import React from "react";
import profileScss from "./profile.module.scss";
import CustomTable from "components/table";
import DateFilter from "components/dateFilter";
import { useState } from "react";
import { ProfileData } from "./profiledata";
import { Button, Modal, Tooltip } from "antd";
import { useSelector } from "react-redux";
import { GetAll } from "modules";
import { ChangePassword } from "components/forms";
import { useGet, usePost } from "crud";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CreateUserForm } from "components/forms";
import dayjs from "dayjs";
import { formatNums } from "services/formatNums";
import { render } from "react-dom";
import { get } from "lodash";
import { useLocation } from "react-router-dom";
import qs from 'qs'
import Loader from "components/loader";

const tasksColumns = [
  {
    key: "text",
    title: "Topshiriq",
    dataIndex: "text",
    width: "200px",
    render: (text) => (
      <Tooltip title={text}>
        <span className={profileScss.clamped}>{text}</span>
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

const salariesColumns = [
  {
    key: "total_amount",
    title: "Umumiy maosh",
    dataIndex: "total_amount",
    render: (amount) => formatNums(amount),
  },
  {
    key: "fixed_amount",
    title: "Fiksa maosh",
    dataIndex: "fixed_amount",
    render: (amount) => formatNums(amount),
  },
  {
    key: "kpi_amount",
    title: "KPI",
    dataIndex: "kpi_amount",
    width: "100px",
    render: (amount) => formatNums(amount),
  },
  {
    key: "bonus",
    title: "Bonus",
    dataIndex: "bonus",
    width: "100px",
    render: (amount) => formatNums(amount),
  },
  {
    key: "paid_at",
    title: "To'langan sana",
    dataIndex: "paid_at",
    render: (date) => dayjs(date).format("YYYY/MM/DD-HH:mm"),
  },
  {
    key: "paid_for",
    title: "Oy to'lo'vi",
    dataIndex: "month",
    render: (month, rec) =>
      dayjs()
        .month(+month)
        .format("MMMM") +
      " " +
      rec?.year,
  },
  {
    key: "Kim to'ladi",
    title: "To'ladi",
    dataIndex: "payer",
    render: (data) => data?.first_name + " " + data?.last_name,
  },
  {
    key: "comment",
    title: "Comment",
    dataIndex: "comment",
    width: "200px",
    render: (comment) => (
      <Tooltip title={comment} placement="topLeft">
        <span className={profileScss.clamped}>{comment}</span>
      </Tooltip>
    ),
  },
];
function Profile() {
  const location = useLocation()
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const { data: userData } = useSelector((store) => store.auth);
  const [passwordModal, setPasswordModal] = useState({ isOpen: false });
  const [userModal, setUserModal] = useState({ isOpen: false, data: null });
  const id = userData.id;

  const { data: payedSalaries } = useGet({
    url: "/users/salary_payments/",
    queryKey: ["/users/salary_payments/"],
    params: { page: +get(params, "salariesPage", 1) },
  });
  console.log('payed salaries:', payedSalaries, );
  // console.log(dayjs().month(0).format("MMMM"));
  const { data: calculatedSalary } = useGet({
    url: `/users/salary_calculate/${id}/${dayjs().year()}/${dayjs().month() +
      1}`,
    queryKey: [
      `/users/salary_calculate/${id}/${dayjs().year()}/${dayjs().month() +
        1}`,
    ],
  });

    const { data: salaryData } = useGet({
      url: `/users/${id}/salary_params/`,
      queryKey: [`/users/${id}/salary_params/`],
    });


  const { data: olinganTaskData, isLoading: olganTasksLoading } = useGet({
    url: `/users/olgan_tasklari/${id}`,
    queryKey: [`/users/olgan_tasklari/${id}`],
    params: { page: +get(params, "tasksPage", 1) },
  });

  console.log(olinganTaskData, "hello");

  return (
    <GetAll
      url={`/users/details/token/${userData.access}`}
      queryKey={["ProfileData"]}
    >
      {({ data: userProfileData, isLoading, isError, error }) => {
        if (isLoading) return <Loader/>;
        if (isError) return <h1>Error</h1>;
        return (
          <div className="container">
            <Modal
              open={passwordModal.isOpen}
              centered
              destroyOnClose
              footer={false}
              onCancel={() => setPasswordModal({ isOpen: false })}
            >
              <ChangePassword setModal={setPasswordModal} />
            </Modal>

            <Modal
              open={userModal.isOpen}
              centered
              destroyOnClose
              footer={false}
              onCancel={() => setUserModal({ isOpen: false })}
            >
              <CreateUserForm
                setModal={setUserModal}
                data={userProfileData?.data}
              />
            </Modal>

            <div className={profileScss.biggest_wrapper}>
              <div className={profileScss.flex_div}>
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
                    <Button
                      type="primary"
                      key={"2"}
                      onClick={() => setPasswordModal({ isOpen: true })}
                    >
                      Parol o'zgartirish
                    </Button>,
                  ]}
                />
                <div className={profileScss.table}>
                  <CustomTable
                    {...{
                      columns: tasksColumns,
                      items: olinganTaskData?.data?.results,
                      title: `Topshiriqlar soni: ${olinganTaskData?.data?.count}`,
                      minHeight: 340,
                      isLoading: olganTasksLoading,
                      // hasStatus: true,
                      scrollY: true,
                      height: "100%",
                      hideColumns: true,
                      hasPagination: true,
                      meta:{total:olinganTaskData?.data?.count},
                      onChangeNavigate:(page)=>{
                        return {
                          navigate: { tasksPage: page },
                          paramsKey: "tasksPage",
                        };
                      }
                    }}
                  />
                </div>
              </div>
              <div>
                <div className={profileScss.date}>
                  {/* <DateFilter onChange={onchange} value={dateValue} /> */}
                  <div style={{ marginTop: "20px" }}>
                    <CustomTable
                      {...{
                        columns: salariesColumns,
                        items: payedSalaries?.data?.results,
                        title: `Maosh to’lo’vi: ${payedSalaries?.data?.count}`,
                        minHeigth: "230px",
                        scrollY: true,
                        height: 230,
                        hideColumns: true,
                        hasPagination: true,
                        meta:{total: payedSalaries?.data?.count},
                        onChangeNavigate:(page)=>{
                          return {
                            navigate: { salariesPage: page },
                            paramsKey: "salariesPage",
                          };
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </GetAll>
  );
}
export default Profile;

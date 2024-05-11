import React from "react";
import employeeProfileScss from "./employee.module.scss";
import CustomTable from "components/table";
import DateFilter from "components/dateFilter";
import { useState } from "react";
import { ProfileData } from "pages/profile/profiledata";
import { Button, Modal } from "antd";
import { useSelector } from "react-redux";
import { GetAll } from "modules";
import { ChangePassword, CreateSalary } from "components/forms";
import { useGet } from "crud";
import { useParams } from "react-router-dom";
import Loader from "components/loader";
import dayjs from "dayjs";
const columns1 = [
  {
    key: 1,
    title: "Task",
    dataIndex: "text",
  },
  {
    key: 2,
    title: "Deadline",
    dataIndex: "deadline",
    sorter: (a, b) => a.deadline.localeCompare(b.deadline),
  },
];
function ManagerEmployeeSingle() {
  const { employeeId } = useParams();
  const [dateValue, setDateValue] = useState("");
  const [passwordModal, setPasswordModal] = useState({ isOpen: false });
  const [salaryModal, setSalaryModal] = useState({ isOpen: false, data: null });
  const onChange = (value) => {
    setDateValue(value);
    console.log(dateValue);
  };
  const items2 = [
    {
      id: "1",
      name: "Mordayev Akmaljon",
      month: "Yanvar",
      salary: 2000000,
      bonus: 30000,
      jarima: 50000,
      jami: 2250000,
    },
    {
      id: "2",
      name: "Mordayev Akmaljon",
      month: "Fevral",
      salary: 3000000,
      bonus: 400000,
      jarima: 50000,
      jami: 3350000,
    },

    {
      id: "3",
      name: "Mordayev Akmaljon",
      month: "Mart",
      salary: 4000000,
      bonus: 500000,
      jarima: 50000,
      jami: 4450000,
    },
    {
      id: "4",
      name: "Mordayev Akmaljon",
      month: "Aprel",
      salary: 2000000,
      bonus: 600000,
      jarima: 50000,
      jami: 2550000,
    },
    {
      id: "5",
      name: "Mordayev Akmaljon",
      month: "May",
      salary: 2000000,
      bonus: 700000,
      jarima: 50000,
      jami: 2650000,
    },
  ];
  const columns2 = [
    {
      key: 1,
      title: "name",
      dataIndex: "name",
    },
    {
      key: 2,
      title: "month",
      dataIndex: "month",
      sorter: (a, b) => a.month.localeCompare(b.month),
    },
    {
      key: 3,
      title: "salary",
      dataIndex: "salary",
      sorter: (a, b) => a.salary - b.salary,
    },
    {
      key: 4,
      title: "bonus",
      dataIndex: "bonus",
      sorter: (a, b) => a.bonus - b.bonus,
    },
    {
      key: 5,
      title: "jarima",
      dataIndex: "jarima",
      sorter: (a, b) => a.jarima - b.jarima,
    },
    {
      key: 6,
      title: "jami",
      dataIndex: "jami",
      sorter: (a, b) => a.jami - b.jami,
    },
  ];

  const { data: olinganTaskData, isLoading: berilganTasksLoading } = useGet({
    url: `/users/olgan_tasklari/${employeeId}`,
    queryKey: [`/users/olgan_tasklari/${employeeId}`],
  });

  const { data: salaryData } = useGet({
    url: `/users/${employeeId}/salary_params`,
    queryKey: ["salary_params"],
  });
  console.log("salary params", salaryData);
  // const { data: currentSalary } = useGet({
  //   url: `/users/salary_calculate/${employeeId}/${dayjs().year()}/${dayjs().month() + 1}`,
  //   queryKey: ["salary_calculation"],
  // });
  // console.log(olinganTaskData, "hello");
  // console.log('calculated salary', currentSalary)
  return (
    <GetAll
      url={`/users/details/${employeeId}`}
      queryKey={[`/users/details/${employeeId}`]}
    >
      {({ data: userProfileData, isLoading, isError, error }) => {
        if (isLoading) return <Loader />;
        if (isError) return <h1>Error</h1>;
        console.log(userProfileData.data);
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
              open={salaryModal.isOpen}
              centered
              destroyOnClose
              footer={false}
              onCancel={() => setSalaryModal({ isOpen: false, data: null })}
            >
              <CreateSalary data={salaryModal.data} setModal={setSalaryModal} />
            </Modal>
            <div className={employeeProfileScss.biggest_wrapper}>
              <div className={employeeProfileScss.flex_div}>
                <ProfileData
                  height={"495px"}
                  userProfile={{
                    ...userProfileData?.data,
                    ...salaryData?.data,
                  }}
                  buttons={[
                    <Button type="primary" key={"1"}>
                      O’zgartirish
                    </Button>,
                    <Button
                      type="primary"
                      key={"2"}
                      onClick={() =>
                        setSalaryModal({
                          isOpen: true,
                          data: salaryData?.data,
                        })
                      }
                    >
                      Maosh belgilash
                    </Button>,
                  ]}
                />
                <div className={employeeProfileScss.table}>
                  <CustomTable
                    {...{
                      columns: columns1,
                      items: olinganTaskData?.data,
                      title: `Topshiriqlar soni: ${olinganTaskData?.data.length}`,
                      minHeight: 340,
                      hasStatus: true,
                      // scrollY: true,
                      height: 285,
                      hideColumns: true,
                      // hasPagination: true,
                    }}
                  />
                </div>
              </div>
              <div>
                <div className={employeeProfileScss.date}>
                  <DateFilter onChange={onchange} value={dateValue} />
                  <div style={{ marginTop: "20px" }}>
                    <CustomTable
                      {...{
                        columns: columns2,
                        items: items2,
                        title: "Maosh to’lo’vi ",
                        minHeigth: "230px",
                        hasStatus: true,
                        scrollY: true,
                        height: 230,
                        hideColumns: true,
                        hasPagination: true,
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
export default ManagerEmployeeSingle;

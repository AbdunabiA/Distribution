import React from "react";
import employeeProfileScss from "./employee.module.scss";
import CustomTable from "components/table";
import { useState } from "react";
import { ProfileData } from "pages/profile/profiledata";
import { Button, Modal } from "antd";
import { GetAll } from "modules";
import { CreateCar, CreateSalary } from "components/forms";
import { useGet} from "crud";
import { useParams } from "react-router-dom";
import Loader from "components/loader";
import { CreateUserForm } from "components/forms";


const columns1 = [
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
  const [salaryModal, setSalaryModal] = useState({ isOpen: false, data: null });
  const [userModal, setUserModal] = useState({ isOpen: false, data: null });
  const [carModal, setCarModal] = useState({ isOpen: false, data: null });
  

  const { data: olinganTaskData, isLoading: berilganTasksLoading } = useGet({
    url: `/users/olgan_tasklari/${employeeId}`,
    queryKey: [`/users/olgan_tasklari/${employeeId}`],
  });

  const { data: salaryData } = useGet({
    url: `/users/${employeeId}/salary_params/`,
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
        console.log(userProfileData.data, "dataa");
        return (
          <div className="container">
            <Modal
              open={carModal.isOpen}
              centered
              destroyOnClose
              footer={false}
              onCancel={() => setCarModal({ isOpen: false, data: null })}
            >
              <CreateCar data={carModal.data} setModal={setCarModal} />
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
                      onClick={() =>
                        setSalaryModal({
                          isOpen: true,
                          data: salaryData?.data,
                        })
                      }
                    >
                      Maosh belgilash
                    </Button>,
                    userProfileData?.data?.role === "driver" && (
                      <Button
                        type="primary"
                        key={"3"}
                        onClick={() =>
                          setCarModal({
                            isOpen: true,
                            data: userProfileData?.data?.car,
                          })
                        }
                      >
                        Mashina o'zgartirish
                      </Button>
                    ),
                  ]}
                />
                <div className={employeeProfileScss.table}>
                  <CustomTable
                    {...{
                      columns: columns1,
                      items: olinganTaskData?.data?.results,
                      title: `Topshiriqlar soni: ${olinganTaskData?.data?.results.length}`,
                      minHeight: 335,
                      hasStatus: true,
                      scrollY: true,
                      height: 280,
                      hideColumns: true,
                      // hasPagination: true,
                    }}
                  />
                </div>
              </div>
              <div>
                <div className={employeeProfileScss.date}>
                  {/* <DateFilter onChange={onchange} value={dateValue} /> */}
                  <div style={{ marginTop: "20px" }}>
                    {/* <CustomTable
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
                    /> */}
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

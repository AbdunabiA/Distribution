import React from "react";
import profileScss from "./profile.module.scss";
import CustomTable from "components/table";
import DateFilter from "components/dateFilter";
import { useState } from "react";
import { ProfileData } from "./profiledata";
import { Button, Modal } from "antd";
import { useSelector } from "react-redux";
import { GetAll } from "modules";
import { ChangePassword } from "components/forms";
import { useGet, usePost } from "crud";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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
function Profile() {
  const [dateValue, setDateValue] = useState("");
  const { data: userData } = useSelector((store) => store.auth);
  const [passwordModal, setPasswordModal] = useState({ isOpen: false });
  const [userModal, setUserModal] = useState({ isOpen: false, data: null });
  let id = userData.id;
  const onChange = (value) => {
    setDateValue(value);
    console.log(dateValue);
  };

  const date = new Date();

  console.log(
    "month",
    date.getMonth(),
    "year",
    date.getFullYear()
  );

  const { data: salaryData } = useGet({
    url: `/users/salary_calculate/${id}/${date.getMonth() + 1}/${date.getFullYear()}`,
    queryKey: [`/users/salary_calculate/${id}/${date.getMonth() + 1}/${date.getFullYear()}`],
  });
  console.log('salaryData', salaryData);

  const { data: olinganTaskData, isLoading: berilganTasksLoading } = useGet({
    url: `/users/olgan_tasklari/${id}`,
    queryKey: [`/users/olgan_tasklari/${id}`],
  });

  console.log(olinganTaskData, "hello");

  return (
    <GetAll
      url={`/users/details/token/${userData.access}`}
      queryKey={["ProfileData"]}
    >
      {({ data: userProfileData, isLoading, isError, error }) => {
        if (isLoading) return <h1>Loading</h1>;
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
                  userProfile={userProfileData?.data}
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
                      columns: columns1,
                      items: olinganTaskData?.data?.results,
                      title: `Topshiriqlar soni: ${olinganTaskData?.data?.results.length}`,
                      minHeight: 340,
                      isLoading: berilganTasksLoading,
                      // hasStatus: true,
                      scrollY: true,
                      scrollX: true,
                      height: "100%",
                      hideColumns: true,
                      // hasPagination: true,
                    }}
                  />
                </div>
              </div>
              <div>
                {/* <div className={profileScss.date}>
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
                </div> */}
              </div>
            </div>
          </div>
        );
      }}
    </GetAll>
  );
}
export default Profile;

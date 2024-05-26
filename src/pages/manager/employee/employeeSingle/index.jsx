import React from "react";
import employeeProfileScss from "./employee.module.scss";
import CustomTable from "components/table";
import { useState } from "react";
import { ProfileData } from "pages/profile/profiledata";
import { Button, Modal } from "antd";
import { GetAll } from "modules";
import { CreateCar, CreateSalary } from "components/forms";
import { useGet } from "crud";
import { useLocation, useParams } from "react-router-dom";
import Loader from "components/loader";
import { CreateUserForm } from "components/forms";
import { useQuery } from "@tanstack/react-query";
import { api, queryBuilder } from "services";
import dayjs from "dayjs";
import qs from "qs";
import { get } from "lodash";

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

const orderColumns = [
  {
    key: "operator",
    title: "Operator",
    dataIndex: "operator",
    render: (data) => data?.first_name + " " + data?.last_name,
  },
  {
    key: "customer",
    title: "Mijoz",
    dataIndex: "customer",
    render: (data) => data?.name,
  },
  {
    key: "driver",
    title: "Yetkazib beruvchi",
    dataIndex: "driver",
    render: (data) => data?.first_name + " " + data?.last_name,
  },
  {
    key: "warehouse",
    title: "Filial",
    dataIndex: "warehouse",
    render: (data) => data?.name,
  },
  {
    key: "comment",
    title: "Comment",
    dataIndex: "comment",
  },
  {
    key: "deadline",
    title: "Deadline",
    dataIndex: "deadline",
    render: (data) => dayjs(data).format("DD-MM-YYYY"),
  },
  {
    key: "discount",
    title: "Chegirma",
    dataIndex: "discount",
  },
  {
    key: "final_price",
    title: "Yakuniy narx",
    dataIndex: "final_price",
  },
  {
    key: "status",
    title: "Status",
    dataIndex: "status",
  },
];

function ManagerEmployeeSingle() {
  const location = useLocation();
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const { employeeId } = useParams();
  const [role, setRole] = useState(null);
  const [salaryModal, setSalaryModal] = useState({ isOpen: false, data: null });
  const [userModal, setUserModal] = useState({ isOpen: false, data: null });
  const [carModal, setCarModal] = useState({ isOpen: false, data: null });

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

  const { data: operatorOrders, isLoading: operatorOrdersLoading } = useQuery({
    queryFn: () =>
      api.get(
        queryBuilder(`/orders/operator_orders/${employeeId}`, {
          page: +get(params, "ordersPage", 1),
        })
      ),
    queryKey: [`/orders/operator_orders/${employeeId}`],
    enabled: !isLoading && userProfileData?.data?.role === "operator",
  });

  const { data: driverOrders, isLoading: driverOrdersLoading } = useQuery({
    queryFn: () =>
      api.get(
        queryBuilder(`/orders/driver_orders/${employeeId}`, {
          page: +get(params, "ordersPage", 1),
        })
      ),
    queryKey: [`/orders/driver_orders/${employeeId}`],
    enabled: !isLoading && userProfileData?.data?.role === "driver",
  });
  // const { data: currentSalary } = useGet({
  //   url: `/users/salary_calculate/${employeeId}/${dayjs().year()}/${dayjs().month() + 1}`,
  //   queryKey: ["salary_calculation"],
  // });
  // console.log(olinganTaskData, "hello");
  // console.log('calculated salary', currentSalary)

  if (isLoading) return <Loader />;
  if (isError) return <h1>Error</h1>;
  // console.log("salary params", salaryData?.data);
  // console.log("OperatorOrders", operatorOrders?.data);
  // console.log("dataa", userProfileData?.data);
  console.log("OperatorOrders", driverOrders?.data);
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
        <CreateUserForm setModal={setUserModal} data={userProfileData?.data} />
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
            userProfile={{ ...userProfileData?.data, ...salaryData?.data }}
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
                title: `Topshiriqlar soni: ${olinganTaskData?.data?.count}`,
                minHeight: 335,
                scrollY: true,
                height: 280,
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
            {operatorOrders?.data &&
            userProfileData?.data?.role === "operator" ? (
              <div style={{ marginTop: "20px" }}>
                <CustomTable
                  {...{
                    columns: orderColumns,
                    items: operatorOrders?.data?.results,
                    title: "Buyurtmalar",
                    minHeigth: "230px",
                    scrollY: true,
                    height: 230,
                    hideColumns: true,
                    hasPagination: true,
                    meta: { total: operatorOrders?.data?.count },
                    onChangeNavigate: (page) => {
                      return {
                        navigate: { ordersPage: page },
                        paramsKey: "ordersPage",
                      };
                    },
                  }}
                />
              </div>
            ) : null}
            {driverOrders?.data &&
            userProfileData?.data?.role === "driver" ? (
              <div style={{ marginTop: "20px" }}>
                <CustomTable
                  {...{
                    columns: orderColumns,
                    items: driverOrders?.data?.results?.orders,
                    title: "Buyurtmalar",
                    minHeigth: "230px",
                    scrollY: true,
                    height: 230,
                    hideColumns: true,
                    hasPagination: true,
                    meta: { total: driverOrders?.data?.count },
                    onChangeNavigate: (page) => {
                      return {
                        navigate: { ordersPage: page },
                        paramsKey: "ordersPage",
                      };
                    },
                  }}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ManagerEmployeeSingle;

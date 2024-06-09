import React from "react";
import employeeProfileScss from "./employee.module.scss";
import CustomTable from "components/table";
import { useState } from "react";
import { ProfileData } from "pages/profile/profiledata";
import { Button, Modal, Tooltip } from "antd";
import { GetAll } from "modules";
import { CreateCar, CreateSalary, SalaryPay } from "components/forms";
import { useGet } from "crud";
import { useLocation, useParams } from "react-router-dom";
import Loader from "components/loader";
import { CreateUserForm } from "components/forms";
import { useQuery } from "@tanstack/react-query";
import { api, queryBuilder } from "services";
import dayjs from "dayjs";
import qs from "qs";
import { get } from "lodash";
import { formatNums } from "services/formatNums";



function ManagerEmployeeSingle() {
  const location = useLocation();
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const { employeeId } = useParams();
  const [salaryPay, setSalaryPay] = useState({ isOpen: false, data: null });
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

  const { data: payedSalaries } = useGet({
    url: "/users/salary_payments/",
    queryKey: ["/users/salary_payments/"],
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
  const { data: calculatedSalary } = useGet({
    url: `/users/salary_calculate/${employeeId}/${dayjs().year()}/${dayjs().month() +
      1}`,
    queryKey: [
      `/users/salary_calculate/${employeeId}/${dayjs().year()}/${dayjs().month() +
        1}`,
    ],
  });
  console.log("tasksData", olinganTaskData?.data);
  console.log("calculated salary", calculatedSalary?.data);
  console.log("PayedSalary", payedSalaries?.data);

  if (isLoading) return <Loader />;
  if (isError) return <h1>Error</h1>;
  // console.log("salary params", salaryData?.data);
  // console.log("OperatorOrders", operatorOrders?.data);
  // console.log("dataa", userProfileData?.data);
  // console.log("OperatorOrders", driverOrders?.data);

  const orderColumns = [
    {
      key: "num",
      title: "№",
      width: "70px",
      render: (text, record, index) => {
        // Calculate the correct index considering pagination
        const orderNumber = (get(params, "ordersPage", 1) - 1) * 10 + index + 1;
        return orderNumber;
      },
    },
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
      render: (data) => formatNums(data),
    },
    {
      key: "sum",
      title: "Jami narxi",
      dataIndex: "sum",
      render: (data) => formatNums(data),
    },
    {
      key: "final_price",
      title: "Yakuniy narx",
      dataIndex: "final_price",
      render: (data) => formatNums(data),
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
    },
  ];
  const tasksColumns = [
    {
      key: "num",
      title: "№",
      width: "70px",
      render: (text, record, index) => {
        // Calculate the correct index considering pagination
        const orderNumber = (get(params, "tasksPage", 1) - 1) * 10 + index + 1;
        return orderNumber;
      },
    },
    {
      key: "text",
      title: "Topshiriq",
      dataIndex: "text",
      width: "200px",
      render: (text) => (
        <Tooltip title={text} placement="topLeft">
          <span className={employeeProfileScss.clamped}>{text}</span>
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


  return (
    <div className="container">
      <Modal
        open={salaryPay.isOpen}
        centered
        destroyOnClose
        footer={false}
        onCancel={() => setSalaryPay({ isOpen: false, data: null })}
      >
        <SalaryPay
          data={salaryPay?.data}
          setModal={setSalaryPay}
          invalidateQuery={"/users/salary_payments/"}
        />
      </Modal>
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
        <CreateSalary
          data={salaryModal.data}
          invalidateQuery={`/users/${employeeId}/salary_params/`}
          setModal={setSalaryModal}
        />
      </Modal>
      <div className={employeeProfileScss.biggest_wrapper}>
        <div className={employeeProfileScss.flex_div}>
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
                onClick={() =>
                  setSalaryModal({
                    isOpen: true,
                    data: salaryData?.data,
                  })
                }
              >
                Maosh belgilash
              </Button>,
              <Button
                key={"4"}
                type="primary"
                onClick={() =>
                  setSalaryPay({
                    isOpen: true,
                    data: {
                      ...calculatedSalary?.data,
                      month: dayjs().month() + 1,
                      year: dayjs().year(),
                      user: userProfileData?.data,
                    },
                  })
                }
              >
                Oylik to'lash
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
                columns: tasksColumns,
                items: olinganTaskData?.data?.results,
                title: `Topshiriqlar soni: ${olinganTaskData?.data?.count}`,
                minHeight: 335,
                scrollY: true,
                // scrollX: true,
                height: '100%',
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
            userProfileData?.data?.role === "operator" || driverOrders?.data && userProfileData?.data?.role === "driver" ? (
              <div style={{ marginTop: "20px" }}>
                <CustomTable
                  {...{
                    columns: orderColumns,
                    items: userProfileData?.data?.role === "operator" ? operatorOrders?.data?.results : driverOrders?.data?.results?.orders,
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
          </div>
        </div>
      </div>
    </div>
  );
}
export default ManagerEmployeeSingle;

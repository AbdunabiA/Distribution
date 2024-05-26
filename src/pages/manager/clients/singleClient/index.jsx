import React from "react";
import { ProfileData } from "pages/profile/profiledata";
import singleScss from "./singleClient.module.scss";
import { useState } from "react";
import { Button, Modal } from "antd";
import { useParams } from "react-router-dom";
import { useGet } from "crud";
import { CreateClient } from "components/forms/createClient";
import Loader from "components/loader";
import dayjs from "dayjs";
import CustomTable from "components/table";
import { formatNums } from "services/formatNums";

const columns1 = [
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


const ManagerSingleClient = () => {
  let { clintId } = useParams();
  const [dateValue, setDateValue] = useState("");
  const [modal, setModal] = useState({ isOpen: false, form: null, data: null });
  const onChange = (value) => {
    setDateValue(value);
    console.log(dateValue);
  };

  const { data, isLoading } = useGet({
    url: `/customers/${clintId}/detail/`,
    queryKey: [`/customers/${clintId}/detail/`],
  });
  const { data: orders } = useGet({
    url: `/orders/customer_orders/${clintId}/`,
    queryKey: [`/orders/customer_orders/${clintId}/`],
  });
  console.log(orders?.data);
  return (
    <>
      <Modal
        destroyOnClose
        centered
        footer={false}
        open={modal.isOpen}
        onCancel={() => setModal({ isOpen: false, form: null, data: null })}
      >
        {modal.form === "client" ? (
          <CreateClient {...{ setModal, data: modal.data }} />
        ) : null}
      </Modal>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className={singleScss.wrapper}>
            <div className={singleScss.prof}>
              <ProfileData
                height={"555px"}
                userProfile={data.data}
                buttons={[
                  <Button
                    key={"1"}
                    type="primary"
                    onClick={() =>
                      setModal({
                        isOpen: true,
                        form: "client",
                        data: data.data,
                      })
                    }
                  >
                    O’zgartirish
                  </Button>,
                  // <Button key={"2"} type="primary">
                  //   Arxivlash
                  // </Button>,
                  // <Button key={"3"} type="primary">
                  //   Joylashuvi
                  // </Button>,
                ]}
              />
            </div>
            {/* <div className={singleScss.pie}> */}
            {/* <PieChart
                data={{
                  January: "30",
                  February: "40",
                  March: "60",
                  May: "70",
                  Sebtember: "87",
                }}
                label={"Buyurtma qilingan mahsulotlar"}
                title={"Buyurtma qilingan mahsulotlar"}
              /> */}
            {/* </div> */}
          </div>
          <div className={singleScss.date}>
            {/* <DateFilter onChange={onChange} value={dateValue} /> */}
          </div>
          <div className={singleScss.orderTable}>
            <CustomTable
              {...{
                columns: columns1,
                items: orders?.data?.results,
                title: "Buyurtmalar",
                minHeigth: "230px",
                scrollY: true,
                // scrollX: "400px",
                height: 300,
                hideColumns: true,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default ManagerSingleClient;

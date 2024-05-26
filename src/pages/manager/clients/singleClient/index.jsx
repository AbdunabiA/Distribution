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

const columns1 = [
  {
    key: 1,
    title: "Mahsulot",
    dataIndex: "product",
    render: (prod, b) => prod?.product?.name,
  },
  {
    key: 2,
    title: "Buyurtma qilingan sana",
    dataIndex: "date_time",
    render: (date) => dayjs(date).format("DD-MM-YYYY"),
  },
  {
    key: 3,
    title: "Deadline",
    dataIndex: "deadline",
    render: (date) => dayjs(date).format("DD-MM-YYYY"),
  },
  {
    key: 4,
    title: "Miqdori",
    dataIndex: "amount",
  },
  {
    key: 5,
    title: "Umumiy narxi",
    dataIndex: "total_price",
  },
  {
    key: 6,
    title: "Chegirma",
    dataIndex: "discount",
  },
  {
    key: 7,
    title: "Tvsif",
    dataIndex: "comment",
  },
  {
    key: 8,
    title: "Yetkazib beruvchi",
    dataIndex: "driver",
    render: (driver) => driver?.first_name + " " + driver?.last_name,
  },
  {
    key: 9,
    title: "Operator",
    dataIndex: "operator",
    render: (operator) => operator?.first_name + " " + operator?.last_name,
  },
  {
    key: 10,
    title: "Filial",
    dataIndex: "warehouse",
    render: (data) => data?.name,
  },
  {
    key: 11,
    title: "Status",
    dataIndex: "status",
  },
];
const items1 = [
  {
    id: "1",
    order: "Olma",
    date: "14.03.24",
    address: "New York No. 1 Lake Park",
  },
  {
    id: "2",
    order: "Banan",
    date: "15.03.24",
    address: "London No. 1 Lake Park",
  },
  {
    id: "3",
    order: "Gilos",
    date: "16.03.24",
    address: "London No. 1 Lake Park",
  },

  {
    id: "4",
    order: "Anor",
    date: "17.03.24",
    address: "London No. 1 Lake Park",
  },
  {
    id: "5",
    order: "Behi",
    date: "13.03.24",
    address: "London No. 1 Lake Park",
  },

  {
    id: "6",
    order: "Uzum",
    date: "14.03.24",
    address: "London No. 1 Lake Park",
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

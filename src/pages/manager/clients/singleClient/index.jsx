import React from "react";
import { ProfileData } from "pages/profile/profiledata";
import singleScss from "./singleClient.module.scss";
import { useState } from "react";
import { Button, Modal } from "antd";
import { useParams } from "react-router-dom";
import { useGet, } from "crud";
import { CreateClient } from "components/forms/createClient";
import Loader from "components/loader";

const columns1 = [
  {
    key: 1,
    title: "order",
    dataIndex: "order",
    sorter: (a, b) => a.order.localeCompare(b.order),
  },
  {
    key: 2,
    title: "date",
    dataIndex: "date",
    sorter: (a, b) => {
      const dateA = new Date(
        a.date
          .split(".")
          .reverse()
          .join("-")
      );
      const dateB = new Date(
        b.date
          .split(".")
          .reverse()
          .join("-")
      );
      return dateA - dateB;
    },
    filters: [
      {
        text: "Newest",
        value: "newest",
      },
    ],
    onFilter: (value, record) => {
      if (value === "newest") {
        const today = new Date();
        const recordDate = new Date(
          record.date
            .split(".")
            .reverse()
            .join("-")
        );
        return recordDate >= today;
      } else {
        return record.address.startsWith(value);
      }
    },
    filterSearch: true,
    width: "30%",
    responsive: ["md"],
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
  // const { data: orders } = useGet({
  //   url: `/orders/${clintId}/details/`,
  //   queryKey: [`/orders/${clintId}/details/`],
  // });
  // console.log(orders?.data);
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
          {/* <div className={singleScss.orderTable}>
            <CustomTable
              {...{
                columns: columns1,
                items: items1,
                title: "Buyurtmalar tarixi",
                minHeigth: "230px",
                hasDelete: true,
                scrollY: true,
                height: 230,
                hideColumns: true,
              }}
            />
          </div> */}
        </div>
      )}
    </>
  );
};
export default ManagerSingleClient;

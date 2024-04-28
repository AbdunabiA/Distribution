import React from "react";
import { ProfileData } from "pages/profile/profiledata";
import DateFilter from "components/dateFilter";
import { PieChart } from "components/charts";
import CustomTable from "components/table";
import singleScss from "./singleClient.module.scss";
import { useState } from "react";
import { Button } from "antd";
import ProfileImage from "components/profileImage";
const ManagerSingleClient = () => {
  const [dateValue, setDateValue] = useState("");
  const onChange = (value) => {
    setDateValue(value);
    console.log(dateValue);
  };
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
  const userProfile = {
    name: "Abdunabi Abduvaxobov",
    job: "Ombor manageri",
    profileImg:<ProfileImage/>,
    phoneNumber: "+998905200350",
    status: true,
    byWhichPerson:' John Washington',
    adress: "Shifokorlar 70/89",
    branch: "Fergana branch",
  };
  return (
    <>
      <div className="container">
        <div className={singleScss.wrapper}>
          <div className={singleScss.prof}>
            <ProfileData
              height={"555px"}
              userProfile={userProfile}
              buttons={[
                <Button
                  type="primary"  
                >
                  O’zgartirish
                </Button>,
                 <Button
                 type="primary"
               >
                 Arxivlash
               </Button>,
                <Button
                type="primary"
              >
                Joylashuvi
              </Button>,
              ]}
            />
          </div>
          <div
            className={singleScss.pie}
            style={{ backgroundColor: "white", marginTop: "20px" }}
          >
            <PieChart
              data={{
                January: "30",
                February: "40",
                March: "60",
                May: "70",
                Sebtember: "87",
              }}
              label={"Buyurtma qilingan mahsulotlar"}
              title={"Buyurtma qilingan mahsulotlar"}
            />
          </div>
        </div>
        <div className={singleScss.date}>
          <DateFilter onChange={onChange} value={dateValue} />
        </div>
        <div className={singleScss.orderTable}>
          <CustomTable
            {...{
              columns: columns1,
              items: items1,
              title: "Buyurtmalar tarixi",
              minHeigth: "230px",
              hasStatus: true,
              hasDelete: true,
              scrollY: true,
              height: 230,
              hideColumns: true,
              hasPagination: true,
            }}
          />
        </div>
      </div>
    </>
  );
};
export default ManagerSingleClient;

import React from "react";
import profileScss from "./profile.module.scss";
import CustomTable from "components/table";
import { Button } from "antd";
import DateFilter from "components/dateFilter";
import { useState } from "react";
import ProfileData from "./profileData";
function Profile() {
  const [dateValue, setDateValue] = useState("");
  const onChange = (value) => {
    setDateValue(value);
    console.log(dateValue);
  };
  const columns1 = [
    {
      key: 1,
      title: "task",
      dataIndex: "task",
      sorter: (a, b) => a.task.localeCompare(b.task),
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
      task: "Xodimlar bn uchrashuv",
      date: "14.03.24",
      address: "New York No. 1 Lake Park",
    },
    {
      id: "2",
      task: "Suxbat qilish",
      date: "15.03.24",
      address: "London No. 1 Lake Park",
    },
    {
      id: "3",
      task: "Mahsulotni sotish",
      date: "16.03.24",
      address: "London No. 1 Lake Park",
    },

    {
      id: "4",
      task: "Mahsulotni sotib olish",
      date: "17.03.24",
      address: "London No. 1 Lake Park",
    },
    {
      id: "5",
      task: "Mahsulotni tanlash",
      date: "13.03.24",
      address: "London No. 1 Lake Park",
    },

    {
      id: "6",
      task: "Mahsulotni qidirish",
      date: "14.03.24",
      address: "London No. 1 Lake Park",
    },
    {
      id: "7",
      task: "Xodimlar bn ishlash",
      date: "14.03.24",
      address: "London No. 1 Lake Park",
    },
    {
      id: "8",
      task: "Ularga vazifa berish",
      date: "14.03.24",
      address: "London No. 1 Lake Park",
    },
    {
      id: "9",
      task: "Vazifani bajartirish",
      date: "14.03.24",
      address: "London No. 1 Lake Park",
    },
    {
      id: "10",
      task: "Ishlash",
      date: "29.03.24",
      address: "London No. 1 Lake Park",
    },
  ];
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
  const userProfile = {
    name: "Abdunabi Abduvaxobov",
    job: "Ombor manageri",
    profileImg:
      "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
    phoneNumber: "+998905200350",
    lavozim: "Ombor manageri",
    salary: 10000000,
    status: true,
    adress: "Shifokorlar 70/89",
    branch: "Fergana branch",
    KPI: 1000000,
  };
  return (
    <div className="container">
      <div className={profileScss.biggest_wrapper}>
        <div className={profileScss.flex_div}>
          <ProfileData userProfile={userProfile}/>
          <div className={profileScss.table}>
            <CustomTable
              {...{
                columns: columns1,
                items: items1,
                title: "Topshiriqlar",
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
        <div>
          <div className={profileScss.date}>
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
}
export default Profile;

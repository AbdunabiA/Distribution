import { Button, Input } from "antd";
import { ProductsSendForm } from "components/forms";
import { CustomInput } from "components/inputs";
import { usePost } from "crud";
import { Field, FieldArray } from "formik";
import { ContainerForm } from "modules";
import { userProfile } from "assets/db";
import Profile from "pages/profile";
const ManagerArchive = () => {
  const columns = [
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
  const items = [
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
  const items1 = [
    {
      id: "1",
      name: "Mordayev Akmaljon",
      month: "Yanvar",
      salary: 2000000,
      bonus: 30000,
      jarima: 50000,
      jami: function() {
        return this.salary + this.bonus - this.jarima;
      },
    },
    {
      id: "2",
      name: "Mordayev Akmaljon",
      month: "Fevral",
      salary: 3000000,
      bonus: 400000,
      jarima: 50000,
      jami: function() {
        return this.salary + this.bonus - this.jarima;
      },
    },

    {
      id: "3",
      name: "Mordayev Akmaljon",
      month: "Mart",
      salary: 4000000,
      bonus: 500000,
      jarima: 50000,
      jami: function() {
        return this.salary + this.bonus - this.jarima;
      },
    },
    {
      id: "4",
      name: "Mordayev Akmaljon",
      month: "Aprel",
      salary: 2000000,
      bonus: 600000,
      jarima: 50000,
      jami: function() {
        return this.salary + this.bonus - this.jarima;
      },
    },
    {
      id: "5",
      name: "Mordayev Akmaljon",
      month: "May",
      salary: 2000000,
      bonus: 700000,
      jarima: 50000,
      jami: function() {
        return this.salary + this.bonus - this.jarima;
      },
    },
  ];
  const processedItems1 = items1.map((item) => ({
    ...item,
    jami: item.jami(),
  }));
  const columns1 = [
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
  return (
    <div className="container">
      <Profile
        tableRight={true}
        tableBottom={true}
        data={userProfile}
        btnText={"O’zgartirish"}
        columns={columns}
        items={items}
        items1={processedItems1}
        columns1={columns1}
      />
    </div>
  );
};
export default ManagerArchive;

import { DownOutlined } from "@ant-design/icons";
import { Button, Space, Table } from "antd";
import Cards from "components/cards";
import DateFilter from "components/dateFilter";
import { useState } from "react";
import s from "./employee.module.scss";
import CustomTable from "components/table";
// import PlusIcon from 'assets/icons/PlusIcon';
import PlusIcon from "assets/icons/PlusIcon.svg?react";

const Employee = () => {
  const columns = [
    {
      key: 1,
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      key: 2,
      title: "Age",
      dataIndex: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      key: 3,
      title: "Address",
      dataIndex: "address",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value, record) => record.address.startsWith(value),
      filterSearch: true,
      width: "30%",
      responsive: ["md"],
    },
  ];

  const items = [
    {
      id: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      id: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      id: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
    },
    {
      id: "4",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park",
    },
    {
      id: "5",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park",
    },
    {
      id: "6",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park",
    },
    {
      id: "7",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park",
    },
  ];

  const [dateValue, setDateValue] = useState("");
  const onChange = (value) => {
    setDateValue(value);
    console.log(dateValue);
  };
  return (
    <div className="container">
      <DateFilter onChange={onChange} value={dateValue} />
      <Cards />
      {/* <PlusIcon /> */}
      <CustomTable
        {...{
          columns,
          items,
          title: "Xodimlar ro'yxati",
          buttons: [
            <Button icon={<PlusIcon />} key={1} type="primary">
              Xodim qo'shish
            </Button>,
          ],
          hasDelete: true,
          hasStatus: true,
          hasUpdate: true,
          hideColumns: true,
          hasPagination: true,
        }}
      />
    </div>
  );
};
export default Employee;

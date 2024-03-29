import { YMaps, Map, Placemark, GeolocationControl } from "@pbe/react-yandex-maps";
import CustomTable from "components/table";
import { useState } from "react";
import { Checkbox, Button, Input, Dropdown} from 'antd'


const GoogleMaps = () => {
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
  
  
  return (
    <div className="container">
      <Button type="primary">Hello</Button>
      <CustomTable
        {...{
          columns,
          items,
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

export default GoogleMaps;

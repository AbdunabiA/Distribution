import { useState } from "react";
import DateFilter from "components/dateFilter";
import LineGraph from "components/charts/lineGraph";
import CustomTable from "components/table";
import { Button } from "antd";
import { useNavigate } from 'react-router-dom';
const ManagerClients = () => {
  const [dateValue, setDateValue] = useState("");
  // const history = useHistory(); // Initialize useHistory hook
  const navigate = useNavigate()
  const onChange = (value) => {
    setDateValue(value);
    console.log(dateValue);
  };
  
  const handleColumnClick = () => {
    navigate('/clients/single');
  };
  const items2 = [
    {
      id: "1",
      famismshar: "Mordayev Akmaljon",
      telefonraqam: +998905200350,
      manzil: "Tashkent",
      status: "active",
      filial: "Novza",
    },
    {
      id: "2",
      famismshar: "Mordayev Akmaljon",
      telefonraqam: +998905200350,
      manzil: "Tashkent",
      status: "active",
      filial: "Novza",
    },

    {
      id: "3",
      famismshar: "Mordayev Akmaljon",
      telefonraqam: +998905200350,
      manzil: "Tashkent",
      status: "active",
      filial: "Novza",
    },
    {
      id: "4",
      famismshar: "Mordayev Akmaljon",
      telefonraqam: +998905200350,
      manzil: "Tashkent",
      status: "active",
      filial: "Novza",
    },
    {
      id: "5",
      famismshar: "Mordayev Akmaljon",
      telefonraqam: +998905200350,
      manzil: "Tashkent",
      status: "active",
      filial: "Novza",
    },
  ];
  const columns2 = [
    {
      key: 1,
      title: "F.I.SH",
      dataIndex: "famismshar",
      sorter: (a, b) => a.famismshar.localeCompare(b.famismshar),
    },
    {
      key: 2,
      title: "Telefon raqam",
      dataIndex: "telefonraqam",
      sorter: (a, b) => a.telefonraqam.localeCompare(b.telefonraqam),
    },
    {
      key: 3,
      title: "Manzil",
      dataIndex: "manzil",
      sorter: (a, b) => a.manzil - b.manzil,
    },
    {
      key: 4,
      title: "Status",
      dataIndex: "status",
      sorter: (a, b) => a.status - b.status,
    },
    {
      key: 5,
      title: "Filial",
      dataIndex: "filial",
      sorter: (a, b) => a.filial - b.filial,
    },
  ];
  return (
    <>
      <div>
        <div style={{ margin: "32px 20px" }}>
          <DateFilter onChange={onchange} value={dateValue} />
        </div>
        <div>
          <LineGraph
            data={[
              {
                label: "Mijozlar o'sishi",
                January: "14",
                February: "13",
                March: "60",
                May: "76",
                Sebtember: "87",
                December: "90",
              },
            ]}
            title={"Mijozlar o'sish grafigi"}
            label={"Daromad osishi"}
          />
        </div>
        <div style={{ margin: "32px 10px" }}>
          <CustomTable
            {...{
              columns: columns2,
              items: items2,
              onClick:handleColumnClick,  
              title: "Mijozlar ro’yxati (20 000)",
              minHeigth: "230px",
              scrollY: true,
              height: 230,
              hideColumns: true,
              hasPagination: true,
              buttons: [<Button type="primary">+ mijoz qo'shish</Button>],
            }}
          />
        </div>
      </div>
    </>
  );
};
export default ManagerClients;

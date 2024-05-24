import Loader from "components/loader";
import CustomTable from "components/table";
import dayjs from "dayjs";
import { GetAll } from "modules";
import { useParams } from "react-router-dom";

const columns = [
  {
    key: "product",
    title: "Mahsulot",
    dataIndex: "product",
    render: (text, record) => <span>{record?.product?.product?.name}</span>,
  },
  {
    key: "amount",
    title: "Miqdori",
    dataIndex: "amount",
  },
  {
    key: "total_price",
    title: "Umumiy narxi",
    dataIndex: "total_price",
  },
  {
    key: "deadline",
    title: "Deadline",
    dataIndex: "deadline",
    render: (text) => dayjs(text).format("DD/MM/YYYY"),
  },
  {
    key: "driver",
    title: "Yetkazib beruvchi",
    dataIndex: "driver",
    render: (text, record) => text?.first_name + " " + text?.last_name,
  },
  {
    key: "customer",
    title: "Mijoz",
    dataIndex: "customer",
    render: (text, record) => text?.name,
  },
  {
    key: "operator",
    title: "Operator",
    dataIndex: "operator",
    render: (text, record) => text?.first_name + " " + text?.last_name,
  },
  {
    key: "status",
    title: "Status",
    dataIndex: "status",
  },
];

const ManagerBranchOrders = () => {
  const { branchId } = useParams();

  return (
    <GetAll
      url={`/warehouses/${branchId}/orders`}
      queryKey={["warehouses_orders"]}
    >
      {({ data, isLoading, isError, error }) => {
        if (isLoading) return <Loader />;
        if (isError) return <h1>Error</h1>;
        return (
          <div className="container">
            <CustomTable columns={columns} items={data?.data?.results} />
          </div>
        );
      }}
    </GetAll>
  );
};

export default ManagerBranchOrders;

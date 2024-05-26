import Loader from "components/loader";
import CustomTable from "components/table";
import dayjs from "dayjs";
import { GetAll } from "modules";
import { useLocation, useParams } from "react-router-dom";
import { formatNums } from "services/formatNums";
import qs from "qs";
import { get } from "lodash";

const columns = [
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

const ManagerBranchOrders = () => {
  const { branchId } = useParams();
  const location = useLocation();
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });

  return (
    <GetAll
      url={`/warehouses/${branchId}/orders`}
      queryKey={["warehouses_orders"]}
      params={{ page: +get(params, "page", 1) }}
    >
      {({ data, isLoading, isError, error }) => {
        if (isLoading) return <Loader />;
        if (isError) return <h1>Error</h1>;
        console.log(data?.data);
        return (
          <div className="container">
            <CustomTable
              title={`Filial buyurtmalari: ${data?.data?.count}`}
              columns={columns}
              items={data?.data?.results}
              hasPagination
              meta={{ total: data?.data?.count }}
              height={"300px"}
              minHeight={"250px"}
              scrollY
            />
          </div>
        );
      }}
    </GetAll>
  );
};

export default ManagerBranchOrders;

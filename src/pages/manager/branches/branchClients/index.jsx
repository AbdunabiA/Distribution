import DateFilter from "components/dateFilter";
import Loader from "components/loader";
import CustomTable from "components/table";
import { GetAll } from "modules";
import { useLocation, useParams } from "react-router-dom";
import qs from "qs";
import { get } from "lodash";

const columns = [
  {
    key: 0,
    title: "#",
    width: "70px",
    render: (a, b, i) => i + 1,
  },
  {
    key: "name",
    title: "Nomi",
    dataIndex: "name",
  },
  {
    key: "phone",
    title: "Telefon",
    dataIndex: "phone",
  },
  {
    key: "address",
    title: "Manzil",
    dataIndex: "address",
  },
  {
    key: "status",
    title: "Status",
    dataIndex: "status",
  },
];

const ManagerBranchClients = () => {
  const location = useLocation();
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const { branchId } = useParams();
  return (
    <GetAll
      url={`/warehouses/${branchId}/customers`}
      queryKey={["branchCustomers"]}
      params={{ page: +get(params, "page", 1) }}
    >
      {({ data, isLoading, isError, error }) => {
        if (isLoading) return <Loader />;
        if (isError) return <h1>{error.message}</h1>;
        return (
          <div className="container">
            {/* <DateFilter /> */}

            <div style={{ marginTop: 20 }}>
              <CustomTable
                columns={columns}
                title={`Filial mijozlari:${data?.data?.count}`}
                hasPagination
                meta={{ total: data?.data?.count }}
                height={"300px"}
                minHeight={"250px"}
                scrollY
                items={data?.data?.results}
              />
            </div>
          </div>
        );
      }}
    </GetAll>
  );
};

export default ManagerBranchClients;

import DateFilter from "components/dateFilter";
import Loader from "components/loader";
import CustomTable from "components/table";
import { GetAll } from "modules";
import { useParams } from "react-router-dom";

const columns = [
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
  const { branchId } = useParams();
  return (
    <GetAll
      url={`/warehouses/${branchId}/customers`}
      queryKey={["branchCustomers"]}
    >
      {({ data, isLoading, isError, error }) => {
        if (isLoading) return <Loader />;
        if (isError) return <h1>{error.message}</h1>;
        console.log(data?.data);
        return (
          <div className="container">
            <DateFilter />

            <div style={{ marginTop: 20 }}>
              <CustomTable columns={columns} items={data?.data} />
            </div>
          </div>
        );
      }}
    </GetAll>
  );
};

export default ManagerBranchClients;

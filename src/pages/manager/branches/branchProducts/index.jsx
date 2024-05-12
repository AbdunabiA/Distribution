import DateFilter from "components/dateFilter";
import Loader from "components/loader";
import CustomTable from "components/table";
import { GetAll } from "modules";
import { useParams } from "react-router-dom";

const columns = [
  {
    key: "product",
    title: "Nomi",
    dataIndex: "product",
    render: (text, record) => text?.name,
  },
  {
    key: "amount",
    title: "Miqdori",
    dataIndex: "amount",
  },
  {
    key: "invalids_amount",
    title: "Yaroqsiz miqdori",
    dataIndex: "invalids_amount",
  },
  {
    key: "warehouse",
    title: "Filial",
    dataIndex: "warehouse",
    render: (text, record) => text?.name,
  },
  {
    key: "added_by",
    title: "Qo'shgan",
    dataIndex: "added_by",
    // render: (text, record) => text?.first_name + " " + text?.last_name,
  },
];

const ManagerBranchProducts = () => {
  const { branchId } = useParams();
  return (
    <GetAll
      url={`/warehouses/${branchId}/products`}
      queryKey={["branchProducts"]}
    >
      {({ data, isLoading, isError, error }) => {
        if (isLoading) return <Loader />;
        if (isError) return <h1>{error.message}</h1>;
        console.log(data?.data);
        return (
          <div className="container">
            <DateFilter />
            <div style={{ marginTop: 20 }}>
              <CustomTable
                hideColumns
                title={"Filial mahsulotlari"}
                columns={columns}
                items={data?.data}
              />
            </div>
          </div>
        );
      }}
    </GetAll>
  );
};

export default ManagerBranchProducts;

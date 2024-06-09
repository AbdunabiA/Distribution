import DateFilter from "components/dateFilter";
import Loader from "components/loader";
import CustomTable from "components/table";
import { GetAll } from "modules";
import { useLocation, useParams } from "react-router-dom";
import qs from "qs";
import { get } from "lodash";



const ManagerBranchProducts = () => {
  const location = useLocation();
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const { branchId } = useParams();
  const columns = [
    {
      key: "num",
      title: "№",
      width: "70px",
      render: (text, record, index) => {
        // Calculate the correct index considering pagination
        const orderNumber = (get(params, "page", 1) - 1) * 10 + index + 1;
        return orderNumber;
      },
    },
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
      key: "jami",
      title: "Jami Summa",
      dataIndex: "total_sum",
    },
  ];
  return (
    <GetAll
      url={`/warehouses/${branchId}/products`}
      queryKey={["branchProducts"]}
      params={{ page: +get(params, "page", 1) }}
    >
      {({ data, isLoading, isError, error }) => {
        if (isLoading) return <Loader />;
        if (isError) return <h1>{error.message}</h1>;
        // console.log(data?.data);
        return (
          <div className="container">
            {/* <DateFilter /> */}
            <div style={{ marginTop: 20 }}>
              <CustomTable
                hideColumns
                title={`Filial mahsulotlari: ${data?.data?.count}`}
                columns={columns}
                hasPagination
                meta={{ total: data?.data?.count }}
                height={"300px"}
                minHeight={"250px"}
                scrollY
                scrollX={"800px"}
                items={data?.data?.results}
              />
            </div>
          </div>
        );
      }}
    </GetAll>
  );
};

export default ManagerBranchProducts;

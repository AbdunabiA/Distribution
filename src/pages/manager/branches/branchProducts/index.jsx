import DateFilter from "components/dateFilter";
import Loader from "components/loader";
import { GetAll } from "modules";
import { useParams } from "react-router-dom";

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
          </div>
        );
      }}
    </GetAll>
  );
};

export default ManagerBranchProducts;

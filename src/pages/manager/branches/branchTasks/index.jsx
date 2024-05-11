import DateFilter from "components/dateFilter";
import Loader from "components/loader";
import CustomTable from "components/table";
import { GetAll } from "modules";
import { useParams } from "react-router-dom";

const ManagerBranchTasks = () => {
  const { branchId } = useParams();
  return (
    <GetAll url={`/warehouses/${branchId}/tasks`} queryKey={["branchTasks"]}>
      {({ data, isLoading, isError, error }) => {
        if (isLoading) return <Loader />;
        if (isError) return <h1>Error</h1>;
        console.log(data?.data);
        return (
          <div className="container">
            <DateFilter />
            {/* <CustomTable /> */}
          </div>
        );
      }}
    </GetAll>
  );
};

export default ManagerBranchTasks;

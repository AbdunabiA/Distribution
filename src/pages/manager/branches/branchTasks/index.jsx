import DateFilter from "components/dateFilter";
import Loader from "components/loader";
import CustomTable from "components/table";
import { GetAll } from "modules";
import { useParams } from "react-router-dom";
const columns = [
  {
    key: 0,
    title: "#",
    width: "70px",
    render: (a, b, i) => i + 1,
  },
  {
    key: 1,
    title: "Task",
    dataIndex: "text",
  },
  {
    key: 2,
    title: "Berilgan sana",
    dataIndex: "created_at",
  },
  {
    key: 3,
    title: "Deadline",
    dataIndex: "deadline",
  },
  {
    key: 4,
    title: "Status",
    dataIndex: "status",
  },
];
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
          <div className="container">
            <DateFilter />
            {/* <CustomTable /> */}
          </div>
          <div>
          <CustomTable
            {...{
              columns: columns,
              items: data?.data?.results,
              isLoading: isLoading,
              title: `Topshiriqlar soni : ${data?.data?.results ? data?.data?.results.length : ''}`,
              minHeigth: "230px",
              hideColumns: true,
              // scrollY: true,
              height: 330,
              // hasPagination: true,
            }}  
          />
          </div>
          </div>
        );
      }}
    </GetAll>
  );
};

export default ManagerBranchTasks;

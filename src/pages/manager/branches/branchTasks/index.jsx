import DateFilter from "components/dateFilter";
import Loader from "components/loader";
import CustomTable from "components/table";
import { GetAll } from "modules";
import { useLocation, useParams } from "react-router-dom";
import qs from "qs";
import { get } from "lodash";

const ManagerBranchTasks = () => {
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
  return (
    <GetAll
      url={`/warehouses/${branchId}/tasks`}
      queryKey={["branchTasks"]}
      params={{ page: +get(params, "page", 1) }}
    >
      {({ data, isLoading, isError, error }) => {
        if (isLoading) return <Loader />;
        if (isError) return <h1>Error</h1>;
        console.log(data?.data);
        return (
          <div className="container">
            <div className="container">{/* <DateFilter /> */}</div>
            <div>
              <CustomTable
                {...{
                  hasPagination: true,
                  meta: { total: data?.data?.count },
                  columns: columns,
                  items: data?.data?.results,
                  isLoading: isLoading,
                  title: `Topshiriqlar soni : ${data?.data?.count}`,
                  minHeigth: "230px",
                  hideColumns: true,
                  scrollY: true,
                  height: 330,
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

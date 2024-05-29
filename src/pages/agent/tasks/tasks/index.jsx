import CustomTable from "components/table";
import { useGet } from "crud";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import qs from "qs";
const columns1 = [
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
    title: "Deadline",
    dataIndex: "deadline",
    sorter: (a, b) => a.deadline.localeCompare(b.deadline),
  },
];

const AgentsTasks = () => {
  const location = useLocation();
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const { data: userData } = useSelector((store) => store.auth);
  let id = userData.id;
  const { data: olinganTaskData, isLoading: berilganTasksLoading } = useGet({
    url: `/users/olgan_tasklari/${id}`,
    queryKey: [`/users/olgan_tasklari/${id}`],
    params: { page: +get(params, "page", 1) },
  });
  return (
    <div className="container">
      <CustomTable
        {...{
          columns: columns1,
          items: olinganTaskData?.data?.results,
          title: `Topshiriqlar soni: ${olinganTaskData?.data.count}`,
          minHeight: 340,
          // hasStatus: true,
          scrollY: true,
          scrollX: true,
          height: "100%",
          hideColumns: true,
          hasPagination: true,
          meta: { total: olinganTaskData?.data?.count },
        }}
      />
    </div>
  );
};

export default AgentsTasks;

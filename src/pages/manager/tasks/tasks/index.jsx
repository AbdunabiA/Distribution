import { useState } from "react";
import DateFilter from "components/dateFilter";
import { LineGraph } from "components/charts";
import CustomTable from "components/table";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { data } from "assets/db";
import { useQueryClient } from "@tanstack/react-query";
import { useGet, usePost } from "crud";
import { toast } from "sonner";
import { CreateClient } from "components/forms/createClient";
import PlusIcon from "assets/icons/PlusIcon.svg?react";
const columns = [
  {
    key: 1,
    title: "Task",
    dataIndex: "text",
    sorter: (a, b) => a.text.localeCompare(b.text),
  },
  {
    key: 2,
    title: "Berilgan sana",
    dataIndex: "created_at",
    sorter: (a, b) => a.created_at.localeCompare(b.created_at),
  },
  {
    key: 3,
    title: "Deadline",
    dataIndex: "deadline",
    sorter: (a, b) => a.deadline - b.deadline,
  },
  {
    key: 4,
    title: "status",
    dataIndex: "status",
    sorter: (a, b) => a.status - b.status,
  },
];
const ManagerTasks = () => {
  const [dateValue, setDateValue] = useState("");
  const onChange = (value) => {
    setDateValue(value);
    console.log(dateValue);
  };
  const { data, isLoading } = useGet({
    url: "/tasks/all/",
    queryKey: ["/tasks/all/"],
  });
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div className="container">
      <div style={{ margin: "32px 10px" }}>
          <DateFilter onChange={onchange} value={dateValue} />
        </div>
        <div>
        <CustomTable
              {...{
                columns: columns,
                items: data?.data,
                hasDelete: true,
                hasUpdate: true,
                title: `Topshiriqlar ro’yxati ${data?.data.length}`,
                minHeigth: "230px",
                // onRowNavigationUrl: `/clients/`,
                hideColumns: true,
                // deleteAction: (data) =>
                  // deleteClient({
                    //   url: `/customers/${data.id}/detail`,
                    //   method: "delete",
                    //   onSuccess: () => {
                      //     queryClient.invalidateQueries("/customers/all/");
                      //     toast.success("Client o'chirildi");
                      //   },
                      //   onError: () => toast.error("Client o'chirilmadi"),
                      // }),
                      // updateAction: (data) =>
                        //   setModal({ isOpen: true, form: "client", data: data }),
                      // scrollY: true,
                // hasPagination: true,
                buttons: [
                  <Button
                    icon={<PlusIcon/>}
                    type="primary"
                    key={"task"}
                    // onClick={() =>
                    //   setModal({ isOpen: true, form: "client", data: null })
                    // }
                  >
                     Topshiriq qo'shish
                  </Button>,
                ],
              }}
            />
        </div>
    </div>
  )
}

export default ManagerTasks
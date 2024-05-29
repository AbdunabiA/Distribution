import { Button, Modal } from "antd";
import DateFilter from "components/dateFilter";
import CustomTable from "components/table";
import { GetAll } from "modules";
import PlusIcon from "assets/icons/PlusIcon.svg?react";
import Loader from "components/loader";
import { useQueryClient } from "@tanstack/react-query";
import { usePost } from "crud";
import { toast } from "sonner";
import { useState } from "react";
import { CreateOrder } from "components/forms";
import { useLocation } from "react-router-dom";
import qs from 'qs'
import { get } from "lodash";


const OperatorDrivers = () => {
    const location = useLocation();
    const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const queryClient = useQueryClient();
  const [orderModal, setOrderModal] = useState({isOpen:false, data:null})
  const { mutate: deleteUsers } = usePost();
  const employeeColumns = [
  {
    key: 0,
    title: "#",
    width: "70px",
    render: (a, b, i) => i + 1,
  },
  {
    key: "name",
    title: "Ism",
    render: (_, row) => `${row.first_name + " " + row.last_name}`,
  },
  {
    key: "username",
    title: "Username",
    dataIndex: "username",
  },
  {
    key: "status",
    title: "Status",
    dataIndex: "status",
  },
  {
    key: "role",
    title: "Role",
    dataIndex: "role",
  },
  {
    key: "number",
    title: "Tel raqam",
    dataIndex: "phone_number",
  },
  {
    key: "warehouse",
    title: "Filial",
    dataIndex: "warehouse",
    render: (text) => text?.name,
  },
  {
    key: "addOrder",
    title: "Buyurtma qo'shish",
    render: (_, row) => <Button type="primary" onClick={(e) => {
      e.stopPropagation();
      setOrderModal({ isOpen: true, data: {driver:row} })}}>Buyurtma qo'shish</Button>,
  },
];
  return (
    <GetAll
      queryKey={["/users/drivers/"]}
      url={"/users/all/"}
      params={{ extra: { role: "driver" }, page: +get(params, 'page', 1) }}
    >
      {({ data, isLoading, isError, error }) => {
        if (isLoading) return <Loader />;
        if (isError) return <h1>Error</h1>;
        console.log(data);
        return (
          <div className="container">
            <div style={{ marginTop: "20px" }}>
              <Modal
                open={orderModal.isOpen}
                destroyOnClose
                centered
                footer={false}
                onCancel={() => setOrderModal({ isOpen: false, data: null })}
              >
                <CreateOrder data={orderModal.data} setModal={setOrderModal} />
              </Modal>
              <CustomTable
              hasPagination
              meta={{total:data?.data?.count}}
                columns={employeeColumns}
                items={data?.data?.results}
                title={`Xodimlar soni: ${data?.data?.count}`}
                hideColumns
                height={300}
                minHeight={"200px"}
                scrollY
                scrollX
                onRowNavigationUrl={"/employee/"}
                isLoading={isLoading}
              />
            </div>
          </div>
        );
      }}
    </GetAll>
  );
};

export default OperatorDrivers;

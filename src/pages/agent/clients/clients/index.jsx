import { Button, Modal } from "antd";
import { CreateClient } from "components/forms/createClient";
import Loader from "components/loader";
import CustomTable from "components/table";
import { GetAll } from "modules";
import { useState } from "react";
import { useSelector } from "react-redux";
import PlusIcon from "assets/icons/PlusIcon.svg?react";
import { useLocation } from "react-router-dom";
import qs from 'qs'

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
const AgentClients = () => {
  const location = useLocation();
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const [modal, setModal] = useState({ isOpen: false, data: null });
  const { data: userData } = useSelector((store) => store.auth);
  let branchId = userData?.warehouse?.id;
  return (
    <GetAll
      url={`/warehouses/${branchId}/customers`}
      queryKey={["branchCustomers"]}
      params={{ page: +get(params, "page", 1) }}
    >
      {({ data, isLoading, isError, error }) => {
        if (isLoading) return <Loader />;
        if (isError) return <h1>{error.message}</h1>;
        console.log(data?.data);
        return (
          <div className="container">
            {/* <DateFilter /> */}
            <Modal
              destroyOnClose
              centered
              footer={false}
              open={modal.isOpen}
              onCancel={() => setModal({ isOpen: false, data: null })}
            >
              <CreateClient {...{ setModal, data: modal.data }} />
            </Modal>
            <div style={{ marginTop: 20 }}>
              <CustomTable
                hasPagination
                meta={{ total: data?.data?.count }}
                title={`Filial mijozlari: ${data?.data?.count}`}
                columns={columns}
                items={data?.data?.results}
                buttons={[
                  <Button
                    icon={<PlusIcon />}
                    type="primary"
                    key={"client"}
                    onClick={() =>
                      setModal({
                        isOpen: true,
                        data: { warehouse: { id: branchId } },
                      })
                    }
                  >
                    Mijoz qo'shish
                  </Button>,
                ]}
              />
            </div>
          </div>
        );
      }}
    </GetAll>
  );
};

export default AgentClients;

import { useState } from "react";
import DateFilter from "components/dateFilter";
import CustomTable from "components/table";
import { Button, Modal } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { useGet, usePost } from "crud";
import { toast } from "sonner";
import { CreateClient } from "components/forms/createClient";
import PlusIcon from "assets/icons/PlusIcon.svg?react";
import Loader from "components/loader";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import qs from 'qs'
import { get } from "lodash";

const columns2 = [
  {
    key: 0,
    title: "#",
    width: "70px",
    render: (a, b, i) => i + 1,
  },
  {
    key: 1,
    title: "name",
    dataIndex: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    key: 2,
    title: "phone",
    dataIndex: "phone",
    sorter: (a, b) => a.phone.localeCompare(b.phone),
  },
  {
    key: 3,
    title: "address",
    dataIndex: "address",
    sorter: (a, b) => a.address - b.address,
  },
  {
    key: 4,
    title: "Status",
    dataIndex: "status",
    sorter: (a, b) => a.status - b.status,
  },
  {
    key:5,
    title: "Qo'shgan",
    dataIndex: "added_by",
    render: (text, record) => text?.first_name + " " + text?.last_name,
  },
];

const OperatorClients = () => {
    const location = useLocation();
    const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const { data: userData } = useSelector((state) => state.auth);
  const [modal, setModal] = useState({ isOpen: false, data: null });
  const { data, isLoading } = useGet({
    url: `/warehouses/${userData?.warehouse?.id}/customers/`,
    queryKey: [`/warehouses/${userData?.warehouse?.id}/customers/`],
    params:{page: +get(params, 'page', 1)}
  });
  const queryClient = useQueryClient();
  const { mutate: deleteClient } = usePost();
  console.log(data?.data);
  return (
    <>
      <div className="container">
        {/* <div style={{ margin: "32px 20px" }}>
          <DateFilter onChange={onchange} value={dateValue} />
        </div> */}
        {/* <div> */}
        {/* <LineGraph
          //   data={[
          //     {
          //       label: "Mijozlar o'sishi",
          //       January: "14",
          //       February: "13",
          //       March: "60",
          //       May: "76",
          //       Sebtember: "87",
          //       December: "90",
          //     },
          //   ]}
          //   title={"Mijozlar o'sish grafigi"}
          //   label={"Daromad osishi"}
          // /> */}
        {/* </div> */}
        <div style={{ margin: "32px 10px" }}>
          <Modal
            destroyOnClose
            centered
            footer={false}
            open={modal.isOpen}
            onCancel={() => setModal({ isOpen: false, data: null })}
          >
            <CreateClient {...{ setModal, data: modal.data }} />
          </Modal>
          {isLoading ? (
            <Loader />
          ) : (
            <CustomTable
              {...{
                hasPagination:true,
                meta:{total:data?.data?.count},
                columns: columns2,
                items: data?.data?.results,
                hasDelete: true,
                hasUpdate: true,
                title: `Mijozlar soni: ${data?.data?.count}`,
                minHeigth: "230px",
                height: 350,
                scrollY: true,
                onRowNavigationUrl: `/clients/`,
                hideColumns: true,
                deleteAction: (data) =>
                  deleteClient({
                    url: `/customers/${data.id}/detail`,
                    method: "delete",
                    onSuccess: () => {
                      queryClient.invalidateQueries("/customers/all/");
                      toast.success("Client o'chirildi");
                    },
                    onError: () => toast.error("Client o'chirilmadi"),
                  }),
                updateAction: (data) =>
                  setModal({ isOpen: true, form: "client", data: data }),
                // hasPagination: true,
                buttons: [
                  <Button
                    icon={<PlusIcon />}
                    type="primary"
                    key={"client"}
                    onClick={() =>
                      setModal({ isOpen: true, form: "client", data: null })
                    }
                  >
                    mijoz qo'shish
                  </Button>,
                ],
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default OperatorClients;

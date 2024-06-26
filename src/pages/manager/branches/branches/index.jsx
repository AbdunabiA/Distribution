import { CreateWarehouse, ProductSend } from "components/forms";
import s from "./branches.module.scss";
import { GetAll } from "modules";
import DateFilter from "components/dateFilter";
import CustomTable from "components/table";
import { useState } from "react";
import { Button, Modal } from "antd";
import PlusIcon from "assets/icons/PlusIcon.svg?react";
import { BarChart, LineGraph, PieChart } from "components/charts";
import { usePost } from "crud";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import Loader from "components/loader";
import { useLocation } from "react-router-dom";
import qs from "qs";
import { get } from "lodash";

const ManagerBranches = () => {
  const location = useLocation();
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const [modal, setModal] = useState({ isOpen: false,  data: null });
  const [sendProdModal, setSendProdModal] = useState({
    isOpen: false,
    data: null,
  });

  const queryClient = useQueryClient();
  const { mutate: deleteBranch } = usePost();
  const branchesCoulmns = [
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
      key: "name",
      title: "Nomi",
      dataIndex: "name",
    },
    {
      key: "phone",
      title: "Tel. raqam",
      dataIndex: "phone",
    },
    {
      key: "address",
      title: "Manzil",
      dataIndex: "address",
    },
    {
      key: "created_at",
      title: "Ochilgan vaqt",
      dataIndex: "created_at",
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
    },
    {
      key: "productSend",
      title: "Mahsulot yuborish",
      render: (_, data) => {
        return (
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Button
              type="primary"
              onClick={(e) => {
                e.stopPropagation();
                setSendProdModal({ isOpen: true, data: data });
              }}
            >
              Yuborish
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <GetAll
      url={"/warehouses/all/"}
      queryKey={["/warehouses/all/"]}
      params={{ page: +get(params, "page", 1) }}
    >
      {({ data, isLoading, isError, error }) => {
        if (isLoading) return <Loader />;
        if (isError) return <h1>Error</h1>;
        return (
          <div className="container">
            <Modal
              open={sendProdModal.isOpen}
              centered
              destroyOnClose
              onCancel={() => setSendProdModal({ isOpen: false, data: null })}
              footer={false}
            >
              <ProductSend
                data={sendProdModal.data}
                setModal={setSendProdModal}
              />
            </Modal>
            <Modal
              destroyOnClose
              centered
              footer={false}
              open={modal.isOpen}
              onCancel={() =>
                setModal({ isOpen: false, data: null })
              }
            >
                <CreateWarehouse {...{ setModal, data: modal.data }} />
            </Modal>
            {/* <DateFilter /> */}
            <div style={{ marginTop: "20px" }}>
              <CustomTable
                hasPagination
                meta={{ total: data?.data?.count }}
                columns={branchesCoulmns}
                items={data?.data?.results}
                title={`Filiallar: ${data?.data?.count}`}
                hideColumns
                height={350}
                minHeight={"200px"}
                scrollY
                hasDelete
                hasUpdate
                deleteAction={(data) =>
                  deleteBranch({
                    url: `/warehouses/details/${data?.id}/`,
                    method: "delete",
                    onSuccess: () => {
                      toast.success("Filial o'chirildi");
                      toast.success("Filial nomi arxivlandi");
                      queryClient.invalidateQueries(["/warehouses/all/"]);
                    },
                    onError: (err) => toast.error(err?.message),
                  })
                }
                updateAction={(data) =>
                  setModal({ isOpen: true, form: "filial", data: data })
                }
                onRowNavigationUrl={"/branches/"}
                buttons={[
                  <Button
                    icon={<PlusIcon />}
                    key={1}
                    type="primary"
                    onClick={() =>
                      setModal({
                        isOpen: true,
                        form: "filial",
                        data: null,
                      })
                    }
                  >
                    Filial qo'shish
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

export default ManagerBranches;

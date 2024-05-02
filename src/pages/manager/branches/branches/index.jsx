import { CreateWarehouse, ProductSend } from "components/forms";
import s from "./branches.module.scss";
import { GetAll } from "modules";
import DateFilter from "components/dateFilter";
import CustomTable from "components/table";
import { useState } from "react";
import { Button, Modal } from "antd";
import PlusIcon from "assets/icons/PlusIcon.svg?react";
import { BarChart, LineGraph, PieChart } from "components/charts";

const ManagerBranches = () => {
  const [branchModal, setBranchModal] = useState({ isOpen: false, data: null });
  const [sendProdModal, setSendProdModal] = useState({
    isOpen: false,
    data: null,
  });
  const branchesCoulmns = [
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
      title: "Masulot yuborish",
      render: (_, data) => {
        return (
          <div style={{width:"100%",display:"flex", justifyContent:"center"}}>
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
    <GetAll url={"/warehouses/all/"} queryKey={["/warehouses/all/"]}>
      {({ data, isLoading, isError, error }) => {
        if (isLoading) return <h1>Loading</h1>;
        if (isError) return <h1>Error</h1>;
        console.log(data);
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
              open={branchModal.isOpen}
              centered
              destroyOnClose
              onCancel={() => setBranchModal({ isOpen: false, data: null })}
              footer={false}
            >
              <CreateWarehouse
                data={branchModal.data}
                setModal={setBranchModal}
              />
            </Modal>
            <DateFilter />
            <div style={{ marginTop: "20px" }}>
              <CustomTable
                columns={branchesCoulmns}
                items={data?.data}
                title={"Filiallar"}
                hideColumns
                hasDelete
                hasUpdate
                onRowNavigationUrl={"/branches/"}
                buttons={[
                  <Button
                    icon={<PlusIcon />}
                    key={1}
                    type="primary"
                    onClick={() => setBranchModal({ isOpen: true, data: null })}
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

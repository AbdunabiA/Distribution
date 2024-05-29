import CustomTable from "components/table";
import { Button, Modal } from "antd";
import { useState } from "react";
import { CreateProduct, CreateProductCategory } from "components/forms";
import { useGet, usePost } from "crud";
import PlusIcon from "assets/icons/PlusIcon.svg?react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import qs from "qs";
import { get } from "lodash";

const productsColumns = [
  {
    key: 1,
    title: "Nomi",
    dataIndex: "name",
  },
  {
    key: 2,
    title: "Narxi",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    key: 3,
    title: "Status",
    dataIndex: "status",
  },
  {
    key: 4,
    title: "Kategoriya",
    dataIndex: "category",
    render: (text, record) => text?.name,
  },
  // {
  //   key: 5,
  //   title: "Filial",
  //   dataIndex: "warehouse",
  //   render: (text, record) => text?.name,
  // },
];

const columns = [
  {
    key: "product",
    title: "Nomi",
    dataIndex: "product",
    render: (text, record) => text?.name,
  },
  {
    key: "amount",
    title: "Miqdori",
    dataIndex: "amount",
  },
  {
    key: "invalids_amount",
    title: "Yaroqsiz miqdori",
    dataIndex: "invalids_amount",
  },
  {
    key: "warehouse",
    title: "Filial",
    dataIndex: "warehouse",
    render: (text, record) => text?.name,
  },
  // {
  //   key: "added_by",
  //   title: "Qo'shgan",
  //   dataIndex: "added_by",
  //   // render: (text, record) => text?.first_name + " " + text?.last_name,
  // },
];

const SupervisorProducts = () => {
  const location = useLocation();
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const { data: userData } = useSelector((state) => state.auth);
  const { data: productsData, isLoading: productsLoading } = useGet({
    url: "/products/all/",
    queryKey: ["/products/all/"],
    params: { page : +get(params, "allProducts", 1)}
  });
  const { data: warehouseProducts, isLoading: warehouseProdLoading } = useGet({
    url: `/warehouses/${userData?.warehouse?.id}/products/`,
    queryKey: [`/warehouses/${userData?.warehouse?.id}/products/`],
    params: { page: +get(params, "warehouseProducts", 1) },
  });
  console.log(warehouseProducts?.data);
  return (
    <div className="container">
      <div>
        <CustomTable
          hideColumns
          title={`Filial mahsulotlari: ${warehouseProducts?.data?.count}`}
          columns={columns}
          minHeight={'220px'}
          height={"300px"}
          scrollY
          isLoading={warehouseProdLoading}
          items={warehouseProducts?.data?.results}
          hasPagination
          meta={{total:warehouseProducts?.data?.count}}
          onChangeNavigate={(page)=>{
            return {
              navigate: { warehouseProducts: page },
              paramsKey: "warehouseProducts",
            };
          }}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <CustomTable
          {...{
            isLoading: productsLoading,
            columns: productsColumns,
            height: 300,
            minHeight: "200px",
            scrollY: true,
            items: productsData?.data?.results,
            title: `Mahsulotlar soni : ${productsData?.data?.count}`,
            hideColumns: true,
            onRowNavigationUrl: "/products/",
            hasPagination:true,
            meta:{total: productsData?.data?.count},
            onChangeNavigate:(page)=>{
              return {
                navigate: { allProducts: page },
                paramsKey: "allProducts",
              };
            }
          }}
        />
      </div>
    </div>
  );
};

export default SupervisorProducts;

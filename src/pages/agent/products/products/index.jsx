import CustomTable from "components/table";
import { useGet } from "crud";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import qs from 'qs'

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

const AgentProducts = () => {
    const location = useLocation();
    const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const { data: userData } = useSelector((state) => state.auth);
  const { data: productsData, isLoading: productsLoading } = useGet({
    url: "/products/all/",
    queryKey: ["/products/all/"],
    params: { page: +get(params, "productsPage", 1) },
  });
  const { data: warehouseProducts, isLoading: warehouseProdLoading } = useGet({
    url: `/warehouses/${userData?.warehouse?.id}/products/`,
    queryKey: [`/warehouses/${userData?.warehouse?.id}/products/`],
    params: { page: +get(params, "wraehouseProductsPage", 1) },
  });
  return (
    <div className="container">
      <div>
        <CustomTable
          hideColumns
          title={`Filial mahsulotlari: ${warehouseProducts?.data?.count}`}
          columns={columns}
          isLoading={warehouseProdLoading}
          items={warehouseProducts?.data?.results}
          hasPagination
          meta={{total:warehouseProducts?.data?.count}}
          onChangeNavigate={(page) => {
              return {
                navigate: { wraehouseProductsPage: page },
                paramsKey: "wraehouseProductsPage",
              };
            }}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <CustomTable
          {...{
            hasPagination: true,
            meta: { total: productsData?.data?.count },
            onChangeNavigate: (page) => {
              return {
                navigate: { productsPage: page },
                paramsKey: "productsPage",
              };
            },
            isLoading: productsLoading,
            columns: productsColumns,
            height: 300,
            minHeight: "200px",
            scrollY: true,
            items: productsData?.data?.results,
            title: `Tizimdagi mahsulotlar soni : ${productsData?.data.count}`,
            hideColumns: true,
            onRowNavigationUrl: "/products/",
          }}
        />
      </div>
    </div>
  );
}

export default AgentProducts
import CustomTable from "components/table";
import { useGet } from "crud";
import { useSelector } from "react-redux";


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
  const { data: userData } = useSelector((state) => state.auth);
  const { data: productsData, isLoading: productsLoading } = useGet({
    url: "/products/all/",
    queryKey: ["/products/all/"],
  });
  const { data: warehouseProducts, isLoading: warehouseProdLoading } = useGet({
    url: `/warehouses/${userData?.warehouse?.id}/products/`,
    queryKey: [`/warehouses/${userData?.warehouse?.id}/products/`],
  });
  return (
    <div className="container">
      <div>
        <CustomTable
          hideColumns
          title={"Filial mahsulotlari"}
          columns={columns}
          isLoading={warehouseProdLoading}
          items={warehouseProducts?.data}
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
            items: productsData?.data,
            title: `Tizimdagi mahsulotlar soni : ${productsData?.data.length}`,
            hideColumns: true,
            onRowNavigationUrl: "/products/",
          }}
        />
      </div>
    </div>
  );
}

export default AgentProducts
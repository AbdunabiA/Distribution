import { Button } from "antd";
import CustomTable from "components/table";
import { GetAll } from "modules";
import Loader from "components/loader";
import DateFilter from "components/dateFilter";
import { useParams } from "react-router-dom";
import { useGet } from "crud";
import dayjs from "dayjs";
const categoriesColumns = [
  {
    key: 0,
    title: "#",
    width: "70px",
    render: (a, b, i) => i + 1,
  },
  {
    key: "name",
    title: "Nomi",
    dataIndex: "name",
  },
  {
    key: "status",
    title: "Status",
    dataIndex: "status",
  },
  {
    key: "created_at",
    title: "Qo'shilgan sana",
    dataIndex: "created_at",
    render: (date) => dayjs(date).format("YYYY-MM-DD"),
  },
];
const clientsColumns = [
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
];
const productsColumns = [
  {
    key: 0,
    title: "#",
    width: "70px",
    render: (a, b, i) => i + 1,
  },
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
];
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
];
const branchesCoulmns = [
  {
    key: 0,
    title: "#",
    width: "70px",
    render: (a, b, i) => i + 1,
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
  // {
  //   key: "productSend",
  //   title: "Mahsulot yuborish",
  //   render: (_, data) => {
  //     return (
  //       <div
  //         style={{ width: "100%", display: "flex", justifyContent: "center" }}
  //       >
  //         <Button
  //           type="primary"
  //           onClick={(e) => {
  //             e.stopPropagation();
  //             setSendProdModal({ isOpen: true, data: data });
  //           }}
  //         >
  //           Yuborish
  //         </Button>
  //       </div>
  //     );
  //   },
  // },
];
const ManagerArchive = () => {
  const {
    data: archivedCategories,
    isLoading: archivedCategoriesLoading,
  } = useGet({
    url: "/archived/categories/",
    queryKey: ["/archived/categories/"],
  });
  const { data: archivedClients, isLoading: archivedClientsLoading } = useGet({
    url: "/archived/customers/",
    queryKey: ["/archived/customers/"],
  });
  const { data: archivedProducts, isLoading: archivedProductsLoading } = useGet(
    {
      url: "/archived/products/",
      queryKey: ["/archived/products/"],
    }
  );
  const { data: archivedUsers, isLoading: archivedUsersLoading } = useGet({
    url: "/archived/users/",
    queryKey: ["/archived/users/"],
  });
  const {
    data: archivedWarehouses,
    isLoading: archivedWarehousesLoading,
  } = useGet({
    url: "/archived/warehouses/",
    queryKey: ["/archived/warehouses/"],
  });
  return (
    <div className="container">
      <DateFilter />
      {archivedCategoriesLoading || archivedClientsLoading || archivedProductsLoading || archivedWarehousesLoading ||archivedUsersLoading ? (
        <div style={{display:'flex', justifyContent:'center', height:'80vh', alignItems:'center'}}>
          <Loader/>
        </div>
      ) : (
        <>
        <div style={{ marginTop: 20 }}>
        <CustomTable
          hideColumns
          title={`Arxivlangan categoriyalar: ${
            archivedCategories?.data?.results
              ? archivedCategories?.data?.results.length
              : ""
          }`}
          columns={categoriesColumns}
          items={archivedCategories?.data?.results}
        />
      </div>
      <div style={{ marginTop: 20 }}>
        <CustomTable
          hideColumns
          title={`Arxivlangan mahsulotlar: ${
            archivedProducts?.data?.results
              ? archivedProducts?.data?.results.length
              : ""
          }`}
          columns={productsColumns}
          items={archivedProducts?.data?.results}
        />
      </div>
      <div style={{ marginTop: 20 }}>
        <CustomTable
          hideColumns
          title={`Arxivlangan mijozlar: ${
            archivedClients?.data?.results
              ? archivedClients?.data?.results.length
              : ""
          }`}
          columns={clientsColumns}
          items={archivedClients?.data?.results}
        />
      </div>
      <div style={{ marginTop: 20 }}>
        <CustomTable
          hideColumns
          title={`Arxivlangan xodimlar: ${
            archivedUsers?.data?.results
              ? archivedUsers?.data?.results.length
              : ""
          }`}
          columns={employeeColumns}
          items={archivedUsers?.data?.results}
        />
      </div>
      <div style={{ marginTop: 20 }}>
        <CustomTable
          hideColumns
          title={`Arxivlangan filiallar: ${
            archivedWarehouses?.data?.results
              ? archivedWarehouses?.data?.results.length
              : ""
          }`}
          columns={branchesCoulmns}
          items={archivedWarehouses?.data?.results}
        />
      </div>
        </>
      )}
    </div>
  );
};
export default ManagerArchive;

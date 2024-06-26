import { Button } from "antd";
import CustomTable from "components/table";
import { GetAll } from "modules";
import Loader from "components/loader";
import DateFilter from "components/dateFilter";
import { useParams, useLocation } from "react-router-dom";
import { useGet, usePost } from "crud";
import dayjs from "dayjs";
import qs from "qs";
import { get } from "lodash";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const ManagerArchive = () => {
  const location = useLocation();
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const queryClient = useQueryClient();
  const { mutate: unArchieve } = usePost();
  const {
    data: archivedCategories,
    isLoading: archivedCategoriesLoading,
  } = useGet({
    url: "/archived/categories/",
    queryKey: ["/archived/categories/"],
    params: { page: +get(params, "categoryArchived", 1) },
  });
  const { data: archivedClients, isLoading: archivedClientsLoading } = useGet({
    url: "/archived/customers/",
    queryKey: ["/archived/customers/"],
    params: { page: +get(params, "archivedCustomers", 1) },
  });
  const { data: archivedProducts, isLoading: archivedProductsLoading } = useGet(
    {
      url: "/archived/products/",
      queryKey: ["/archived/products/"],
      params: { page: +get(params, "productsArchived", 1) },
    }
  );
  const { data: archivedUsers, isLoading: archivedUsersLoading } = useGet({
    url: "/archived/users/",
    queryKey: ["/archived/users/"],
    params: { page: +get(params, "usersArchived", 1) },
  });
  const {
    data: archivedWarehouses,
    isLoading: archivedWarehousesLoading,
  } = useGet({
    url: "/archived/warehouses/",
    queryKey: ["/archived/warehouses/"],
    params: { page: +get(params, "warehousesArchived", 1) },
  });

  const categoriesColumns = [
    {
      key: "num",
      title: "№",
      width: "70px",
      render: (text, record, index) => {
        // Calculate the correct index considering pagination
        const orderNumber =
          (get(params, "categoryArchived", 1) - 1) * 10 + index + 1;
        return orderNumber;
      },
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
    {
      key: "arxivdan chiqarish",
      title: "Arxivdan chiqarish",
      render: (_, data) => (
        <Button
          type="primary"
          onClick={() =>
            unArchieve({
              url: `/category/${data?.id}/`,
              method: "put",
              values: { ...data, archived: false },
              onSuccess: () => {
                queryClient.invalidateQueries("/archived/categories/");
                toast.success("Arxivdan chiqarildi");
              },
              onError: (err) =>
                toast.error(get(err, "response.data.message", err?.message)),
            })
          }
        >
          Qaytarish
        </Button>
      ),
    },
  ];
  const clientsColumns = [
    {
      key: "num",
      title: "№",
      width: "70px",
      render: (text, record, index) => {
        // Calculate the correct index considering pagination
        const orderNumber =
          (get(params, "archivedCustomers", 1) - 1) * 10 + index + 1;
        return orderNumber;
      },
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
      key: "arxivdan chiqarish",
      title: "Arxivdan chiqarish",
      render: (_, data) => (
        <Button
          type="primary"
          onClick={() =>
            unArchieve({
              url: `/customers/${data?.id}/detail/`,
              method: "put",
              values: {
                ...data,
                added_by: data?.added_by?.id,
                warehouse: data?.warehouse?.id,
                archived: false,
              },
              onSuccess: () => {
                queryClient.invalidateQueries("/archived/customers/");
                toast.success("Arxivdan chiqarildi");
              },
              onError: (err) =>
                toast.error(get(err, "response.data.message", err?.message)),
            })
          }
        >
          Qaytarish
        </Button>
      ),
    },
  ];
  const productsColumns = [
    {
      key: "num",
      title: "№",
      width: "70px",
      render: (text, record, index) => {
        // Calculate the correct index considering pagination
        const orderNumber =
          (get(params, "productsArchived", 1) - 1) * 10 + index + 1;
        return orderNumber;
      },
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
    {
      key: "arxivdan chiqarish",
      title: "Arxivdan chiqarish",
      render: (_, data) => (
        <Button
          type="primary"
          onClick={() =>
            unArchieve({
              url: `/products/${data?.id}/`,
              method: "put",
              values: {
                ...data,
                category: data?.category?.id,
                archived: false,
              },
              onSuccess: () => {
                queryClient.invalidateQueries("/archived/products/");
                toast.success("Arxivdan chiqarildi");
              },
              onError: (err) =>
                toast.error(get(err, "response.data.message", err?.message)),
            })
          }
        >
          Qaytarish
        </Button>
      ),
    },
  ];
  const employeeColumns = [
    {
      key: "num",
      title: "№",
      width: "70px",
      render: (text, record, index) => {
        // Calculate the correct index considering pagination
        const orderNumber =
          (get(params, "usersArchived", 1) - 1) * 10 + index + 1;
        return orderNumber;
      },
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
      key: "arxivdan chiqarish",
      title: "Arxivdan chiqarish",
      render: (_, data) => (
        <Button
          type="primary"
          onClick={() =>
            unArchieve({
              url: `/users/details/${data?.id}/`,
              method: "put",
              values: {
                ...data,
                warehouse: data?.warehouse?.id,
                archived: false,
              },
              onSuccess: () => {
                queryClient.invalidateQueries("/archived/users/");
                toast.success("Arxivdan chiqarildi");
              },
              onError: (err) =>
                toast.error(get(err, "response.data.message", err?.message)),
            })
          }
        >
          Qaytarish
        </Button>
      ),
    },
  ];
  const branchesCoulmns = [
    {
      key: "num",
      title: "№",
      width: "70px",
      render: (text, record, index) => {
        // Calculate the correct index considering pagination
        const orderNumber =
          (get(params, "warehousesArchived", 1) - 1) * 10 + index + 1;
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
      key: "arxivdan chiqarish",
      title: "Arxivdan chiqarish",
      render: (_, data) => (
        <Button
          type="primary"
          onClick={() =>
            unArchieve({
              url: `/warehouses/details/${data?.id}/`,
              method: "put",
              values: { ...data, archived: false },
              onSuccess: () => {
                queryClient.invalidateQueries("/archived/warehouses/");
                toast.success("Arxivdan chiqarildi");
              },
              onError: (err) =>
                toast.error(get(err, "response.data.message", err?.message)),
            })
          }
        >
          Qaytarish
        </Button>
      ),
    },
  ];

  return (
    <div className="container">
      {/* <DateFilter /> */}
      {archivedCategoriesLoading ||
      archivedClientsLoading ||
      archivedProductsLoading ||
      archivedWarehousesLoading ||
      archivedUsersLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "80vh",
            alignItems: "center",
          }}
        >
          <Loader />
        </div>
      ) : (
        <>
          <div style={{ marginTop: 20 }}>
            <CustomTable
              hideColumns
              hasPagination
              meta={{ total: archivedCategories?.data?.count }}
              onChangeNavigate={(page) => {
                return {
                  navigate: { categoryArchived: page },
                  paramsKey: "categoryArchived",
                };
              }}
              title={`Arxivlangan categoriyalar: ${archivedCategories?.data?.count}`}
              columns={categoriesColumns}
              items={archivedCategories?.data?.results}
            />
          </div>
          <div style={{ marginTop: 20 }}>
            <CustomTable
              hideColumns
              hasPagination
              meta={{ total: archivedClients?.data?.count }}
              onChangeNavigate={(page) => {
                return {
                  navigate: { productsArchived: page },
                  paramsKey: "productsArchived",
                };
              }}
              title={`Arxivlangan mahsulotlar: ${archivedProducts?.data?.count}`}
              columns={productsColumns}
              items={archivedProducts?.data?.results}
            />
          </div>
          <div style={{ marginTop: 20 }}>
            <CustomTable
              hideColumns
              hasPagination
              meta={{ total: archivedClients?.data?.count }}
              onChangeNavigate={(page) => {
                return {
                  navigate: { archivedCustomers: page },
                  paramsKey: "archivedCustomers",
                };
              }}
              title={`Arxivlangan mijozlar: ${archivedClients?.data?.count}`}
              columns={clientsColumns}
              items={archivedClients?.data?.results}
            />
          </div>
          <div style={{ marginTop: 20 }}>
            <CustomTable
              hideColumns
              hasPagination
              meta={{ total: archivedUsers?.data?.count }}
              onChangeNavigate={(page) => {
                return {
                  navigate: { usersArchived: page },
                  paramsKey: "usersArchived",
                };
              }}
              title={`Arxivlangan xodimlar: ${archivedUsers?.data?.count}`}
              columns={employeeColumns}
              items={archivedUsers?.data?.results}
            />
          </div>
          <div style={{ marginTop: 20 }}>
            <CustomTable
              hideColumns
              hasPagination
              meta={{ total: archivedWarehouses?.data?.count }}
              onChangeNavigate={(page) => {
                return {
                  navigate: { warehousesArchived: page },
                  paramsKey: "warehousesArchived",
                };
              }}
              title={`Arxivlangan filiallar: ${archivedWarehouses?.data?.count}`}
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

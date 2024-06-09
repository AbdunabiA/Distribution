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
import Loader from "components/loader";
import qs from "qs";
import { get } from "lodash";

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


const ManagerProducts = () => {
  const location = useLocation();
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const [modal, setModal] = useState({ isOpen: false, form: null, data: null });
  const { data: productsData, isLoading: productsLoading, error } = useGet({
    url: "/products/all/",
    queryKey: ["/products/all/"],
    params: { page: +get(params, "productsPage", 1) },
  });
  const { data: categoriesData, isLoading: categoriesLoading, err } = useGet({
    url: "/categories/",
    queryKey: ["/categories/"],
    params: { page: +get(params, "categoriesPage", 1) },
  });
  const { mutate: deleteProduct } = usePost();
  const { mutate: deleteCategories } = usePost();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const categoriesColumns = [
    {
      key: "num",
      title: "№",
      width: "70px",
      render: (text, record, index) => {
        // Calculate the correct index considering pagination
        const orderNumber =
          (get(params, "categoriesPage", 1) - 1) * 10 + index + 1;
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
  ];

  const productsColumns = [
    {
      key: "num",
      title: "№",
      width: "70px",
      render: (text, record, index) => {
        // Calculate the correct index considering pagination
        const orderNumber =
          (get(params, "productsPage", 1) - 1) * 10 + index + 1;
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
  ];
  return (
    <div className="container">
      <Modal
        destroyOnClose
        centered
        footer={false}
        open={modal.isOpen}
        onCancel={() => setModal({ isOpen: false, form: null, data: null })}
      >
        {modal.form === "category" ? (
          <CreateProductCategory {...{ setModal, data: modal.data }} />
        ) : modal.form === "product" ? (
          <CreateProduct {...{ setModal, data: modal.data }} />
        ) : null}
      </Modal>
      <CustomTable
        columns={categoriesColumns}
        items={categoriesData?.data?.results}
        height={300}
        minHeight={"200px"}
        title={`Kategoriyalar: ${
          categoriesData?.data?.results
            ? categoriesData?.data?.results.length
            : ""
        }`}
        hideColumns
        hasPagination
        meta={{total:categoriesData?.data?.count}}
        onChangeNavigate={(page) => {
              return {
                navigate: { categoriesPage: page },
                paramsKey: "categoriesPage",
              };
            }}
        scrollY
        isLoading={categoriesLoading}
        hasDelete
        hasUpdate
        deleteAction={(data) =>
          deleteCategories({
            url: `category/${data.id}`,
            method: "delete",
            onSuccess: () => {
              queryClient.invalidateQueries("/categories/");
              toast.success("Kategoriya o'chirildi");
            },
            onError: () => toast.error("Kategoriya o'chirilmadi"),
          })
        }
        updateAction={(data) =>
          setModal({ isOpen: true, form: "category", data: data })
        }
        buttons={[
          <Button
            icon={<PlusIcon />}
            key={"category"}
            type="primary"
            onClick={() =>
              setModal({ isOpen: true, form: "category", data: null })
            }
          >
            Kategoriya qo'shish
          </Button>,
        ]}
      />
      <div style={{ marginTop: "20px" }}>
        <CustomTable
          {...{
            isLoading: productsLoading,
            columns: productsColumns,
            height: 300,
            minHeight: "200px",
            scrollY: true,
            meta:{total:productsData?.data?.count},
            hasPagination: true,
            onChangeNavigate: (page) => {
              return {
                navigate: { productsPage: page },
                paramsKey: "productsPage",
              };
            },
            items: productsData?.data?.results,
            title: `Mahsulotlar: ${productsData?.data?.count}`,
            hideColumns: true,
            deleteAction: (data) =>
              deleteProduct({
                url: `/products/${data.id}/`,
                method: "delete",
                onSuccess: () => {
                  queryClient.invalidateQueries("/products/all/");
                  toast.success("Mahsulot o'chirildi");
                },
                onError: (err) => toast.error(err.message),
              }),
            updateAction: (data) =>
              setModal({ isOpen: true, form: "product", data: data }),
            hasDelete: true,
            hasUpdate: true,
            onRowNavigationUrl: "/products/",
            buttons: [
              <Button
                icon={<PlusIcon />}
                key={"product"}
                type="primary"
                onClick={() =>
                  setModal({ isOpen: true, form: "product", data: null })
                }
              >
                Mahsulot qo'shish
              </Button>,
            ],
          }}
        />
      </div>
    </div>
  );
};

export default ManagerProducts;

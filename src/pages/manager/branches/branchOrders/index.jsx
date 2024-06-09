import Loader from "components/loader";
import CustomTable from "components/table";
import dayjs from "dayjs";
import { GetAll } from "modules";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { formatNums } from "services/formatNums";
import qs from "qs";
import { get } from "lodash";
import React, { useCallback } from 'react';

const ManagerBranchOrders = () => {
  const navigate = useNavigate();
  const { branchId } = useParams();
  const location = useLocation();
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });

  const handleFilter = useCallback((value, record) => {
    const currentStatus = params.status || 'all';
    if (value !== currentStatus) {
      const newParams = { ...params };
      if (value === 'all') {
        delete newParams.status; // Remove the status parameter when 'Barchasi' is selected
      } else {
        newParams.status = value; // Set the status to the selected value
      }
      navigate({
        search: qs.stringify(newParams),
      });
    }
    console.log('filter', value);
    // The filter function should always return true when 'all' is selected
    return value === 'all' ? true : record.status.indexOf(value) === 0;
  }, [navigate, params]);

  const columns = [
    {
      key: "num",
      title: "№",
      width: "70px",
      render: (text, record, index) => {
        // Calculate the correct index considering pagination
        const orderNumber = (get(params, 'page', 1) - 1) * 10 + index + 1;
        return orderNumber;
      },
    },
    {
      key: "operator",
      title: "Operator",
      dataIndex: "operator",
      render: (data) => data?.first_name + " " + data?.last_name,
    },
    {
      key: "customer",
      title: "Mijoz",
      dataIndex: "customer",
      render: (data) => data?.name,
    },
    {
      key: "driver",
      title: "Yetkazib beruvchi",
      dataIndex: "driver",
      render: (data) => data?.first_name + " " + data?.last_name,
    },
    {
      key: "warehouse",
      title: "Filial",
      dataIndex: "warehouse",
      render: (data) => data?.name,
    },
    {
      key: "comment",
      title: "Comment",
      dataIndex: "comment",
    },
    {
      key: "deadline",
      title: "Deadline",
      dataIndex: "deadline",
      render: (data) => dayjs(data).format("DD-MM-YYYY"),
    },
    {
      key: "discount",
      title: "Chegirma",
      dataIndex: "discount",
      render: (data) => formatNums(data),
    },
    {
      key: "sum",
      title: "Jami narxi",
      dataIndex: "sum",
      render: (data) => formatNums(data),
    },
    {
      key: "final_price",
      title: "Yakuniy narx",
      dataIndex: "final_price",
      render: (data) => formatNums(data),
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
      filters: [
        {
          text: "Barchasi",
          value: "all",
        },
        {
          text: "Aktive",
          value: "Active",
        },
        {
          text: "Yetkazilmoqda",
          value: "InProgress",
        },
        {
          text: "Yetkazilgan",
          value: "Delivered",
        },
        {
          text: "Tasdiqlangan",
          value: "Confirmed",
        },
        {
          text: "Bekor qilingan",
          value: "Cancelled",
        },
      ],
      filterMultiple: false,
      onFilter: handleFilter,
    },
  ];

  return (
    <GetAll
      url={`/warehouses/${branchId}/orders`}
      queryKey={["warehouses_orders"]}
      params={{
        page: +get(params, "page", 1),
        extra: { status: get(params, "status", "") },
      }}
    >
      {({ data, isLoading, isError, error }) => {
        if (isLoading) return <Loader />;
        if (isError) return <h1>Error</h1>;
        console.log(data?.data);
        return (
          <div className="container">
            <CustomTable
              title={`Filial buyurtmalari: ${data?.data?.count}`}
              columns={columns}
              items={data?.data?.results}
              hasPagination
              meta={{ total: data?.data?.count }}
              height={"300px"}
              minHeight={"250px"}
              scrollY
            />
          </div>
        );
      }}
    </GetAll>
  );
};

export default ManagerBranchOrders;

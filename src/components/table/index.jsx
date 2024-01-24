import {
  Pagination,
  Popconfirm,
  Switch,
  Table,
  Tooltip,
  Checkbox,
  Divider,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { get } from "lodash";
import { Button, Flex } from "antd";
import PlusIcon from "assets/icons/PlusIcon";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import tableScss from "./table.module.scss";
import vektor from "../../assets/images/addVektor.svg";

const CustomTable = ({
  items,
  isLoading,
  columns,
  hideColumns = false,
  scrollX = null,
  scrollY = null,
  hasUpdate = false,
  hasDelete = false,
  hasStatus = false,
  hasPagination = false,
  customPagination = false,
  deleteAction = () => {},
  updateAction = () => {},
  statusAction = () => {},
  meta,
}) => {
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const navigate = useNavigate();
  const defaultCheckedList = columns.map((item) => item.dataIndex);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const options = columns.map(({ dataIndex, title }) => ({
    label: title,
    value: dataIndex,
  }));

  let newColumns = columns.map((item) => ({
    ...item,
    hidden: !checkedList.includes(item.dataIndex),
  }));

  let newColumnss = hasStatus
    ? [
        ...newColumns,
        {
          title: "Status",
          dataIndex: "status",
          render: (value, row) => {
            return (
              <Switch
                checked={value ? true : false}
                onChange={(e) => statusAction(e, row)}
              />
            );
          },
        },
      ]
    : newColumns;
  newColumnss =
    hasUpdate || hasDelete
      ? [
          ...newColumnss,
          {
            title: "Action",
            key: "action",
            render: (_, row) => {
              return (
                <div
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  {hasDelete ? (
                    <Tooltip title="Delete">
                      <Popconfirm
                        placement="topRight"
                        description={"Delete"}
                        onConfirm={() => deleteAction(row)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <DeleteOutlined
                          style={{ color: "red", fontSize: "22px" }}
                        />
                      </Popconfirm>
                    </Tooltip>
                  ) : null}
                  {hasUpdate ? (
                    <Tooltip title="Edit">
                      <EditOutlined
                        onClick={() => updateAction(row)}
                        style={{ color: "#645DF6", fontSize: "22px" }}
                      />
                    </Tooltip>
                  ) : null}
                </div>
              );
            },
          },
        ]
      : newColumnss;

  return (
    <>
      <div className={tableScss.big_wrapper}>
        <div className={tableScss.add}>
          <p>Xodimlar ro’yxati</p>
          <div className={tableScss.btn_wrapper}>
          <Button className={tableScss.btn} type="primary">
            <PlusIcon />
            xodim qo’shish
          </Button>
          </div>
        </div>
        {hideColumns ? (
          <>
            <Divider>Columns displayed</Divider>
            <Checkbox.Group
              value={checkedList}
              options={options}
              onChange={(value) => {
                setCheckedList(value);
              }}
            />
          </>
        ) : null}

        <Table
          rowKey={"id"}
          dataSource={items}
          isLoading={isLoading}
          columns={newColumnss}
          scroll={{
            x: scrollX,
            y: scrollY,
          }}
          style={{ marginTop: "20px" }}
          pagination={
            hasPagination
              ? {
                  total: get(meta, "total"),
                  current: +get(params, "page", 1),
                  pageSize: get(meta, "perPage", 10),
                  showSizeChanger: true,
                }
              : false
          }
          onChange={(page) => {
            // console.log('PAGE', page);
            navigate({
              search: qs.stringify({
                page: page.current,
                pageSize: page.pageSize,
              }),
            });
          }}
        />
        {!hasPagination && customPagination ? (
          <div style={{ marginTop: "10px" }}>
            <Pagination
              total={get(meta, "total")}
              current={+get(params, "page", 1)}
              pageSize={get(meta, "perPage", 10)}
              showSizeChanger
              onChange={(page, pageSize) => {
                // console.log(page, pageSize);
                navigate({
                  search: qs.stringify({
                    page: page,
                    pageSize: pageSize,
                  }),
                });
              }}
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default CustomTable;

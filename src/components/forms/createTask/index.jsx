import { Button } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import {
  AsyncSelect,
  CustomInput,
  CustomSelect,
  CustomTextArea,
} from "components/inputs";
import { ContainerForm } from "modules";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { get } from "lodash";
const options = [
  {
    label: "Menejer",
    value: "manager",
  },
  {
    label: "Filial direktor",
    value: "branch_director",
  },
  {
    label: "Supervisor",
    value: "supervisor",
  },
  {
    label: "Operator",
    value: "operator",
  },
  {
    label: "Yetkazib beruvchi",
    value: "driver",
  },
  {
    label: "Agent",
    value: "agent",
  },
];

export const CreateTask = ({ data, setModal }) => {
  const queryClient = useQueryClient();
  const { data: userData } = useSelector((store) => store.auth);
  console.log(data, "hellosssss");
  return (
    <ContainerForm
      // url={data ? "" : "/users/task_create/"}
      url={data ? `tasks/${data?.id}/update/` : `/users/task_create/`}
      method={data ? "put" : "post"}
      fields={[
        {
          name: "text",
          required: true,
          value: get(data, "text", null),
        },
        {
          name: "deadline",
          value: get(data, "deadline", ""),
        },
        {
          name: "status",
          value: get(data, "status", "active"),
        },
        {
          name: "task_setter",
          value: userData.id,
        },
        {
          name: "role",
          value: get(data, "role.id", null),
          disabled: true,
        },
        {
          name: "task_executors",
          value: get(data, "task_executors", null),
          required: true,
          type: "array",
        },
      ]}
      onSuccess={() => {
        queryClient.invalidateQueries("/tasks/all/");
        setModal({ isOpen: false, data: null });
        toast.success(`Toshiriq ${data ? "o'zgartirildi" : "yaratildi"}`);
      }}
      onError={(err) =>
        toast.error(get(err, "response.data.message", err?.message))
      }
    >
      {({ handleSubmit, isLoading, values }) => {
        console.log(values?.role);
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: "30px",
            }}
          >
            <p className="form-title">{`Topshiriq ${
              data?.id ? "o'zgartirish" : "yaratish"
            }`}</p>
            <CustomTextArea
              name="text"
              label={"Topshiriq tavsifi"}
              placeholder="Topshiriq tavsifi"
            />
            <CustomInput
              type="date"
              name="deadline"
              label={"Topshiriq deadline"}
              placeholder={"Topshiriq deadline"}
            />
            <CustomSelect
              name="role"
              label={"Lavozim"}
              placeholder={"Lavozim"}
              options={
                userData.role === "manager"
                  ? options.slice(1)
                  : userData.role === "branch_director"
                  ? options.slice(2)
                  : userData.role === "supervisor"
                  ? options.slice(5)
                  : options
              }
            />
            <AsyncSelect
              name="task_executors"
              url={`/users/all/`}
              params={{
                extra: {
                  role: values?.role,
                  ...(userData?.role === 'branch_director' || userData?.role === 'supervisor' ? { warehouse_id: userData?.warehouse?.id } : {})
                },
              }}
              queryKey={["/users/all/?role"]}
              optionLabel={(data) => data?.first_name + " " + data?.last_name}
              optionValue={"id"}
              mode="multiple"
              disabled={!values?.role}
              label={"Bajaruvchilar"}
              placeholder={"Bajaruvchilar"}
            />
            <div className="form-button-wrapper">
              <Button
                onClick={handleSubmit}
                type="primary"
                disabled={isLoading}
              >
                Saqlash
              </Button>
            </div>
          </div>
        );
      }}
    </ContainerForm>
  );
};

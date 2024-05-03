import { Button } from "antd";
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

const options = [
  {
    label: "Admin",
    value: "admin",
  },
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
    label: "Agent",
    value: "agent",
  },
  {
    label: "Yetkazib beruvchi",
    value: "driver",
  },
];

export const CreateTask = ({ data, setModal }) => {
    const { data: userData } = useSelector((store) => store.auth);
  return (
    <ContainerForm
      url={data ? "" : "/users/task_create/"}
      method={data ? "put" : "post"}
      fields={[
        {
          name: "text",
          required: true,
        },
        {
          name: "deadline",
        },
        {
          name: "status",
          value: "active",
        },
        {
          name: "task_setter",
          value: "",
        },
        {
          name: "role",
          value:null,
          disabled: true,
        },
        {
          name: "task_executors",
          value: null,
          required: true,
          type: "array",
        },
      ]}
      onSuccess={() => {
        setModal({isOpen:false, data:null})
        toast.success("Topshiriq yaratildi")
      }}
      onError={(err) => toast.error(err.message)}
    >
      {({handleSubmit, isLoading, values}) => {
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
              data ? "o'zgartirish" : "yaratish"
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
              options={userData.role === "manager" ? options.slice(2) : options}
            />
            <AsyncSelect
              name="task_executors"
              url={`/users/all/`}
              params={{ extra: { role: values?.role } }}
              queryKey={["/users/all/?role"]}
              optionLabel={(data) => data?.first_name + " " + data?.last_name}
              optionValue={"id"}
              mode="multiple"
              disabled={!values?.role}
              label={"Bajaruvchilar"}
              placeholder={"Bajaruvchilar"}
            />
            <div>
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



import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import {
  AsyncSelect,
  CustomInput,
  CustomSelect,
  InputMask,
} from "components/inputs";
import { get } from "lodash";
import { ContainerForm } from "modules";
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

export const CreateUserForm = ({ data, setModal }) => {
  const queryClient = useQueryClient();
  const { data: userData } = useSelector((store) => store.auth);

  return (
    <ContainerForm
      url={`/users/${data ? data.id : "all"}/`}
      method={data ? "put" : "post"}
      fields={[
        {
          name: "first_name",
          value: get(data, "first_name", ""),
          required: true,
        },
        {
          name: "last_name",
          value: get(data, "last_name", ""),
        },
        {
          name: "username",
          value: get(data, "username", ""),
          required: true,
        },
        {
          name: "password",
          value: get(data, "password", ""),
          required: true,
        },
        {
          name: "role",
          value: get(data, "role", null),
          required: true,
        },
        {
          name: "phone_number",
          min: 13,
          value: get(data, "phone_number", "+998"),
          required: true,
          onSubmitValue: (value) => {
            return `+${value.match(/\d+/g).join("")}`;
          },
        },
        {
          name: "address",
          value: get(data, "address", ""),
          required: true,
        },
        {
          name: "birth_date",
          value: get(data, "birth_date", ""),
        },
        {
          name: "status",
          value: get(data, "status", "active"),
        },
        {
          name: "warehouse",
          value: get(data, "warehouse", null),
          required: true,
        },
        {
          name: "is_available",
          value: get(data, "is_available", true),
        },
      ]}
      onSuccess={() => {
        queryClient.invalidateQueries("/users/all/");
        setModal({ isOpen: false, data: null });
        toast.success(`Foydalanuvchi ${data ? "o'zgartirildi" : "yaratildi"}`);
      }}
      onError={(err) => {
        console.log("userError", err);
        toast.error(
          `Foydalanuvchi ${data ? "o'zgartirilmadi" : "yaratilmadi"}`
        );
      }}
    >
      {({ handleSubmit, isLoading }) => {
        return (
          <div>
            <h2>
              {data ? "Fouydalanuvchi ozgartirish" : "Fouydalanuvchi yaratish"}
            </h2>
            <CustomInput name="first_name" placeholder="Ism" />
            <CustomInput name="last_name" placeholder="Familiya" />
            <CustomInput name="username" placeholder="Username" />
            <CustomInput name="password" placeholder="Parol" />
            <CustomSelect
              name="role"
              placeholder="Lavozimi"
              options={
                userData.role === "manager" ? options.slice(2) : options
              }
            />
            <InputMask name="phone_number" mask="+998 (99) 999 99 99" />
            <AsyncSelect
              name="warehouse"
              url={"/warehouses/all/"}
              queryKey={["/warehouses/all/"]}
              optionLabel={"name"}
              optionValue={"id"}
              placeholder="Filial"
            />
            <CustomInput name="address" placeholder="Manzil" />
            <CustomInput
              name="birth_date"
              placeholder="Tugilgan sana"
              type="date"
            />
            <Button type="primary" onClick={handleSubmit} disabled={isLoading}>
              Saqlash
            </Button>
          </div>
        );
      }}
    </ContainerForm>
  );
};

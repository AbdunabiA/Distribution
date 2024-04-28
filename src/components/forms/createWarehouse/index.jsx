import { useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import { CustomInput, InputMask } from "components/inputs";
import { get } from "lodash";
import { ContainerForm } from "modules";
import { toast } from "sonner";

export const CreateWarehouse = ({ data, setModal }) => {
    const queryClient = useQueryClient()
  return (
    <ContainerForm
      url="/warehouses/all/"
      method={data ? "put" : "post"}
      fields={[
        {
          name: "name",
          value: get(data, "name", ""),
          required: true,
        },
        {
          name: "phone",
          value: get(data, "phone", "+998"),
          required: true,
          min: 13,
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
          name: "location",
          value: "",
        },
        {
          name: "status",
          value: get(data, "status", "active"),
        },
      ]}
      onSuccess={() => {
        queryClient.invalidateQueries("/warehouses/all/");
        setModal({ isOpen: false, data: null });
        toast.success(`Filial ${data ? "o'zgartirildi" : "yaratildi"}`);
      }}
      onError={() => toast.error("Filial yaratilmadi")}
    >
      {({handleSubmit, isLoading}) => {
        return (
          <div>
            <p>{`Filial ${data ? "o'zgartirish" : "yaratish"}`}</p>
            <CustomInput name="name" placeholder={"Filial nomi"} />
            <InputMask name="phone" mask={"+998 (99) 999 99 99"} />
            <CustomInput name="address" placeholder={"Filial manzili"} />
            <div>
              <Button onClick={handleSubmit} type="primary" disabled={isLoading}>
                Saqlash
              </Button>
            </div>
          </div>
        );
      }}
    </ContainerForm>
  );
};

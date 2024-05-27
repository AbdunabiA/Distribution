import { useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import { CustomInput, InputMask } from "components/inputs";
import { get } from "lodash";
import { ContainerForm } from "modules";
import { toast } from "sonner";

export const CreateWarehouse = ({ data, setModal }) => {
  const queryClient = useQueryClient();
  return (
    <ContainerForm
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
      url={data?.id ? `warehouses/details/${data?.id}/` : `/warehouses/all/`}
      onSuccess={() => {
        queryClient.invalidateQueries("/warehouses/all/");
        setModal({ isOpen: false, data: null });
        toast.success(`Filial ${data?.id ? "o'zgartirildi" : "yaratildi"}`);
      }}
      onError={(err) =>
        toast.error(get(err, "response.data.message", err?.message))
      }
      method={data?.id ? "put" : "post"}
    >
      {({ handleSubmit, isLoading }) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: "30px",
            }}
          >
            <p className="form-title">{`Filial ${
              data ? "o'zgartirish" : "yaratish"
            }`}</p>
            <CustomInput
              name="name"
              label={"Filial nomi"}
              placeholder={"Filial nomi"}
            />
            <InputMask
              name="phone"
              label={"Tel. raqam"}
              mask={"+998 (99) 999 99 99"}
            />
            <CustomInput
              name="address"
              label={"Filial manzili"}
              placeholder={"Filial manzili"}
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

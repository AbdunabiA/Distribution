import { useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import {
  AsyncSelect,
  CustomInput,
  CustomTextArea,
  InputMask,
} from "components/inputs";
import { get } from "lodash";
import { ContainerForm } from "modules";
import { toast } from "sonner";

export const CreateClient = ({ data, setModal }) => {
  const queryClient = useQueryClient();
  return (
    <ContainerForm
      fields={[
        {
          name: "name",
          required: true,
          value: get(data, "name", ""),
        },
        {
          name: "phone",
          min: 13,
          value: get(data, "phone", "+998"),
          required: true,
          onSubmitValue: (value) => {
            return `+${value.match(/\d+/g).join("")}`;
          },
        },
        {
          name: "address",
          required: true,
          value: get(data, "address", ""),
        },
        {
          name: "status",
          required: true,
          value: get(data, "status", "active"),
        },
        {
          name: "warehouse",
          value: get(data, "warehouse", null),
        },
      ]}
      url={`/customers/${data ? `${data.id}/detail` : "all"}/`}
      onSuccess={() => {
        queryClient.invalidateQueries("/customers/all/");
        setModal({ isOpen: false, form: null, data: null });
        toast.success(`Client ${data ? "o'zgartirildi" : "yaratildi"}`);
      }}
      onError={() =>
        toast.error(`Client ${data ? "o'zgartirilmadi" : "yaratilmadi"}`)
      }
      method={data ? "put" : "post"}
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
            <p className="form-title">
              {data ? "Mijozni o'zgartirish" : "Mijoz yaratish"}
            </p>
            <CustomInput name="name" label={"Ism"} placeholder="Ism" />
            <InputMask
              name="phone"
              label={"Tel. raqam"}
              mask="+998 (99) 999 99 99"
            />
            <CustomInput name="address" label={"Manzil"} placeholder="Manzil" />
            <AsyncSelect
              optionLabel={"name"}
              optionValue={"id"}
              queryKey={"warehouses"}
              url={"/warehouses/all"}
              name="warehouse"
              label={"Mijoz filiali"}
              placeholder="Mijoz filiali"
            />
            <div className="form-button-wrapper">
              <Button
                type="primary"
                onClick={handleSubmit}
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

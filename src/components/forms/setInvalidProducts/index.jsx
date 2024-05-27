import { useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import {
  AsyncSelect,
  CustomInput,
  CustomSelect,
  CustomTextArea,
} from "components/inputs";
import { get } from "lodash";
import { ContainerForm } from "modules";
import { toast } from "sonner";

export const SetInvalidProducts = ({ data, setModal, invalidateQuery }) => {
  const queryClient = useQueryClient();
  return (
    <ContainerForm
      url={`/warehouses/${data?.warehouse?.id}/products/${data?.id}/`}
      method="put"
      fields={[
        {
          name: "warehouse",
          value: get(data, "warehouse.id", null),
          // required: true,
          disabled: true,
        },
        {
          name: "product",
          value: get(data, "product.id", null),
          // required: true,
          disabled: true,
          // onSubmitValue: () => data?.id,
        },
        {
          name: "invalids_amount",
          value: 0,
          type: "number",
          max: data?.amount,
          min:0,
          required: true,
        },
        {
          name: "amount",
          value: get(data, "amount", 0),
          min: 0,
          type: "number",
          required: true,
        },
      ]}
      onSuccess={() => {
        queryClient.invalidateQueries(invalidateQuery);
        setModal({ isOpen: false, data: null });
        toast.success(`SUCCESSFUL`);
      }}
      onError={(err) =>
        toast.error(get(err, "response.data.message", err?.message))
      }
    >
      {({ handleSubmit, isLoading, values, setFieldValue }) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: "30px",
            }}
          >
            <p className="form-title">Mahsulotlarni yaroqsizga chiqarish</p>
            <CustomSelect
              name="warehouse"
              options={[
                { label: data?.warehouse?.name, value: data?.warehouse?.id },
              ]}
              label={"Filial"}
            />
            <CustomSelect
              name="product"
              options={[
                { label: data?.product?.name, value: data?.product?.id },
              ]}
              label={"Mahsulot"}
            />
            <CustomInput
              name={"invalids_amount"}
              label={"Yarqsizlar soni"}
              type="number"
              onChange={(val) => {
                setFieldValue("amount", data?.amount - val);
              }}
            />
            <CustomInput
              name="amount"
              label={"Mahsulot soni"}
              disabled
              type="number"
            />
            {/* <CustomInput
              name="archieved"
              label={"Status"}
              type="text"
              disabled
            />
            <CustomTextArea name="comment" label={"Tavsif"} disabled /> */}
            <div className="form-button-wrapper">
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                onClick={handleSubmit}
                disabled={isLoading}
              >
                Yuborish
              </Button>
            </div>
          </div>
        );
      }}
    </ContainerForm>
  );
};

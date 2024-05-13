import { useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import { AsyncSelect, CustomInput, CustomTextArea } from "components/inputs";
import { get } from "lodash";
import { ContainerForm } from "modules";
import { useState } from "react";
import { toast } from "sonner";

export const CreateOrder = ({ data, setModal }) => {
  const queryClient = useQueryClient();
  const [prodMaxAmount, setProdMaxAmount] = useState(0);
  return (
    <ContainerForm
      url={data?.id ? `/orders/${data.id}/details/` : "/orders/all/"}
      method={data?.id ? "put" : "post"}
      fields={[
        {
          name: "customer",
          value: get(data, "customer.id", null),
          required: true,
        },
        {
          name: "warehouse_product",
          value: get(data, "product.id", null),
          required: true,
        },
        {
          name: "warehouse",
          value: get(data, "warehouse.id", null),
          required: true,
        },
        {
          name: "operator",
          value: get(data, "operator.id", null),
          required: true,
        },
        {
          name: "driver",
          value: get(data, "driver.id", null),
          //   required: true,
        },
        {
          name: "amount",
          value: get(data, "amount", null),
          required: true,
          type: "number",
          max: prodMaxAmount,
        },
        {
          name: "total_price",
          value: get(data, "total_price", null),
          required: true,
        },
        {
          name: "discount",
          value: get(data, "discount", null),
        },
        {
          name: "deadline",
          value: get(data, "deadline", null),
        },
        {
          name: "comment",
          value: get(data, "comment", null),
        },
        {
          name: "status",
          value: get(data, "status", "Active"),
        },
      ]}
      onSuccess={() => {
        queryClient.invalidateQueries("/orders/all/");
        toast.success("Buyurtma " + (data?.id ? "o'zgartirildi" : "yaratildi"));
        setModal({ isOpen: false, data: null });
      }}
      onError={(error) => {
        toast.error(error.message);
      }}
    >
      {({ handleSubmit, isLoading, values }) => {
        return (
          <div>
            <p className="form-title">{`Buyurtma ${
              data?.id ? "o'zgartirish" : "yaratish"
            }`}</p>
            <AsyncSelect
              name="customer"
              label={"Mijoz"}
              placeholder="Mijozni tanlashingiz kerak"
              url={"/customers/all/"}
              queryKey={["/customers/all/"]}
              optionLabel={"name"}
              optionValue={"id"}
            />
            <AsyncSelect
              name="warehouse"
              label="Filial"
              placeholder={"Filial"}
              url={"/warehouses/all/"}
              queryKey={["/warehouses/all/"]}
              optionLabel={"name"}
              optionValue={"id"}
            />
            <AsyncSelect
              name="warehouse_product"
              label={"Mahsulot"}
              placeholder="Mahsulotni tanlashingiz kerak"
              url={`/warehouses/${values.warehouse}/products/`}
              queryKey={[`/warehouses/${values.warehouse}/products/`]}
              optionLabel={(data) => data?.product?.name}
              optionValue={"id"}
              disabled={!values.warehouse}
            />
            <CustomInput
              name="amount"
              label="Miqdori"
              placeholder={"Miqdori"}
              type="number"
            />
            <CustomInput
              name="total_price"
              label="Jami narxi"
              placeholder={"Jami narxi"}
              type="number"
            />
            <CustomInput
              name="deadline"
              label="Yetkazish kuni"
              placeholder={"Yetkazish kuni"}
              type="date"
            />
            <CustomInput
              name="discount"
              label={"Chegirma"}
              placeholder={"Chegirma"}
              type="number"
            />
            <AsyncSelect
              name="driver"
              label={"Yetkazib beruvchi"}
              placeholder={"Yetkazib beruvchi"}
              url={"/users/all/"}
              queryKey={["/users/all/"]}
              params={{ extra: { role: "driver" } }}
              optionLabel={(data) => data?.first_name + " " + data?.last_name}
              optionValue={"id"}
            />
            <AsyncSelect
              name="operator"
              label={"Operator"}
              placeholder={"Operator"}
              url={"/users/all/"}
              queryKey={["/users/all/"]}
              params={{ extra: { role: "operator" } }}
              optionLabel={(data) => data?.first_name + " " + data?.last_name}
              optionValue={"id"}
            />
            <CustomTextArea
              name="comment"
              label={"Tavsif"}
              placeholder={"Tavsif"}
            />
            <div className="form-button-wrapper">
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                disabled={isLoading}
                onClick={handleSubmit}
              >
                {data ? "O'zgartirish" : "Yaratish"}
              </Button>
            </div>
          </div>
        );
      }}
    </ContainerForm>
  );
};

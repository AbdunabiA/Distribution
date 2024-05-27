import { useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import { AsyncSelect, CustomInput, CustomTextArea } from "components/inputs";
import { useGet } from "crud";
import { FieldArray } from "formik";
import { get } from "lodash";
import { ContainerForm } from "modules";
import { useState } from "react";
import { toast } from "sonner";

export const CreateOrder = ({
  data,
  setModal,
  invalidateQueries = "/orders/all/",
}) => {
  const [warehouseId, setWarehouseId] = useState(null);
  const queryClient = useQueryClient();
  const { data: branches } = useGet({
    url: "/warehouses/all/",
    queryKey: ["/warehouses/all/"],
  });
  const { data: customers } = useGet({
    url: "/customers/all/",
    queryKey: ["/customers/all/"],
  });
  const { data: products } = useGet({
    url: `/warehouses/${warehouseId}/products/`,
    queryKey: [`/warehouses/${warehouseId}/products/`],
  });
  // const { data: products } = useGet({
  //   url: `/products/all/`,
  //   queryKey: [`/products/all/`],
  // });
  // console.log("DEADLINE", get(data, "deadline", null));
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
          name: "items",
          value: get(data, "items", [
            {
              warehouse_product: null,
              amount: 0,
              tot_price: 0,
            },
          ]),
          required: true,
          type:"array"
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
          name: "sum",
          value: +get(data, "sum", 0),
          type: "number",
        },
        {
          name: "final_price",
          value: +get(data, "final_price", 0),
          type: "number",
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
        queryClient.invalidateQueries(invalidateQueries);
        toast.success("Buyurtma " + (data?.id ? "o'zgartirildi" : "yaratildi"));
        setModal({ isOpen: false, data: null });
      }}
      onError={(error) => {
        toast.error(get(err, "response.data.message", err?.message));
      }}
    >
      {({ handleSubmit, isLoading, values, setFieldValue }) => {
        if (values?.customer) {
          customers?.data?.results?.forEach((customer) => {
            if (customer?.id === values.customer) {
              branches?.data?.results?.forEach((branch) => {
                if (
                  branch?.id === customer?.warehouse?.id &&
                  customer?.warehouse?.id !== values.warehouse
                ) {
                  console.log(branch?.id);
                  setWarehouseId(branch?.id);
                  setFieldValue("warehouse", branch?.id);
                }
              });
            }
          });
        }
        // console.log(values);
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
            {/* <AsyncSelect
              name="operator"
              label="Operator"
              placeholder={"Operator"}
              url={`warehouses/${values.warehouse}/employees/`}
              queryKey={[`warehouses/${values.warehouse}/employees/`]}
              params={{ extra: { role: "operator" } }}
              optionLabel={(data) => data?.first_name + " " + data?.last_name}
              optionValue={"id"}
            /> */}
            <FieldArray
              name="items"
              render={(arrayHelpers) => (
                <div>
                  {values?.items?.map((product, index) => (
                    <div
                      key={index}
                      style={{
                        border: "1px solid violet",
                        padding: "5px",
                        borderRadius: "10px",
                        marginTop: "5px",
                      }}
                    >
                      {/** both these conventions do the same */}
                      <AsyncSelect
                        name={`items[${index}].warehouse_product`}
                        label={"Mahsulot"}
                        placeholder="Mahsulotni tanlashingiz kerak"
                        url={`/warehouses/${values.warehouse}/products/`}
                        queryKey={[`/warehouses/${values.warehouse}/products/`]}
                        optionLabel={(data) => data?.product?.name}
                        optionValue={"id"}
                        disabled={!values.warehouse}
                      />
                      <CustomInput
                        name={`items[${index}].amount`}
                        label="Miqdori"
                        placeholder={"Miqdori"}
                        type="number"
                        onChange={(val) => {
                          products?.data?.results?.forEach((prod) => {
                            if (
                              values?.items[index].warehouse_product ===
                              prod?.id
                            ) {
                              console.log("prod", val * prod?.product?.price);
                              setFieldValue(
                                `items[${index}].tot_price`,
                                val * prod?.product?.price
                              );
                            }
                          });
                        }}
                      />
                      <CustomInput
                        name={`items[${index}].tot_price`}
                        label="Mahsulot jami narxi"
                        placeholder={"Jami narxi"}
                        type="number"
                      />
                      <Button
                        type="default"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        Mahsulotni o'chirish
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="primary"
                    onClick={() =>
                      arrayHelpers.push({
                        product_category: "",
                        product: "",
                        product_amount: "",
                      })
                    }
                  >
                    Mahsulot qo'shish
                  </Button>
                </div>
              )}
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
              url={`/warehouses/${values.warehouse}/employees/`}
              queryKey={[`/warehouses/${values.warehouse}/employees/`]}
              params={{ extra: { role: "driver" } }}
              optionLabel={(data) => data?.first_name + " " + data?.last_name}
              optionValue={"id"}
            />
            <AsyncSelect
              name="operator"
              label={"Operator"}
              placeholder={"Operator"}
              url={`/warehouses/${values.warehouse}/employees/`}
              queryKey={[`/warehouses/${values.warehouse}/employees/`]}
              params={{ extra: { role: "operator" } }}
              optionLabel={(data) => data?.first_name + " " + data?.last_name}
              optionValue={"id"}
            />
            <CustomTextArea
              name="comment"
              label={"Tavsif"}
              placeholder={"Tavsif"}
            />
            <CustomInput
              name={`sum`}
              label="Mahsulotlar jami narxi"
              placeholder={"Jami narxi"}
              type="number"
              disabled
              
            />
            <CustomInput
              name={`final_price`}
              label="Mahsulotlar yakuniy narxi"
              placeholder={"Yakuniy narx"}
              type="number"
              disabled
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

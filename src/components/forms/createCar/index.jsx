import { AsyncSelect, CustomInput } from "components/inputs";
import { ContainerForm } from "modules";
import React from "react";
import { get } from "lodash";
import { Button } from "antd";
import { toast } from "sonner";

export const CreateCar = ({ data, setModal }) => {
  return (
    <ContainerForm
      url="/users/car_create/"
      method={data ? "put" : "post"}
      fields={[
        {
          name: "type",
          value: get(data, "type", ""),
          required: true,
        },
        {
          name: "number",
          value: get(data, "number", ""),
          required: true,
        },
        {
          name: "driver",
          value: get(data, "driver", null),
          required: true,
        },
      ]}
      onSuccess={() => {
        setModal({ isOpen: false, data: null });
        toast.success(`Avtomashina ${data ? "o'zgartirildi" : "yaratildi"}`);
      }}
      onError={() => toast.error("Mashina qo'shilmadi")}
    >
      {({ handleSubmit, isLoading }) => {
        return (
          <div style={{display:"flex", flexDirection:"column", gap:"10px", padding:"30px"}}>
            <p className="form-title">
              {data ? "Avtomashina o'zgartirish" : "Avtomashina qo'shish"}
            </p>
            <CustomInput
              name="type"
              label={"Mashina markasi"}
              placeholder={"Mashina markasi"}
            />
            <CustomInput
              name="number"
              label={"Mashina raqami"}
              placeholder={"Mashina raqami"}
            />
            <AsyncSelect
              optionLabel={(data) => data?.first_name + " " + data?.last_name}
              optionValue={"id"}
              queryKey={["/users/all?role=driver"]}
              url={"/users/all"}
              params={{ extra: { role: "driver" } }}
              name="driver"
              label={"Yetkazib beruvchi"}
              placeholder="Yetkazib beruvchi"
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

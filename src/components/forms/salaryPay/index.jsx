import { useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import { CustomInput, CustomSelect, CustomTextArea } from "components/inputs";
import { get } from "lodash";
import { ContainerForm } from "modules";
import { toast } from "sonner";

const months = [
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "June", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 },
];


export const SalaryPay = ({data, setModal, invalidateQuery}) => {
    const queryClient = useQueryClient()
    console.log(data);
  return (
    <ContainerForm
      url="/users/salary_payments/"
      method="post"
      fields={[
        {
          name: "kpi_amount",
          value: get(data, "kpi_amount", 0),
        },
        {
          name: "fixed_amount",
          value: get(data, "fixed_amount", 0),
          required: true,
        },
        {
          name: "total_amount",
          value: get(data, "total_amount", 0),
          required: true,
        },
        {
          name: "bonus",
          value: get(data, "bonus", 0),
        },
        {
          name: "month",
          value: get(data, "month", null),
          required: true,
        },
        {
          name: "year",
          value: get(data, "year", null),
          required: true,
        },
        {
          name: "user",
          value: get(data, "user.id", 0),
          required: true,
        },
        {
            name:"comment",
            value: get(data, "comment", null),
        }
      ]}
      onSuccess={() => {
        queryClient.invalidateQueries(invalidateQuery);
        setModal({ isOpen: false, data: null });
        toast.success("To'landi");
      }}
      onError={(err) =>
        toast.error(get(err, "response.data.message", err?.message))
      }
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
            {" "}
            <p className="form-title">Oylik to'lash</p>
            <CustomInput name="kpi_amount" type="number" label={"KPI"} />
            <CustomInput name="fixed_amount" type="number" label={"Fiksa"} />
            <CustomInput
              name="total_amount"
              type="number"
              label={"Umumiy maosh"}
            />
            <CustomInput name="bonus" type="number" label={"Bonus"} />
            <CustomSelect name="month" options={months} label={"Oy"} />
            <CustomInput name="year" type="text" label={"Yil"} />
            <CustomSelect name="user" label={"Xodim"} options={[{label:data?.user?.first_name+' '+data?.user?.last_name, value:data?.user?.id}]}/>
            <CustomTextArea name='comment' label={'Tavsif'} />
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



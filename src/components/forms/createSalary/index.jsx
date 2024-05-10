import { Button } from "antd";
import { CustomInput, CustomTextArea } from "components/inputs";
import { get } from "lodash";
import { ContainerForm } from "modules";
import { toast } from "sonner";

export const CreateSalary = ({ setModal, data }) => {
  return (
    <ContainerForm
      url={`/users/${data?.id}/salary_params/`}
      method={"post"}
      fields={[
        {
          name: "fixed",
          value: get(data, "fixed", null),
          required: true,
        },
        {
          name: "kpi_by_sales",
          value: get(data, "kpi_by_sales", null),
          required: true,
        },
        {
          name: "comment",
          value: get(data, "comment", null),
        },
        {
          name: "user",
          value: get(data, "id", null),
        },
      ]}
      onSuccess={() => {
        setModal({isOpen:false, data:null})
        toast.success("Oylik maosh saqlandi")
      }}
      onError={(err) => toast.error(err.message)}
    >
      {({ handleSubmit, isLoading }) => {
        return (
          <div
            style={{
              padding: "30px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <p className="form-title">Xodim oylik maoshi</p>
            <CustomInput name="fixed" placeholder={"fiksa"} label={"fiksa"} />
            <CustomInput
              name="kpi_by_sales"
              placeholder={"KPI"}
              label={"KPI"}
            />
            <CustomTextArea
              name="comment"
              placeholder="Comment"
              label={"Comment"}
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



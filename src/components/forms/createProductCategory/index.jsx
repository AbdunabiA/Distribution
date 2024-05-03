import { useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import { CustomInput } from "components/inputs";
import { get } from "lodash";
import { ContainerForm } from "modules";
import { toast } from "sonner";

export const CreateProductCategory = ({data, setModal}) => {
  const queryClient = useQueryClient()
  return (
    <ContainerForm
      fields={[
        {
          name: "name",
          required: true,
          value: get(data, "name", ""),
        },
        {
          name: "status",
          value: get(data, "status", "active"),
        },
      ]}
      method={data ? "put" : "post"}
      url={data ? `/category/${data.id}/` : "/categories/"}
      onSuccess={() => {
        queryClient.invalidateQueries("/categories/");
        setModal({ isOpen: false, form: null, data: null });
        toast.success(`Kategoriya ${data ? "o'zgartirildi" : "yaratildi"}`);
      }}
      onError={() =>
        toast.error(`Kategoriya ${data ? "o'zgartirilmadi" : "yaratilmadi"}`)
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
            <p className="form-title">
              {data ? "Kategoriya o'zgartirish" : "Kategoriya yaratish"}
            </p>
            <CustomInput
              label={"Kategoriya nomi"}
              placeholder="Kategoriya nomi"
              name="name"
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


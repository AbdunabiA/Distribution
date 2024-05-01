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
              padding: "30px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <h2>{data ? "Kategoriya o'zgartirish" : "Kategoriya yaratish"}</h2>
            <CustomInput placeholder="kategoriya nomi" name="name" />
            <div style={{ display: "flex", justifyContent: "end" }}>
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


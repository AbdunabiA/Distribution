import { Button } from "antd";
import { CustomInput } from "components/inputs";
import { get } from "lodash";
import { ContainerForm } from "modules";
import { toast } from "sonner";

export const CreateProductCategory = ({modal, setModal}) => {
  return (
    <ContainerForm
      fields={[
        {
          name: "name",
          required: true,
          value: get(modal, "data.name", ""),
        },
        {
          name: "status",
          value: get(modal, "data.status", "active"),
        },
      ]}
      method="post"
      url="/categories/"
      onSuccess={() => {
        setModal({ isOpen: false, form: null, data: null });
        toast.success("Kategoriya yaratildi");
      }}
      onError={() => toast.error("Kategoriya yaratilmadi")}
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
            <h2>
              {modal.data ? "Kategoriya o'zgartirish" : "Kategoriya yaratish"}
            </h2>
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


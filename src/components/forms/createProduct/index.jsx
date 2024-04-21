import { Button } from "antd";
import { AsyncSelect, CustomInput, CustomTextArea } from "components/inputs";
import { get } from "lodash";
import { ContainerForm } from "modules";
import { toast } from "sonner";

export const CreateProduct = ({modal, setModal}) => {
  return (
    <ContainerForm
      fields={[
        {
          name: "name",
          required: true,
          value: get(modal, "name", ""),
        },
        {
          name: "about",
          value: get(modal, "about", ""),
        },
        {
          name: "price",
          required: true,
          value: get(modal, "price", 0),
        },
        {
          name: "status",
          required: true,
          value: get(modal, "data.status", "active"),
        },
        {
          name: "category",
          required: true,
          value: get(modal, "data.category", ""),
        },
      ]}
      url="/products/all/"
      onSuccess={() => {
        setModal({ isOpen: false, form: null, data: null });
        toast.success("Mahsulot yaratildi");
      }}
      onError={() => toast.error("Mahsulot yaratilmadi")}
      method="post"
    >
      {({ handleSubmit, isLoading }) => {
        return (
          <div>
            <h2>
              {modal.data ? "Mahsulot o'zgartirish" : "Mahsulot yaratish"}
            </h2>
            <CustomInput name="name" placeholder="Nomi" />
            <CustomTextArea name="about" placeholder="Tavsifi" />
            <CustomInput type="number" name="price" placeholder="Narxi" />
            <AsyncSelect
              optionLabel={"name"}
              optionValue={"id"}
              queryKey={"categories"}
              url={"/categories/"}
              name="category"
            />
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


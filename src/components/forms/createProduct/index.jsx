import { useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import { AsyncSelect, CustomInput, CustomTextArea } from "components/inputs";
import { get } from "lodash";
import { ContainerForm } from "modules";
import { toast } from "sonner";

export const CreateProduct = ({data, setModal}) => {
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
          name: "about",
          value: get(data, "about", ""),
        },
        {
          name: "price",
          required: true,
          value: get(data, "price", 0),
        },
        {
          name: "status",
          required: true,
          value: get(data, "status", "active"),
        },
        {
          name: "category",
          required: true,
          value: get(data, "category", ""),
        },
      ]}
      url={`/products/${data ? data.id : "all"}/`}
      onSuccess={() => {
        queryClient.invalidateQueries("products");
        setModal({ isOpen: false, form: null, data: null });
        toast.success(`Mahsulot ${data ? "o'zgartirildi" : "yaratildi"}`);
      }}
      onError={() =>
        toast.error(`Mahsulot ${data ? "o'zgartirilmadi" : "yaratilmadi"}`)
      }
      method={data ? "put" : "post"}
    >
      {({ handleSubmit, isLoading }) => {
        return (
          <div>
            <h2>{data ? "Mahsulot o'zgartirish" : "Mahsulot yaratish"}</h2>
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


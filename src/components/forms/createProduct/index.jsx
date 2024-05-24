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
          value: get(data, "category", null),
        },
      ]}
      url={`/products/${data ? data.id : "all"}/`}
      onSuccess={() => {
        queryClient.invalidateQueries("/products/all/");
        setModal({ isOpen: false, form: null, data: null });
        toast.success(`Mahsulot ${data ? "o'zgartirildi" : "yaratildi"}`);
      }}
      onError={(err) =>
        toast.error(get(err, "response.data.message", err?.message))
      }
      method={data ? "put" : "post"}
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
              {data ? "Mahsulot o'zgartirish" : "Mahsulot yaratish"}
            </p>
            <CustomInput name="name" label={"Nomi"} placeholder="Nomi" />
            <CustomTextArea
              name="about"
              label={"Tavsifi"}
              placeholder="Tavsifi"
            />
            <CustomInput
              type="number"
              name="price"
              label={"Narxi"}
              placeholder="Narxi"
            />
            <AsyncSelect
              optionLabel={"name"}
              optionValue={"id"}
              queryKey={"categories"}
              url={"/categories/"}
              name="category"
              placeholder="Mahsulot katego'riyasi"
              label={"Mahsulot katego'riyasi"}
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


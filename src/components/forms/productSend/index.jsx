import { Button } from "antd";
import { AsyncSelect, CustomInput, CustomTextArea } from "components/inputs";
import { get } from "lodash";
import { ContainerForm } from "modules";
import { toast } from "sonner";

export const ProductSend = ({ data, setModal }) => {
  return (
    <ContainerForm
      url="/warehouses/warehouse_product/create/"
      fields={[
        {
          name: "product",
          value:null,
          required: true,
        },
        {
          name: "warehouse",
          value: get(data, "id", null),
          required: true,
        },
        {
          name: "amount",
          required: true,
        },
        {
          name: "invalids_amount",
          required: true,
        },
        {
          name: "comment",
          required: true,
        },
      ]}
      onSuccess={()=> {
        toast.success("Mahsulot yuborildi")
        setModal({isOpen:false, data:null})
      }}
      onError={(err)=> toast.error(err.message) }
    >
      {({ handleSubmit, isLoading }) => {
        return (
          <div>
            <p>{data?.name}ga mahsulot yuborish</p>
            <AsyncSelect
              name="product"
              placeholder={"Mahsulot"}
              url={"/products/all/"}
              queryKey={["/products/all/"]}
              optionLabel={"name"}
              optionValue={"id"}
            />
            <AsyncSelect
              name="warehouse"
              placeholder={"Filial"}
              url={"/warehouses/all/"}
              queryKey={["/warehouses/all/"]}
              optionLabel={"name"}
              optionValue={"id"}
            />
            <CustomInput
              type="number"
              name="amount"
              placeholder={"Mahsulot miqdori"}
            />
            <CustomInput
              type="number"
              name="invalids_amount"
              placeholder={"Yaroqsiz mahsulot miqdori"}
            />
            <CustomTextArea name="comment" placeholder="Komentariy" />
            <div>
              <Button
                type="primary"
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

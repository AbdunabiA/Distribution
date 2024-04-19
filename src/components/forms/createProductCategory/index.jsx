import { Button } from "antd";
import { CustomInput } from "components/inputs";
import { ContainerForm } from "modules";
import { toast } from "sonner";

const CreateProductCategory = ({setCategoryModal}) => {
  return (
    <ContainerForm
      fields={[
        {
          name: "name",
          required: true,
        },
        {
          name: "status",
        },
      ]}
      method="post"
      url="/categories/"
      onSuccess={() => {
        setCategoryModal(false)
        toast.success("Kategoriya yaratildi")
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
            <CustomInput placeholder="kategoriya nomi" name="name" />
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Button
                type="primary"
                onClick={()=>{
                  // console.log('clicked');
                  handleSubmit();
                }}
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

export default CreateProductCategory;

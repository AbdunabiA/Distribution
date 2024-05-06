import { Button } from "antd";
import { CustomInput } from "components/inputs";
import { ContainerForm } from "modules";
import { toast } from "sonner";

export const ChangePassword = ({setModal}) => {
  return (
    <ContainerForm
      url="/users/change_password/"
      method="put"
      fields={[
        {
          name: "old_password",
          required: true,
        },
        {
          name: "new_password",
          required: true,
        },
        {
          name: "re_new_password",
          required: true,
          compare: "new_password",
        },
      ]}
      onSuccess={() => {
        toast.success("Parol o'zgartirildi")
        setModal({isOpen:false})
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
            <p className="form-title">Parolni o'zgartirish</p>
            <CustomInput
              name="old_password"
              label={"Eski parol"}
              placeholder={"Eski parol"}
            />
            <CustomInput
              name="new_password"
              label={"Yangi parol"}
              placeholder={"Yangi parol"}
            />
            <CustomInput
              name="re_new_password"
              label={"Yangi parol"}
              placeholder={"Yangi parol"}
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

import { Button } from "antd";
import { CustomInput } from "components/inputs";
import { ContainerForm } from "modules";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storage } from "services";
import { toast } from "sonner";
import { signIn } from "store/auth";
import s from "./login.module.scss";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className={s.loginWrapper}>
      <ContainerForm
        url="/users/get_token/"
        fields={[
          {
            name: "username",
            required: true,
          },
          {
            name: "password",
            required: true,
          },
        ]}
        onError={(err) => toast.error(err.message)}
        onSuccess={(data) => {
          storage.set("token", data?.access);
          dispatch(
            signIn({ isAuthenticated: true, access: data?.access, user: data })
          );
          navigate("/");
        }}
      >
        {({ handleSubmit, isLoading }) => {
          return (
            <div className={s.loginForm}>
              <h1>Login</h1>
              <CustomInput name="username" placeholder={"username"} />
              <CustomInput type="password" name="password" placeholder={"password"} />
              <div className={s.buttonWrapper}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  Login
                </Button>
              </div>
            </div>
          );
        }}
      </ContainerForm>
    </div>
  );
};

export default Login;

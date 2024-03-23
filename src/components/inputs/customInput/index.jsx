import { Input } from "antd";
import { Field } from "formik";

export const CustomInput = (props) => {
  //   console.log({ ...props });
  return (
    <Field {...props}>
      {({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors, values, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => (
        <div>
          <Input
            {...field}
            placeholder={props.placeholder}
            type={props.type}
            // value={values[props.name]}
            // onChange={() => setFieldValue(props.name, values[props.name])}
            onInput={(e) => setFieldValue(props.name, e.target.value)}
          />
          {meta.touched && meta.error && (
            <small style={{ color: "red" }}>{meta.error}</small>
          )}
        </div>
      )}
    </Field>
  );
};

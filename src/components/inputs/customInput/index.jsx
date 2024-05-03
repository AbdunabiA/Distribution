import { Input } from "antd";
import { Field } from "formik";

export const CustomInput = ({type='text', placeholder, label=null, ...props}) => {
  //   console.log({ ...props });
  return (
    <Field {...props}>
      {({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors, values, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => (
        <div>
          <label>
            {label && <span className="label">{label}</span>}
            <Input
              {...field}
              placeholder={placeholder}
              autoComplete="off"
              type={type}
              status={meta.touched && meta.error && "error"}
              // value={values[props.name]}
              // onChange={() => setFieldValue(props.name, values[props.name])}
              onInput={(e) => setFieldValue(props.name, e.target.value)}
            />
          </label>
          {meta.touched && meta.error && (
            <small style={{ color: "red" }}>{meta.error}</small>
          )}
        </div>
      )}
    </Field>
  );
};

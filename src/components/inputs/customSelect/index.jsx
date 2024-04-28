import { Select } from 'antd';
import { Field } from 'formik';

export const CustomSelect = ({placeholder, options, ...props}) => {
  return (
    <Field {...props}>
      {({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors, values, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => (
        <div>
          <Select
            {...field}
            placeholder={placeholder}
            options={options}
            status={meta.touched && meta.error && "error"}
            onChange={(e) => setFieldValue(props.name, e)}
            style={{minWidth:"300px", width:"100%"}}
          />
          {meta.touched && meta.error && (
            <small style={{ color: "red" }}>{meta.error}</small>
          )}
        </div>
      )}
    </Field>
  );
};

 
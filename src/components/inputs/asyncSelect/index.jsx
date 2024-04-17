import React, { useState } from "react";
import { Select, Spin } from "antd";
import { Field } from "formik";
import { useGet } from "crud";

export const AsyncSelect = ({
         url,
         queryKey,
         params = {},
         optionLabel,
         optionValue,
         ...props
       }) => {
         const [options, setOptions] = useState([]);

         const { data, isLoading, error } = useGet({
           url,
           queryKey,
           params,
           onSuccess: (data) => {
             // Assuming the data is an array of objects
             const transformedOptions = data.map((item) => ({
               label: item[optionLabel], // The text to display
               value: item[optionValue], // The corresponding value
             }));
             setOptions(transformedOptions);
           },
           onError: (error) => {
             console.error("Error fetching data: ", error);
           },
         });

         return (
           <Field {...props}>
             {({
               field, // { name, value, onChange, onBlur }
               form: { touched, errors, values, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
               meta,
             }) => {
               return (
                 <div>
                   <Select
                     {...field}
                     onChange={(e) => setFieldValue(props.name, e)}
                     status={meta.touched && meta.error && "error"}
                     showSearch
                     placeholder="Select an option"
                     optionFilterProp="children"
                     filterOption={(input, option) =>
                       option.label
                         .toLowerCase()
                         .indexOf(input.toLowerCase()) >= 0
                     }
                     loading={isLoading}
                     notFoundContent={
                       isLoading ? <Spin size="small" /> : "Not Found"
                     }
                     {...props}
                     options={options}
                   />
                   {meta.touched && meta.error && (
                     <small style={{ color: "red" }}>{meta.error}</small>
                   )}
                 </div>
               );
             }}
           </Field>
         );
       };

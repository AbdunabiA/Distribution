import { Field } from "formik";
import ReactInputMask from "react-input-mask";
import s from './inputMask.module.scss'

export const InputMask = ({
         mask,
         placeholder,
         disabled = false,
         label = null,
         ...props
       }) => {
         return (
           <Field {...props}>
             {({
               field, // { name, value, onChange, onBlur }
               form: { touched, errors, values, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
               meta,
             }) => (
               <div>
                 <span>
                  {label && <span className="label">{label}</span>}
                   <div>
                     <ReactInputMask
                       {...field}
                       mask={mask}
                       disabled={disabled}
                       placeholder={placeholder}
                       onInput={(e) =>
                         setFieldValue(props.name, e.target.value)
                       }
                       className={s.inputMask}
                       style={
                         meta.touched && meta.error
                           ? { borderColor: "#ff4d4f" }
                           : {}
                       }
                     />
                   </div>
                 </span>
                 {meta.touched && meta.error && (
                   <small style={{ color: "red" }}>{meta.error}</small>
                 )}
               </div>
             )}
           </Field>
         );
       };

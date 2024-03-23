import { Button } from "antd";
import { CustomInput } from "components/inputs";
import { FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";

const schema = Yup.object().shape({
  branch: Yup.string().required("Required"),
  products: Yup.array()
    .of(
      Yup.object().shape({
        product_category: Yup.string().required("Required"), // these constraints take precedence
        product: Yup.string().required("Required"), // these constraints take precedence
        product_amount: Yup.string().required("Required"),
      })
    )
    .required("Must have product")
    .min(1, "Must have at least 1 product"), // these constraints are shown if and only if inner constraints are satisfied
});

export const ProductsSendForm = () => {
  return (
    <Formik
      initialValues={{
        branch: "",
        products: [{ product_category: "", product: "", product_amount: "" }],
      }}
      onSubmit={(values) =>
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 500)
      }
      validationSchema={schema}
    >
      {({ values, handleSubmit }) => (
        <Form>
          <FieldArray
            name="products"
            render={(arrayHelpers) => (
              <div>
                <CustomInput type="text" name={`branch`} placeholder="Filial" />
                {values.products.map((product, index) => (
                  <div key={index}>
                    {/** both these conventions do the same */}
                    <CustomInput
                      type="text"
                      placeholder="Mahsulot kategoriyasi"
                      name={`products[${index}].product_category`}
                    />
                    <CustomInput
                      type="text"
                      placeholder="Mahsulot"
                      name={`products.${index}.product`}
                    />
                    <CustomInput
                      type="number"
                      placeholder="Mahsulot soni"
                      name={`products[${index}].product_amount`}
                    />
                    <Button
                      type="default"
                      onClick={() => arrayHelpers.remove(index)}
                    >
                      -
                    </Button>
                  </div>
                ))}
                <Button
                  type="default"
                  onClick={() =>
                    arrayHelpers.push({
                      product_category: "",
                      product: "",
                      product_amount: "",
                    })
                  }
                >
                  Add product
                </Button>
                <Button type="primary" onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            )}
          />
        </Form>
      )}
    </Formik>
  );
};

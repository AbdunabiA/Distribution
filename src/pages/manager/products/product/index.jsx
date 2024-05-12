import Loader from "components/loader";
import { GetAll } from "modules";
import productScss from "./product.module.scss";
import { useParams } from "react-router-dom";
import ProfileImage from "components/profileImage";
const ManagerProduct = () => {
  const { productId } = useParams();
  return (
    <GetAll url={`/products/${productId}`} queryKey={["product"]}>
      {({ data, isLoading, isError, error }) => {
        if (isLoading) return <Loader />;
        if (isError) return <h1>Error</h1>;
        console.log(data, "hello");

        let created = data?.data.created_at;
        let slicedDate = created.slice(0, 10);
        return (
          <div className="container">
            <div className={productScss.big_wrapper}>
              <div className={productScss.wrapper}>
                <div className={productScss.first_box}>
                  <div className={productScss.name_box}>
                    <h3><b>Nomi:</b>{data?.data.name}</h3>
                    {data?.data.about.length > 0 ? (
                      <p><b>Tavsifi:</b> {data?.data.about}</p>
                    ) : null}
                  </div>
                  <div>
                  {/* {data?.data.photo !== null ? (
                    <img src={data?.data.photo} alt="" />
                  ) : <ProfileImage/>} */}
                  <ProfileImage/>
                  </div>
                </div>
                <div className={productScss.second_box}>
                  <div>
                    <p>
                      <b>Narxi:</b>
                      {data?.data.price}
                    </p>
                    <p>
                      <b>Status:</b>
                      {data?.data.status}
                    </p>
                    <p>
                      <b>Yaratilgan sana:</b> {slicedDate}
                    </p>
                  </div>
                  <div>
                    {data?.data?.category?.name.length > 0 ? (
                      <p>
                        <b>Categoriyasi:</b>
                        {data?.data.category.name}
                      </p>
                    ) : null}
                    <p>
                      <b>Status:</b>
                      {data?.data.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </GetAll>
  );
};

export default ManagerProduct;

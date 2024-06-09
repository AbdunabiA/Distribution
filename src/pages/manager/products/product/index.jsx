import Loader from "components/loader";
import { GetAll } from "modules";
import productScss from "./product.module.scss";
import { useParams } from "react-router-dom";
import ProfileImage from "components/profileImage";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { CreateProduct } from "components/forms";
import { useState } from "react";
import { useGet, usePost } from "crud";
import { Button, Modal } from "antd";
import { useSelector } from "react-redux";
const ManagerProduct = () => {
  const userData = useSelector((state) => state?.auth);
  const { productId } = useParams();
  const [modal, setModal] = useState({ isOpen: false, form: null, data: null });
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
            <Modal
              destroyOnClose
              centered
              footer={false}
              open={modal.isOpen}
              onCancel={() =>
                setModal({ isOpen: false, form: null, data: null })
              }
            >
              {modal.form === "product" ? (
                <CreateProduct {...{ setModal, data: modal.data }} />
              ) : null}
            </Modal>
            <div className={productScss.big_wrapper}>
              <div className={productScss.wrapper}>
                <div className={productScss.first_box}>
                  <div className={productScss.name_box}>
                    <h3>
                      <b>Nomi:</b>
                      {data?.data.name}
                    </h3>
                    {data?.data.about.length > 0 ? (
                      <p>
                        <b>Tavsifi:</b> {data?.data.about}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    {data?.data.photo === null ? null : (
                      <img
                        src={`https://apis.distrox.uz${data?.data.photo}`}
                        alt="Product-image"
                      />
                    )}
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
                <div className={productScss.third_box}>
                  {userData?.role === "admin" ||
                  userData?.role === "manager" ? (
                    <Button
                      key={"product"}
                      type="primary"
                      onClick={() =>
                        setModal({
                          isOpen: true,
                          form: "product",
                          data: data?.data,
                        })
                      }
                    >
                      O'zgartirish
                    </Button>
                  ) : null}
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

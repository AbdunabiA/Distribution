import { GetAll } from "modules";
import { useNavigate, useParams } from "react-router-dom";
import s from "./branch.module.scss";
import TasksIcon from "assets/icons/Tasks.svg?react";
import ProductsIcon from "assets/icons/Products.svg?react";
import PeopleIcon from "assets/icons/People.svg?react";
import OrdersIcon from "assets/icons/Orders.svg?react";
import Cards from "components/cards";
import Loader from "components/loader";

const ManagerBranch = () => {
  const { branchId } = useParams();
  const navigate = useNavigate();
  return (
    <GetAll
      url={`/warehouses/details/${branchId}`}
      queryKey={["wahousesdetails"]}
    >
      {({ data, isLoading, isError, error }) => {
        if (isLoading) return <Loader />;
        if (isError) return <h2>Error</h2>;
        console.log(data.data);
        const { warehouse, counts } = data?.data;
        const cardsData = [
          {
            cart_text: "Topshiriqlar soni",
            total_amount: counts.tasks,
            icon: TasksIcon,
            currency: "ta",
            onClick: () => navigate(`/branches/${branchId}/tasks/`),
          },
          {
            cart_text: "Mahsulotlar soni",
            total_amount: counts.warehouse_products,
            icon: ProductsIcon,
            currency: "ta",
            onClick: () => navigate(`/branches/${branchId}/products/`),
          },
          {
            cart_text: "Mijozlar soni",
            total_amount: counts.customers,
            icon: PeopleIcon,
            currency: "ta",
            onClick: () => navigate(`/branches/${branchId}/clients/`),
          },
          {
            cart_text: "Xodimlar soni",
            total_amount: counts.users,
            icon: PeopleIcon,
            currency: "ta",
            onClick: () => navigate(`/branches/${branchId}/employees/`),
          },
          {
            cart_text: "Buyurtmalar soni",
            total_amount: counts.orders,
            icon: OrdersIcon,
            currency: "ta",
            onClick: () => navigate(`/branches/${branchId}/orders/`),
          },
        ];
        return (
          <div className="container">
            <div className={s.warehouseDetailsWrapper}>
              <div className={s.warehouseDetails}>
                <p>{warehouse.name}</p>
                <div>
                  <a href={`tel:${warehouse.phone}`}>Tel:{warehouse.phone}</a>
                  <p>Manzil:{warehouse.address}</p>
                  <p>Status:{warehouse.status}</p>
                </div>
              </div>
              <div></div>
            </div>
            <Cards data={cardsData} />
          </div>
        );
      }}
    </GetAll>
  );
};

export default ManagerBranch;

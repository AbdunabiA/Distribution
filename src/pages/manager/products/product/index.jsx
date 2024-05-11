import Loader from "components/loader";
import { GetAll } from "modules";
import { useParams } from "react-router-dom";

const ManagerProduct = () => {
  const { productId } = useParams();
  return (
    <GetAll url={`/products/${productId}`} queryKey={["product"]}>
      {({ data, isLoading, isError, error }) => {
        if (isLoading) return <Loader />;
        if (isError) return <h1>Error</h1>;
        console.log(data, 'hello');
        return <div className="container">


        
        </div>;
      }}
    </GetAll>
  );
};

export default ManagerProduct;

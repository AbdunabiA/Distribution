import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RoutesWrapper from "./routes";
import { get } from "lodash";
import { Suspense, useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => get(state, "auth"));
  // const isAuthenticated = true;
  const location = useLocation();
  // console.log(location.pathname);
  useEffect(() => {
    if (!isAuthenticated) {
        navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    // <Suspense fallback={<h1>Loading..</h1>}>
      <RoutesWrapper />
    // </Suspense>
  );
}

export default App;

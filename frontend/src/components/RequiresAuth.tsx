import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Unauthorized from "./Unauthorized";
type RequiresAuthProps = { forAdmin?: true } | { forAdmin: never };

const RequiresAuth = ({ forAdmin }: RequiresAuthProps) => {
  const auth = useAuth();
  const location = useLocation();

  if (forAdmin) {
    return auth?.isAdmin ? <Outlet /> : <Unauthorized />;
  }

  return auth?.userId ? (
    <Outlet />
  ) : (
    <Navigate
      to={"/login"}
      state={{ from: location, errorMsg: "Увійдіть в систему для доступу до сторінки" }}
      replace
    />
  );
};

export default RequiresAuth;

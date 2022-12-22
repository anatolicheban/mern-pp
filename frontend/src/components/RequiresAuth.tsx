import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";

type RequiresAuthProps = { forAdmin?: true } | { forAdmin: never };

const RequiresAuth = ({ forAdmin }: RequiresAuthProps) => {
  const auth = useAuth();
  console.log(auth);

  const location = useLocation();

  if (forAdmin) {
    return auth?.isAdmin ? (
      <Outlet />
    ) : (
      <Navigate to={"/unauthorized"} state={{ from: location }} replace />
    );
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

import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import usePersist from "../hooks/usePersist";
import { useRefreshMutation } from "../features/auth/authApiSlice";
import { Navigate, Outlet, useLocation } from "react-router";
import Loader from "./Loader";

const PersistLogin = () => {
  const [persist] = usePersist();

  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(true);
  const [trueSuccess, setTrueSuccess] = useState(false);
  const location = useLocation();
  const [refresh, { isUninitialized, isLoading, isSuccess, isError }] = useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        console.log("verifying refresh token");
        try {
          await refresh().unwrap();
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token && persist) {
        verifyRefreshToken();
      }
    }

    return () => {
      effectRan.current = false;
    };

    // eslint-disable-next-line
  }, []);

  if (!persist) {
    // persist: no
    console.log("no persist");
    return <Outlet />;
  } else if (isLoading) {
    //persist: yes, token: no
    console.log("loading");
    return <Loader />;
  } else if (isError && location.pathname === "/") {
    //If we are on main page
    return <Outlet />;
  } else if (isError) {
    //persist: yes, token: no
    return (
      <Navigate
        to={"/login"}
        replace
        state={{ from: location, errorMsg: "Сталася помилка, повторіть вхід" }}
      />
    );
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    console.log("success");
    return <Outlet />;
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    console.log("token and uninit");
    return <Outlet />;
  }

  return <Loader />;
};

export default PersistLogin;

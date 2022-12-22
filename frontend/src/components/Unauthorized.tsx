import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const Unauthorized = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname !== "/") {
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [navigate, pathname]);

  return (
    <div className="flex justify-center">
      <div className="py-6 px-4 bg-light mt-12 flex flex-col items-center gap-4 w-full max-w-md">
        <p className="text-2xl text-blue font-bold text-center">
          У вас немає доступу до цієї сторінки!
        </p>
        <p className="text-blue font-light text-center">
          Вас буде направлено до головної сторінки через кілька секунд...
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;

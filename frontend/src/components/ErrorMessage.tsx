import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const ErrorMessage = () => {
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

  const message =
    pathname === "/"
      ? "Спробуйте увійти пізніше"
      : "Вас буде перенаправлено на головну сторінку через кілька секунд...";

  return (
    <div className="flex justify-center">
      <div className="py-6 px-4 bg-light mt-12 flex flex-col items-center gap-4 w-full max-w-md">
        <p className="text-2xl text-blue font-bold text-center">Сталася помилка!</p>
        <p className="text-blue font-light text-center">{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;

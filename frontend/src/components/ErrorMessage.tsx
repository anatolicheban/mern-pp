import { useLocation } from "react-router";
import { Link } from "react-router-dom";

type ErrorMessageProps = { errMsg?: string } | { errMsg: never };

const ErrorMessage = ({ errMsg }: ErrorMessageProps) => {
  const { pathname } = useLocation();

  return (
    <div className="flex justify-center">
      <div className="py-6 px-4 bg-light mt-12 flex flex-col items-center gap-4 w-full max-w-md">
        <p className="text-2xl text-blue font-bold text-center">Сталася помилка!</p>
        {errMsg && <p className="text-blue font-light text-center">{errMsg}</p>}
        {pathname !== "/" ? (
          <Link className="underline" to={"/"}>
            На головну
          </Link>
        ) : (
          <p className="text-blue font-light text-center">Спробуйте увійти пізніше</p>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;

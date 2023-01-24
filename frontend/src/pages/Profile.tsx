import { Button } from "@mui/material";
import { useGetMyProfileQuery } from "../features/user/userApiSlice";
import { Navigate } from "react-router";
import { Loader, ErrorMessage, LogoutBtn } from "../components";

const Profile = () => {
  const { data: profile, isLoading, isError, error } = useGetMyProfileQuery();

  if (isLoading) return <Loader />;

  if (error) {
    if (error.status === 401 || error.status === 403) {
      return (
        <Navigate to={"/login"} state={{ errMsg: "Увійдіть у систему для доступу" }} replace />
      );
    }
    if (error.status === 529) {
      return <ErrorMessage errMsg="Забагато запитів з цієї IP адреси" />;
    }
  }

  if (isError) return <ErrorMessage />;

  return (
    <>
      <div className="bg-light p-4 mt-4 flex gap-4 relative">
        <LogoutBtn />
        <div>
          <img
            className="rounded-full object-cover h-[15rem] max-w-[15rem]"
            src="/assets/img/car.jpg"
            alt="profile-img"
          />
        </div>
        <div className="flex flex-col gap-1 justify-center">
          <div className="flex gap-2 items-center">
            <p className="text-xl font-semibold text-blue">@{profile?.username}</p>
            <p className="font-light text-base mt-[.2rem] text-gray-700">id: {profile?._id}</p>
          </div>
          <p className="text-sm text-gray-600">Зареєстрований {profile?.registrationDate}</p>
          <p>
            Email: <span className="font-semibold text-blue">{profile?.email}</span>
          </p>
          <p className="text-md">
            Оголошень: <span className="font-semibold text-blue">{profile?.adsAmount}</span>
          </p>
        </div>
      </div>
      {/* <div className="flex justify-end my-4 bg-light p-4">
        <div className="flex gap-4 flex-wrap">
          <Button variant="contained">Змінити аватар</Button>
          <Button variant="contained">Змінити номер тел.</Button>
          <Button variant="contained">Змінити пароль</Button>
          <Button variant="contained">Змінити ім'я користувача</Button>
        </div>
      </div> */}
    </>
  );
};

export default Profile;

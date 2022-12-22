import React from "react";
import Button from "@mui/material/Button";
import { useGetMyProfileQuery } from "../features/user/userApiSlice";
import { Navigate } from "react-router";

const Profile = () => {
  const { data: profile, isLoading, isError } = useGetMyProfileQuery();

  if (isError) return <Navigate to="/" state />;

  return (
    <>
      <div className="bg-light p-4 mt-4 flex gap-4">
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
      <div className="flex justify-end my-4 bg-light p-4">
        <div className="flex gap-4 flex-wrap">
          <Button variant="contained">Змінити аватар</Button>
          <Button variant="contained">Змінити номер тел.</Button>
          <Button variant="contained">Змінити пароль</Button>
          <Button variant="contained">Змінити ім'я користувача</Button>
        </div>
      </div>
    </>
  );
};

export default Profile;

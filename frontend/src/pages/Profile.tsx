import React from "react";
import Container from "../components/UI/Container";
import { Link, NavLink } from "react-router-dom";
import Button from "@mui/material/Button";

const Profile = () => {
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
          <p className="text-xl font-semibold text-blue">Чебан Анатолій</p>
          <p className="text-sm text-gray-600">Зареєстрований 12.01.2021</p>
          <p>
            Email: <span className="font-semibold text-blue">tolik.cheban.2019@gmail.com</span>
          </p>
          <p>
            Телефон: <span className="font-semibold text-blue">+380967232653</span>
          </p>
          <p className="text-md">
            Активних оголошень: <span className="font-semibold text-blue">12</span>{" "}
            {"(Усього: 134)"}
          </p>
        </div>
      </div>
      <div className="flex justify-end mt-4 bg-light p-4">
        <div>
          <Button variant="contained">Змінити аватар</Button>
          <Button sx={{ mx: ".5rem" }} variant="contained">
            Змінити номер тел.
          </Button>
          <Button variant="contained">Змінити пароль</Button>
        </div>
      </div>
    </>
  );
};

export default Profile;

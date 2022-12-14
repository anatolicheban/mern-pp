import React from "react";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import Container from "./UI/Container";

const FavLayout = () => {
  const activeLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    borderBottom: isActive ? "3px solid #023b59" : "none",
  });

  return (
    <>
      <div className="pt-5 bg-light">
        <h1 className="text-blue font-bold text-center text-2xl">Обране</h1>
        <Container>
          <nav className="gap-4 flex">
            <NavLink end style={activeLinkStyle} className="pb-2 text-blue" to={"."}>
              Список обранного
            </NavLink>
            <NavLink style={activeLinkStyle} className="pb-2 text-blue" to={"./lastseen"}>
              Недавно переглянуті
            </NavLink>
          </nav>
        </Container>
      </div>
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default FavLayout;

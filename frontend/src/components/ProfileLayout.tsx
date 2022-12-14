import React from "react";
import Container from "../components/UI/Container";
import { NavLink, Outlet } from "react-router-dom";

const ProfileLayout = () => {
  const activeLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    borderBottom: isActive ? "3px solid #023b59" : "none",
  });
  return (
    <>
      <div className="pt-5 bg-light">
        <h1 className="text-blue font-bold text-center text-2xl">Мій профіль</h1>
        <Container>
          <nav className="gap-4 flex">
            <NavLink end style={activeLinkStyle} className="pb-2 text-blue" to={"."}>
              Особисті дані
            </NavLink>
            <NavLink style={activeLinkStyle} className="pb-2 text-blue" to={"./ads"}>
              Мої оголошення
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

export default ProfileLayout;

import React from "react";
import Container from "../components/UI/Container";
import { NavLink, Outlet } from "react-router-dom";
import { Link } from "../models/models";

type SubLayoutProps = {
  links: Link[];
  title: string;
};

const SubLayout = ({ links, title }: SubLayoutProps) => {
  const activeLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    borderBottom: isActive ? "3px solid #023b59" : "none",
  });
  return (
    <>
      <div className="pt-5 bg-light">
        <h1 className="text-blue font-bold text-center text-2xl">{title}</h1>
        <Container>
          <nav className="gap-4 flex">
            {links.map((link, index) => {
              return (
                <NavLink
                  key={index}
                  end={link.path === "."}
                  style={activeLinkStyle}
                  className="pb-2 text-blue"
                  to={link.path}
                >
                  {link.name}
                </NavLink>
              );
            })}
          </nav>
        </Container>
      </div>
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default SubLayout;

import { IconButton, SxProps } from "@mui/material";
import Container from "./UI/Container";
import React from "react";
import { Link } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import TelegramIcon from "@mui/icons-material/Telegram";
import Button from "@mui/material/Button";

const Footer = () => {
  const ButtonStyles: SxProps = {
    textTransform: "none",
    gap: ".5rem",
    color: "#4cbfa6",
    borderColor: "#4cbfa6",
    ":hover": {
      color: "#f6ebf4",
      borderColor: "#f6ebf4",
    },
  };

  return (
    <footer className="footer bg-blue ">
      <Container className="flex flex-col items-center gap-2">
        <Link to={"/"} className="my-6">
          <IconButton edge="end" color="primary">
            <span className="text-5xl font-extrabold text-cyan">PP</span>
          </IconButton>
        </Link>
        <p className="w-full max-w-2xl text-center text-light mb-2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error neque perspiciatis
          doloremque voluptatibus tenetur recusandae incidunt similique dolorem soluta debitis,
          dignissimos, consequuntur adipisci voluptates animi sed, architecto saepe provident
          facilis.
        </p>
        <div className="flex justify-center gap-4 mb-10">
          <Button href="mailto:tolik.cheban.2019@gmail.com" variant="outlined" sx={ButtonStyles}>
            Email <EmailIcon />
          </Button>
          <Button href="https://t.me/tolyashkka" variant="outlined" sx={ButtonStyles}>
            Telegram <TelegramIcon />
          </Button>
          <Button href="https://github.com/anatolicheban" variant="outlined" sx={ButtonStyles}>
            GitHub <GitHubIcon />
          </Button>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

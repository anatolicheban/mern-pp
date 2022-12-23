import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";
import Container from "./UI/Container";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Tooltip, Button, IconButton } from "@mui/material";

const Header = () => {
  return (
    <header className="header py-2 shadow-md bg-blue">
      <Container className="flex items-center justify-between">
        <Link to={"/"}>
          <IconButton>
            <span className="text-5xl font-extrabold text-cyan">PP</span>
          </IconButton>
        </Link>
        <div className="flex items-center gap-4">
          <Link to={"/favourites"}>
            <IconButton edge="end">
              <Tooltip title="Обране">
                <FavoriteBorderIcon sx={{ color: "#fff", padding: "0rem" }} />
              </Tooltip>
            </IconButton>
          </Link>
          <Link to={"/my-profile"}>
            <IconButton edge="end">
              <Tooltip title="Профіль">
                <PersonOutlineIcon sx={{ color: "#fff" }} />
              </Tooltip>
            </IconButton>
          </Link>
          <Link to={"/new-ad"}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#f6ebf4",
                color: "#023b59",
                fontWeight: "600",
                ":hover": {
                  bgcolor: "#fff",
                },
                ml: "1rem",
              }}
            >
              Додати оголошення
            </Button>
          </Link>
        </div>
      </Container>
    </header>
  );
};

export default Header;

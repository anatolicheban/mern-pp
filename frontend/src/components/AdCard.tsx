import React, { useState } from "react";
import { ItemCard } from "../models/models";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

type AdCardProps = ItemCard;

const AdCard = ({ id, image, title, location, date, price, currency, isLiked }: AdCardProps) => {
  const [like, setLike] = useState(isLiked);

  const formatedDate = date ? new Date(date).toLocaleDateString() : null;
  const formatedPrice = () => {
    if (currency === "EUR") {
      return ` ${price + " €"}`;
    } else if (currency === "UAH") {
      return ` ${price + " ₴"}`;
    }
    return ` ${price + " $"}`;
  };

  const toggleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLike((prev) => !prev);
  };

  return (
    <li className="bg-light p-4 hover:shadow-md transition">
      <Link to={`/ads/${id}`}>
        <img src={image} alt={title} className={"object-cover h-48 w-56 max-w-full"} />
        <p className="mt-2 font-semibold">{title}</p>
        <span className="flex justify-between text-xs gap-1 mt-3">
          <p>{location + " обл."}</p>
          <p>{formatedDate}</p>
        </span>
        <span className="flex justify-between items-center">
          <p>{formatedPrice()}</p>
          <IconButton color="primary" onClick={toggleLike} sx={{ py: 0 }}>
            <Tooltip title={like ? "Видалити з обранного" : "Додати в обране"}>
              <div className="h-10">{like ? <FavoriteIcon /> : <FavoriteBorderIcon />}</div>
            </Tooltip>
          </IconButton>
        </span>
      </Link>
    </li>
  );
};

export default AdCard;
import React, { useState } from "react";
import { ItemCard } from "../models/models";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Tooltip, IconButton } from "@mui/material";
import { useTogleLikeAdMutation } from "../features/ads/adsApiSlice";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../utilities/formatPrice";

type AdCardProps = ItemCard;

const AdCard = ({ _id, image, title, location, date, price, currency, isLiked }: AdCardProps) => {
  const [like, setLike] = useState(isLiked);
  const navigate = useNavigate();

  const [likeAd] = useTogleLikeAdMutation();

  const formatedPrice = formatPrice(price, currency);

  const toggleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLike((prev) => !prev);
      await likeAd(_id).unwrap();
      console.log("liked!");
    } catch (err: any) {
      setLike((prev) => !prev);
      if (err?.status === 401 || err?.status === 403) {
        return navigate("/login", {
          state: { errorMsg: "Ви маєте бути авторизовані для цієї дії" },
        });
      }
      console.log(err);
    }
  };

  return (
    <li className="bg-light p-4 hover:shadow-md transition">
      <Link to={`/ads/${_id}`}>
        {image ? (
          <img src={image} alt={title} className={"object-cover h-48 w-56 max-w-full"} />
        ) : (
          <div className="h-48 w-56 bg-slate-200 flex items-center justify-center">
            <p className="font-bold text-2xl text-slate-400">Немає фото</p>
          </div>
        )}
        <p className="mt-2 font-semibold">{title}</p>
        <span className="flex justify-between text-xs gap-1 mt-3">
          <p>{location + " обл."}</p>
          <p>{date}</p>
        </span>
        <span className="flex justify-between items-center">
          <p>{formatedPrice}</p>
          <IconButton color="primary" onClick={toggleLike} sx={{ py: 0 }}>
            <Tooltip title={like ? "Видалити з обранного" : "Додати в обране"}>
              <div className="h-10">{like ? <Favorite /> : <FavoriteBorder />}</div>
            </Tooltip>
          </IconButton>
        </span>
      </Link>
    </li>
  );
};

export default AdCard;

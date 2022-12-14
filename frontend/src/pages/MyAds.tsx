import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { Ads } from "../data/dummy";
import AdCard from "../components/AdCard";

const MyAds = () => {
  return (
    <>
      <div className="flex gap-4 mt-4">
        <TextField
          label={"Пошук"}
          placeholder={"Пошук серед ваших оголошень"}
          fullWidth
          color="primary"
        />
        <Button className="max-w-[12rem] w-full" variant="contained">
          <SearchIcon />
        </Button>
      </div>

      <ul className="flex flex-wrap gap-4 list-none justify-center mb-8 mt-4">
        {Ads.map((item) => (
          <AdCard key={item.id} {...item} />
        ))}
      </ul>
    </>
  );
};

export default MyAds;

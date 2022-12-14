import React from "react";
import AdCard from "../components/AdCard";
import { Ads } from "../data/dummy";

const LastSeen = () => {
  return (
    <ul className="flex flex-wrap gap-4 list-none justify-center my-8">
      {Ads.map((item) => (
        <AdCard key={item.id} {...item} />
      ))}
    </ul>
  );
};

export default LastSeen;

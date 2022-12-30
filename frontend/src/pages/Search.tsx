import React from "react";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // searchParams.set("categories", JSON.stringify(["lol", "kek"]));
  console.log(searchParams.get("categories"));

  return <div>Search</div>;
};

export default Search;

import React from "react";
import { Link } from "react-router-dom";

type SearchResultProps = {
  isError: boolean;
  isLoading: boolean;
  ads?: { _id: string; title: string }[];
};

const SearchResult = ({ isLoading, ads }: SearchResultProps) => {
  if (isLoading) {
    return (
      <p className="absolute bg-white text-gray-200 rounded-md w-full shadow-sm">Завантаження...</p>
    );
  }

  if (isLoading) {
    return <p className="absolute bg-white text-red-400 rounded-md w-full shadow-sm">Помилка!</p>;
  }

  return (
    <ul
      className="absolute bg-white rounded-md w-full shadow-sm"
      style={{
        top: "calc(100% + .5rem)",
      }}
    >
      {ads?.map(({ _id, title }) => (
        <li key={_id}>
          <Link className="block p-1 hover:bg-light cursor-pointer" to={`/ads/${_id}`}>
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SearchResult;

import { Container } from "./";
import { TextField, Button } from "@mui/material";
import Search from "@mui/icons-material/Search";
import SearchResult from "./SearchResult";
import { useLazySearchAdsQuery } from "../features/ads/adsApiSlice";
import React, { useState, useEffect, useRef } from "react";

type SearchFieldProps = {
  count?: number;
};

const SearchField = ({ count }: SearchFieldProps) => {
  const [keyword, setKeyword] = useState("");
  const [isResultVisible, setIsResultVisible] = useState(false);
  const [search, { isError, data, isLoading }] = useLazySearchAdsQuery();
  const resultRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (keyword.length >= 3) {
      const timer = setTimeout(() => {
        search({ keyword });
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [keyword, search]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.target !== resultRef.current) {
        setIsResultVisible(false);
      }
    };
    window.addEventListener("click", handler);

    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsResultVisible(true);
    setKeyword(e.currentTarget.value);
  };

  return (
    <div className="bg-light py-6">
      <Container>
        <div className="flex gap-4">
          <div className="w-full relative">
            <TextField
              label={"Пошук"}
              placeholder={count ? `Пошук серед ${count} оголошень` : ""}
              fullWidth
              color="primary"
              onChange={handleChange}
            />
            {isResultVisible && (
              <div ref={resultRef}>
                <SearchResult isLoading={isLoading} isError={isError} ads={data} />
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SearchField;

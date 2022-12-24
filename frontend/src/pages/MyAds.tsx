import React, { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Button, TextField, Pagination } from "@mui/material";
import { useGetMyAdsQuery } from "../features/ads/adsApiSlice";
import { Navigate, useSearchParams } from "react-router-dom";
import { AdCard, ErrorMessage, NoAdsMessage, Loader } from "../components";

const MyAds = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { isError, error, isLoading, data } = useGetMyAdsQuery(page, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (page < 1 || (data && page > data.pages)) {
      return setSearchParams({
        page: "1",
      });
    }
  }, [page, setSearchParams, data]);

  const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => {
    if (value === page) return;
    setSearchParams({
      page: value.toString(),
    });
  };

  if (error) {
    if (error.status === 401 || error.status === 403) {
      return (
        <Navigate to={"/login"} state={{ errMsg: "Увійдіть у систему для доступу" }} replace />
      );
    }
    if (error.status === 529) {
      return <ErrorMessage errMsg="Забагато запитів з цієї IP адреси" />;
    }
  }

  if (isLoading) return <Loader />;

  if (isError) return <ErrorMessage />;

  if (!data?.ads.length) return <NoAdsMessage />;

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
        {data?.ads.map((item) => (
          <AdCard key={item._id} {...item} />
        ))}
      </ul>
      <div className="flex my-4 justify-center">
        <Pagination count={data?.pages} page={page} onChange={handlePageChange} />
      </div>
    </>
  );
};

export default MyAds;

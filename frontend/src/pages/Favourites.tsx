import { ChangeEvent, useEffect } from "react";
import { AdCard, ErrorMessage, NoAdsMessage, Loader } from "../components";
import { Pagination } from "@mui/material";
import { useSearchParams, Navigate } from "react-router-dom";
import { useGetFavAdsQuery } from "../features/ads/adsApiSlice";

const Favourites = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { isError, error, isLoading, data } = useGetFavAdsQuery(page, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (page < 1 || (data && page > data.pages)) {
      return setSearchParams({
        page: "1",
      });
    }
  }, [page, setSearchParams, data]);

  const handlePageChange = (e: ChangeEvent<unknown>, value: number) => {
    if (value === page) return;
    setSearchParams({
      page: value.toString(),
    });
  };

  if (error) {
    if (error.status === 401 || error.status === 403) {
      return (
        <Navigate to={"/login"} state={{ errorMsg: "Увійдіть у систему для доступу" }} replace />
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
      <ul className="flex flex-wrap gap-4 list-none justify-center my-8">
        {data?.ads.map((item) => (
          <AdCard key={item.id} {...item} />
        ))}
      </ul>
      <div className="flex my-4 justify-center">
        <Pagination count={data?.pages} page={page} onChange={handlePageChange} />
      </div>
    </>
  );
};

export default Favourites;

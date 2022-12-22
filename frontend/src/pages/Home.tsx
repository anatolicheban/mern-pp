import React, { useEffect } from "react";
import Container from "../components/UI/Container";
import { Button, TextField, Pagination } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AdCard from "../components/AdCard";
import { useGetLatestAdsQuery } from "../features/ads/adsApiSlice";
import ErrorMessage from "../components/ErrorMessage";
import { useSearchParams } from "react-router-dom";
import NoAdsMessage from "../components/NoAdsMessage";
import Loader from "../components/Loader";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const { isError, isLoading, data, refetch } = useGetLatestAdsQuery(page as number, {
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

  const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setSearchParams({
      page: value.toString(),
    });
    refetch();
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) return <ErrorMessage />;

  if (!data?.ads.length) return <NoAdsMessage />;

  return (
    <>
      <div className="bg-light py-6">
        <Container>
          <div className="flex gap-4">
            <TextField
              label={"Пошук"}
              placeholder={"Пошук серед 1 939 оголошень"}
              fullWidth
              color="primary"
            />
            <Button className="max-w-[12rem] w-full" variant="contained">
              <SearchIcon />
            </Button>
          </div>
        </Container>
      </div>
      <div>
        <Container>
          <h2 className="text-blue text-2xl text-center py-3 font-semibold mt-2">
            Останні публікації
          </h2>
          <ul className="flex flex-wrap gap-4 list-none justify-center mb-8">
            {data?.ads.map((item) => (
              <AdCard key={item.id} {...item} />
            ))}
          </ul>
        </Container>
      </div>
      <div className="flex my-4 justify-center">
        <Pagination count={data?.pages} page={page} onChange={handlePageChange} />
      </div>
    </>
  );
};

export default Home;

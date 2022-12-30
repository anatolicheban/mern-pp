import React, { useEffect } from "react";
import { Pagination } from "@mui/material";
import { useGetLatestAdsQuery } from "../features/ads/adsApiSlice";
import { useSearchParams } from "react-router-dom";
import { Loader, NoAdsMessage, ErrorMessage, AdCard, Container, SearchField } from "../components";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const auth = useAuth();

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const { isError, error, isLoading, data } = useGetLatestAdsQuery(
    { page, userId: auth?.userId },
    {
      refetchOnFocus: true,
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
    }
  );

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

  if (error?.status === 529) {
    return <ErrorMessage errMsg="Забагато запитів з цієї IP адреси" />;
  }

  if (isLoading) return <Loader />;

  if (isError) return <ErrorMessage />;

  if (!data?.ads.length) return <NoAdsMessage />;

  return (
    <>
      <SearchField count={data?.count} />
      <div>
        <Container>
          <h2 className="text-blue text-2xl text-center py-3 font-semibold mt-2">
            Останні публікації
          </h2>
          <ul className="flex flex-wrap gap-4 list-none justify-center mb-8">
            {data?.ads.map((item) => (
              <AdCard key={item._id} {...item} />
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

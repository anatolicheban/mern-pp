import React from "react";
import Container from "../components/UI/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { Ads } from "../data/dummy";
import AdCard from "../components/AdCard";

const Home = () => {
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
            {Ads.map((item) => (
              <AdCard key={item.id} {...item} />
            ))}
          </ul>
        </Container>
      </div>
    </>
  );
};

export default Home;

import React, { useEffect, useRef, useState } from "react";
import { Button, Alert, Select, MenuItem } from "@mui/material";
import { adCategories, locations } from "../data/dummy";
import {
  Container,
  SimpleInput,
  CategoriesInput,
  ImagesInput,
  LocationInput,
  Loader,
} from "../components";
import { usePostAdMutation } from "../features/ads/adsApiSlice";
import { useNavigate } from "react-router";
import { Currency } from "../models/models";

const NewAd = () => {
  const navigate = useNavigate();

  //Fields states
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState<string>("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState<Currency>("UAH");
  console.log(price);

  const errorRef = useRef<HTMLDivElement>(null);

  const [errMsg, setErrMsg] = useState("");

  const [postAd, { isLoading }] = usePostAdMutation();

  const handlePostAd = async () => {
    const body = new FormData();
    body.append("title", title);
    images.forEach((file) => {
      body.append("images", file);
    });
    categories.forEach((item) => {
      body.append("categories", item);
    });
    body.append("description", desc);
    body.append("location", location);
    body.append("price", price);
    body.append("currency", currency);

    try {
      const { id } = await postAd(body).unwrap();
      navigate(`/ads/${id}`);
    } catch (err: any) {
      console.log(err);
      errorRef.current?.focus();
      if (err?.data?.status === 529) return setErrMsg("Забагато запитів, спробуйте пізніше");
      if (err?.data?.status === 500) return setErrMsg("Сталася помилка серверу!");
      if (err?.data?.status === 401)
        return navigate("/login", { state: { errorMsg: "Увійдіть до системи для цієї дії" } });
      if (err?.data?.message) return setErrMsg(err.data.message);
      setErrMsg("Сталася непередбачувана помилка :(");
    }
  };

  useEffect(() => {
    setErrMsg("");
  }, [title, categories, images, desc, location]);

  useEffect(() => {
    if (errMsg) errorRef.current?.scrollIntoView();
  }, [errMsg]);

  if (isLoading) return <Loader />;

  return (
    <div className="bg-light">
      <Container className="py-8">
        <h1 className="pb-8 text-2xl font-semibold text-blue">Створити оголошення</h1>
        <form>
          <div className="text-2xl bg-white p-4 mb-4">
            {errMsg && (
              <Alert severity="error" aria-live="assertive" className="py-2" ref={errorRef}>
                {errMsg}
              </Alert>
            )}
            <h3 className="mb-4">Опишіть товар</h3>
            <SimpleInput label="Вкажіть назву" value={title} onChange={setTitle} />
            <div className="mt-4">
              <div className="max-w-[42rem]">
                <CategoriesInput
                  value={categories}
                  options={adCategories}
                  onChange={setCategories}
                />
              </div>
            </div>
          </div>
          <div className="text-2xl bg-white p-4 mb-4">
            <h3 className="mb-4">
              Фото товару <span className="text-lg font-medium">{"(до 5 зображень)"}</span>
            </h3>
            <ImagesInput images={images} onChange={setImages} />
          </div>
          <div className="text-2xl bg-white p-4 mb-4">
            <h3 className="mb-4">Опишіть ваш товар</h3>
            <SimpleInput
              label="Опис"
              placeholder="Подумайте, що ви хотіли б дізатися про оголошення, та додайте це в опис"
              multiline
              value={desc}
              onChange={setDesc}
            />

            <div className="flex justify-between mt-2">
              <p className="text-sm text-blue">
                {80 - desc.length > 0 && `Залишилось ще ${80 - desc.trim().length} символів`}
              </p>

              <p className="text-sm text-blue">{desc.trim().length}/9000</p>
            </div>
          </div>
          <div className="text-2xl bg-white p-4 mb-4">
            <h3 className="mb-4">Місцезнаходження</h3>
            <LocationInput value={location as string} onChange={setLocation} options={locations} />
          </div>
          <div className="text-2xl bg-white p-4 mb-4">
            <h3 className="mb-4">Ціна</h3>
            <div className="flex gap-4">
              <SimpleInput
                label="Вкажіть ціну"
                type={"number"}
                value={price}
                onChange={setPrice}
                sx={{ maxWidth: "15rem", w: "100%" }}
              />
              <Select
                variant="filled"
                onChange={(e) => setCurrency(e.target.value as Currency)}
                value={currency}
                label="w"
              >
                <MenuItem value="UAH">UAH</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
              </Select>
            </div>
          </div>
          <div className="mt-4 bg-white p-3 flex justify-end">
            <Button disabled={isLoading} variant="contained" onClick={handlePostAd}>
              {isLoading ? "Обробка..." : "Опублікувати"}
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default NewAd;

import { useState } from "react";
import { Container, ErrorMessage, Loader } from "../components";
import Slider from "react-slick";
import { sliderImages } from "../data/dummy";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, Chip } from "@mui/material";
import { useGetSingleAdQuery } from "../features/ads/adsApiSlice";
import { useParams } from "react-router";
import { Currency, formatPrice } from "../utilities/formatPrice";
import { useAuth } from "../hooks/useAuth";
import { Edit, Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { DeleteAd, MyModal } from "../components";

const SingleAd = () => {
  const { id } = useParams();
  const [isEmailVisible, setIsEmailVisible] = useState(false);
  const { data, isLoading, isError, error } = useGetSingleAdQuery(id as string);
  const auth = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (error?.status === 404)
    return <ErrorMessage errMsg="Такого оголошення немає або аккаунт власника видалено" />;
  if (error?.status === 400)
    return <ErrorMessage errMsg="Некорректний або відсутній ідентифікатор" />;
  if (error?.status === 529) return <ErrorMessage errMsg="Забагато запитів з вашої IP адреси" />;

  if (isLoading) return <Loader />;

  if (isError) {
    return <ErrorMessage />;
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const formatedPrice = formatPrice(Number(data?.price), data?.currency as Currency);

  return (
    <>
      <MyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DeleteAd id={data?._id as string} />
      </MyModal>
      {auth?.userId === data?.owner && (
        <>
          <Container className="flex mt-4 justify-end max-w-6xl mx-auto">
            <div className=" flex gap-2">
              <Link to={"./edit"} className="bg-light py-2 px-3 hover:bg-gray-300">
                <Edit className="text-blue" />
              </Link>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-light py-2 px-3 hover:bg-gray-300"
              >
                <Delete className="text-blue" />
              </button>
            </div>
          </Container>
        </>
      )}
      <Container className="bg-light pt-4 pb-8 max-w-6xl mx-auto">
        <div className="bg-white max-w-4xl mx-auto">
          <Slider className="mx-[-2rem]" {...sliderSettings}>
            {sliderImages.map((item) => (
              <div key={item} className=" max-h-[33rem]">
                <img
                  className="h-[34rem] w-full object-cover object-center"
                  src={item}
                  key={crypto.randomUUID()}
                  alt={item}
                />
              </div>
            ))}
          </Slider>
        </div>
      </Container>
      <Container className="bg-light p-4 my-2 max-w-6xl mx-auto">
        <p className="text-sm">Опубліковано {data?.date}</p>
        <p className="text-3xl mt-2 text-blue">{data?.title}</p>
        <p className="text-blue text-3xl mt-2 font-bold">{formatedPrice}</p>
        <div className="my-2 flex flex-wrap gap-2">
          {data?.categories?.map((item) => (
            <Link key={item} to={`/search&categories=${item}`}>
              <Chip
                label={item}
                variant="outlined"
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: "#4cbfa6",
                    color: "#fff",
                  },
                }}
              />
            </Link>
          ))}
        </div>
        <p className="mt-4">
          <span className="font-bold text-lg text-blue">Опис: </span>
          {data?.description}
        </p>
        <div className="border-blue border-t-2 pt-2 mt-2 flex justify-between">
          <p className="font-light">id: {data?._id}</p>
          <p>{data?.location} обл.</p>
        </div>
      </Container>
      {auth?.userId !== data?.owner && (
        <Container className="bg-light p-4 my-2 max-w-6xl mx-auto">
          <p className="uppercase text-lg">Зв'язатися з продавцем</p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <img
                src="/assets/img/car.jpg"
                alt="alt"
                className=" w-20 h-20 object-cover rounded-full"
              />
              <div>
                <p className="text-blue font-semibold">@{data?.ownerUsername}</p>
                <p>
                  Зареєстрований{" "}
                  <span className="text-blue font-semibold">{data?.ownerRegDate}</span>
                </p>
              </div>
            </div>
            {isEmailVisible ? (
              <p>
                <span className="font-semibold text-blue">Email: </span>
                {data?.ownerEmail}
              </p>
            ) : (
              <Button
                onClick={() => {
                  setIsEmailVisible((prev) => !prev);
                }}
                variant="contained"
                sx={{
                  w: "16rem",
                }}
              >
                Зв'язатися
              </Button>
            )}
          </div>
        </Container>
      )}
    </>
  );
};

export default SingleAd;

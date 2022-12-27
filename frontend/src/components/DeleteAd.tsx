import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { useDeleteAdMutation } from "../features/ads/adsApiSlice";
import ErrorMessage from "./ErrorMessage";

const DeleteAd = ({ id }: { id: string }) => {
  console.log(id);

  const [deleteAd, { isError }] = useDeleteAdMutation();
  const navigate = useNavigate();

  const handleDeleteAd = async () => {
    try {
      const { message } = await deleteAd(id).unwrap();
      navigate("/my-profile/ads");
    } catch (err) {
      console.log(err);
    }
  };

  if (isError) return <ErrorMessage />;

  return (
    <>
      <h2>Ви дійсно хочете видалити цю публікацію?</h2>
      <div className="flex justify-center mt-2">
        <Button onClick={handleDeleteAd} variant="contained">
          Видалити
        </Button>
      </div>
    </>
  );
};

export default DeleteAd;

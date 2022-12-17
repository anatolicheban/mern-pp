import React, { useState, useRef, useEffect } from "react";
import Container from "../components/UI/Container";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { top100Films } from "../data/dummy";
import Chip from "@mui/material/Chip";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { locations } from "../data/dummy";
import Button from "@mui/material/Button";

const NewAd = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [imagesPreviews, setImagesPreviews] = useState<{ url: string; name: string }[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState("");

  const fileInput = useRef<HTMLInputElement>(null);

  const onFileBtnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    fileInput.current?.click();
  };

  const onDeleteFile = (e: React.MouseEvent<SVGSVGElement>) => {
    const imageUrl = e.currentTarget.dataset.url;
    const imageName = e.currentTarget.dataset.name;
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }
    setImages((prev) => {
      return prev.filter((item) => item.name !== imageName);
    });
  };

  useEffect(() => {
    const imagesPreviewsArray = images.map((file) => {
      return {
        url: URL.createObjectURL(file),
        name: file.name,
      };
    });

    setImagesPreviews(imagesPreviewsArray);
  }, [images]);

  const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles as ArrayLike<File>);

    setImages((prev) => {
      if ([...prev, ...selectedFilesArray].length > 5) {
        return prev;
      }
      return [...prev, ...selectedFilesArray];
    });
    // FOR BUG IN CHROME
    event.target.value = "";
  };

  return (
    <div className="bg-light">
      <Container className="py-8">
        <h1 className="pb-8 text-2xl font-semibold text-blue">Створити оголошення</h1>
        <form>
          <div className="text-2xl bg-white p-4 mb-4">
            <h3 className="mb-4">Опишіть товар</h3>
            <TextField
              label="Вкажіть назву"
              variant="filled"
              fullWidth
              InputProps={{ className: "max-w-[32rem] w-full" }}
            />
            <div className="mt-4">
              <div className="max-w-[42rem]">
                <Autocomplete
                  value={categories}
                  onChange={(e, newValue) => setCategories(newValue)}
                  multiple
                  options={top100Films.map((option) => option.title)}
                  renderTags={(value: readonly string[], getTagProps) =>
                    value.map((option: string, index: number) => (
                      <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="filled"
                      label="Категорії"
                      placeholder="Обрати категорію"
                      sx={{
                        maxWidth: "48rem",
                      }}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="text-2xl bg-white p-4 mb-4">
            <h3 className="mb-4">
              Фото товару <span className="text-lg font-medium">{"(до 5 зображень)"}</span>
            </h3>
            <div className="flex flex-wrap gap-4 px-4">
              <input
                onChangeCapture={onSelectFile}
                type={"file"}
                ref={fileInput}
                accept={".webp, .png, .jpg, .jpeg"}
                multiple
                className="hidden"
              />
              {images.length === 5 || (
                <div className="bg-light h-40 w-52 flex items-center justify-center relative">
                  <AddAPhotoIcon className="absolute !w-16 !h-16 opacity-[0.15]" />
                  <button
                    className="text-base font-semibold hover:underline z-20"
                    onClick={onFileBtnClick}
                  >
                    Додати фото
                  </button>
                </div>
              )}
              {imagesPreviews.map((item) => (
                <div key={item.url} className="relative">
                  <img
                    src={item.url}
                    alt="Error! Retry uploading"
                    className="h-40 object-cover w-52"
                  />
                  <div className="absolute opacity-0 w-full h-full bg-light top-0 hover:opacity-50 flex items-center justify-center hover:first:opacity-50">
                    <Tooltip title="Видалити">
                      <DeleteIcon
                        data-url={item.url}
                        data-name={item.name}
                        className="cursor-pointer !h-8 !w-8"
                        onClick={onDeleteFile}
                      />
                    </Tooltip>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-2xl bg-white p-4 mb-4">
            <h3 className="mb-4">Опишіть ваш товар</h3>
            <TextField
              label="Опис"
              placeholder="Подумайте, що ви хотіли б дізатися про оголошення, та додайте це в опис"
              multiline
              variant="filled"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              sx={{
                maxWidth: "32rem",
                width: "100%",
              }}
            />
            <div className="flex justify-between mt-2">
              <p className="text-sm text-blue">Залишилось ще {80 - desc.length} символів</p>
              <p className="text-sm text-blue">{desc.length}/9000</p>
            </div>
          </div>
          <div className="text-2xl bg-white p-4 mb-4">
            <h3 className="mb-4">Місцезнаходження</h3>
            <Autocomplete
              autoComplete={false}
              noOptionsText="Область не знайдено"
              disablePortal
              options={locations}
              value={location}
              onChange={(e, newValue) => {
                setLocation(newValue as string);
              }}
              sx={{
                maxWidth: "32rem",
                width: "100%",
              }}
              renderInput={(params) => (
                <TextField
                  variant="filled"
                  type={"text"}
                  {...params}
                  label="Область"
                  placeholder="Вкажіть область вашого нас. пункту"
                />
              )}
            />
          </div>
          <div className="text-2xl bg-white p-4 mb-4">
            <h3 className="mb-4">Контактні дані</h3>
            <div>
              <TextField
                variant="filled"
                label="Ім'я"
                type="text"
                sx={{
                  maxWidth: "32rem",
                  width: "100%",
                }}
              />
            </div>
            <div className="mt-4">
              <TextField
                variant="filled"
                label="Email-адреса"
                type={"email"}
                sx={{
                  maxWidth: "32rem",
                  width: "100%",
                }}
              />
            </div>
            <div className="mt-4">
              <TextField
                variant="filled"
                label="Номер телефону"
                type={"tel"}
                sx={{
                  maxWidth: "32rem",
                  width: "100%",
                }}
              />
            </div>
          </div>
          <div className="mt-4 bg-white p-3 flex justify-end">
            <Button className="" variant="contained">
              Опублікувати
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default NewAd;

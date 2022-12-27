import React, { useRef, useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import { Delete, AddAPhoto } from "@mui/icons-material";

type ImagesInputProps = {
  onChange: (cb: (prev: File[]) => File[]) => void;
  images: File[];
};

const ImagesInput = ({ onChange, images }: ImagesInputProps) => {
  const [imagesPreviews, setImagesPreviews] = useState<{ url: string; name: string }[]>([]);

  useEffect(() => {
    const imagesPreviewsArray = images.map((file) => {
      return {
        url: URL.createObjectURL(file),
        name: file.name,
      };
    });

    setImagesPreviews(imagesPreviewsArray);
  }, [images]);

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
    onChange((prev) => {
      return prev.filter((item) => item.name !== imageName);
    });
  };

  const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles as ArrayLike<File>);

    onChange((prev) => {
      if ([...prev, ...selectedFilesArray].length > 5) {
        return prev;
      }
      return [...prev, ...selectedFilesArray];
    });
    // FOR BUG IN CHROME
    event.target.value = "";
  };

  return (
    <div className="flex flex-wrap gap-4 px-4">
      <input
        onChange={onSelectFile}
        type={"file"}
        ref={fileInput}
        accept={".webp, .png, .jpg, .jpeg"}
        multiple
        className="hidden"
      />
      {images.length === 5 || (
        <div className="bg-light h-40 w-52 flex items-center justify-center relative">
          <AddAPhoto className="absolute !w-16 !h-16 opacity-[0.15]" />
          <button className="text-base font-semibold hover:underline z-20" onClick={onFileBtnClick}>
            Додати фото
          </button>
        </div>
      )}
      {imagesPreviews.map((item) => (
        <div key={item.url} className="relative">
          <img src={item.url} alt="Error! Retry uploading" className="h-40 object-cover w-52" />
          <div className="absolute opacity-0 w-full h-full bg-light top-0 hover:opacity-50 flex items-center justify-center hover:first:opacity-50">
            <Tooltip title="Видалити">
              <Delete
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
  );
};
export default React.memo(ImagesInput);

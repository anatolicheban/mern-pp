import React from "react";

const NoAdsMessage = () => {
  return (
    <div className="flex justify-center">
      <div className="py-6 px-4 bg-light mt-12 flex flex-col items-center gap-4 w-full max-w-md">
        <p className="text-2xl text-blue font-bold text-center">Немає таких оголошень!</p>
        <p className="text-blue font-light text-center">Завітайте сюди пізніше :{")"}</p>
      </div>
    </div>
  );
};

export default NoAdsMessage;

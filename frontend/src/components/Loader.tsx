import React from "react";
import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <Oval
      height={80}
      width={80}
      color="#4cbfa6"
      wrapperStyle={{}}
      wrapperClass="h-[100vh] w-[100vw] bg-light flex items-center justify-center opacity-50"
      visible={true}
      secondaryColor="#023b59"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};

export default Loader;

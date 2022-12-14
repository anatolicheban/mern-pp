import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 w-full">
      <div className={className}>{children}</div>
    </div>
  );
};

export default Container;

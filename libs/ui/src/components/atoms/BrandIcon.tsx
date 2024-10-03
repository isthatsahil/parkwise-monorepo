import React, { ReactNode } from "react";

export type IBrandIcon = {
  children?: ReactNode;
};
const BrandIcon = ({
  children = <div className="bg-gray-300 shadow w-2 h-4 animate-park-car" />,
}: IBrandIcon) => {
  return (
    <div className="inline-block overflow-hidden">
      <div className="flex items-center justify-center border-2 border-primary w-4 h-6">
        {children}
      </div>
    </div>
  );
};

export default BrandIcon;

import React, { ReactNode } from "react";
import BrandIcon from "../atoms/BrandIcon";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

export type IAuthLayout = {
  children: ReactNode;
  title: string;
};

const AuthLayout = ({ title, children }: IAuthLayout): React.JSX.Element => {
  return (
    <div className="grid min-h-[calc(100vh-4rem)] gap-4 overflow-hidden md:grid-cols-2 lg:grid-cols-4">
      <div className="relative">
        <div className="flex flex-col justify-center h-full p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg mx-auto">
            <h1 className="flex items-center gap-2 mb-2 text-2xl">
              <BrandIcon /> <div>{title}</div>
            </h1>
            {children}
            <div className="mt-4 text-sm text-gray-300">
              <Link href="/" className="flex items-center gap-2">
                <MoveLeft className="w-4 h-4" /> Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

import { SVGProps } from "react";
import { TUser } from "./userType";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type TCategory = {
  _id: string;
  name: string;
};

export type TPayment = {
  _id: string;
  user: TUser;
  tranId: string;
  price: number;
  status: string;
};

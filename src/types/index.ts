import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type TCategory = {
  _id: string;
  name: string;
};

export type TPayment = {
  user: string;
  tranId: string;
  price: number;
  status: string;
};

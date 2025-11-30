export type children = {
  children: ReactNode;
};

export type headingProps = {
  tag?: string | ReactNode;
  title?: string;
  desc?: string;
};
export type HousesCardProps = {
  name: string;
  image: string;
  location: string;
  price: number;
  id?: number | string;
};

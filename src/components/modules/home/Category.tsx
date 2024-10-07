"use client";

import img1 from "@/src/assets/travel-1.jpg";
import img2 from "@/src/assets/travel-2.jpg";
import img3 from "@/src/assets/travel-3.jpg";
import categoryService from "@/src/services/category/categoryService";
import { TCategory } from "@/src/types";
import { Skeleton } from "@nextui-org/skeleton";
import Link from "next/link";

type Tcategories = {
  image: string;
} & TCategory;

const Category = () => {
  const images = [img1.src, img2.src, img3.src];
  const { data, isLoading, isPending } = categoryService.allCategory("id", 3);
  if (isLoading || isPending) {
    return (
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4 my-20">
        {[...Array(3)]?.map(() => (
          <Skeleton className="h-40 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  const categories = data?.data?.map((category: TCategory, index: number) => ({
    ...category,
    image: images[index],
  }));
  console.log(categories);
  return (
    <div className="my-20">
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
        {categories?.map((item: Tcategories) => (
          <div
            style={{
              background: `url(${item?.image})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100%",
            }}
            className="py-20 rounded-xl text-center relative"
            key={item?._id}
          >
            <div className="absolute rounded-xl inset-0 opacity-65 bg-black"></div>
            <Link
              href={`/news-feed?category=${item?.name}`}
              className="hover:underline capitalize relative z-40 text-white font-bold text-2xl"
            >
              {item?.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;

"use client";
import PostCard from "@/src/components/modules/news-feed/PostCard";
import Container from "@/src/components/UI/Container";
import postService from "@/src/services/posts/postService";
import InfiniteScroll from "react-infinite-scroll-component";
import { TPost } from "@/src/types/post";
import { Input } from "@nextui-org/input";
import PostCardLoading from "@/src/components/modules/news-feed/PostCardLoading";
import { useRouter } from "next/navigation";
import { HiSelector } from "react-icons/hi";
import { TCategory } from "@/src/types/comment";
import { Select, SelectItem } from "@nextui-org/select";
import { Checkbox } from "@nextui-org/checkbox";
import categoryService from "@/src/services/category/categoryService";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const page = ({ searchParams }: { searchParams: any }) => {
  const params = new URLSearchParams(searchParams);
  const queryClient = useQueryClient();
  const router = useRouter();
  const category = params.get("category");
  const sort = params.get("sort");
  const [isSelected, setIsSelected] = useState(!!sort);
  const {
    data: allCategory,
    isLoading: categoryLoading,
    isPending: categoryPending,
  } = categoryService.allCategory("id");
  const {
    data,
    fetchNextPage,
    isLoading,
    refetch,
    isFetching,
    isPending,
    hasNextPage,
  } = postService.getAllPost({ category, sort });

  const DataLoading = (
    <div className="space-y-4 mt-4">
      {[...Array(10)].map(() => (
        <PostCardLoading />
      ))}
    </div>
  );

  if (isLoading || isPending || categoryLoading || categoryPending)
    return (
      <Container>
        <div className="grid md:grid-cols-2 gap-5 my-10">
          {DataLoading}
          <div className="md:order-1 -order-1 mt-4">
            <Select
              isLoading={isFetching || categoryPending}
              placeholder="Category"
              aria-label="Category"
              required={true}
              defaultSelectedKeys={category ? [category] : undefined}
              onChange={(e) =>
                handleCategoryChange(`category=${e.target.value}`)
              }
              disableSelectorIconRotation
              selectorIcon={<HiSelector />}
            >
              <SelectItem key={"all"} className="capitalize">
                All
              </SelectItem>
              {allCategory?.data?.map((item: TCategory) => (
                <SelectItem key={item?.name} className="capitalize">
                  {item?.name}
                </SelectItem>
              ))}
            </Select>
            <div className="mt-4">
              <Checkbox
                onClick={() => {
                  handleCategoryChange(`sort=${isSelected}`);
                }}
                isSelected={isSelected}
                onValueChange={setIsSelected}
              >
                sort by upvote
              </Checkbox>
            </div>
          </div>
        </div>
      </Container>
    );
  const handleCategoryChange = (category: string) => {
    const [key, value] = category.split("=");
    queryClient.invalidateQueries({ queryKey: ["getAllPost"] });
    if (value === "all") {
      params.delete(key);
    } else if (value === "false") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/news-feed?${params.toString()}`);
  };
  console.log(data);
  return (
    <Container>
      <div className="grid md:grid-cols-2 gap-5 my-10">
        {data?.pages[0]?.data?.length ? (
          <InfiniteScroll
            dataLength={data?.pages?.flatMap((page) => page.items).length || 0}
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={DataLoading}
            endMessage={
              <p className="text-center font-bold mt-3">
                No more posts to load
              </p>
            }
          >
            {data?.pages.flatMap((page) => (
              <div className="space-y-4 mt-4">
                {page?.data?.map((item: TPost) => (
                  <PostCard data={item} feedPage />
                ))}
              </div>
            ))}
          </InfiniteScroll>
        ) : (
          <div className="capitalize text-lg font-bold flex text-center justify-center items-center min-h-[calc(100vh-100px)]">
            no data found
          </div>
        )}

        <div className="md:order-1 -order-1 mt-4">
          <Select
            isLoading={isFetching || categoryPending}
            placeholder="Category"
            aria-label="Category"
            required={true}
            defaultSelectedKeys={category ? [category] : undefined}
            onChange={(e) => handleCategoryChange(`category=${e.target.value}`)}
            disableSelectorIconRotation
            selectorIcon={<HiSelector />}
          >
            <SelectItem key={"all"} className="capitalize">
              All
            </SelectItem>
            {allCategory?.data?.map((item: TCategory) => (
              <SelectItem key={item?.name} className="capitalize">
                {item?.name}
              </SelectItem>
            ))}
          </Select>
          <div className="mt-4">
            <Checkbox
              onClick={() => {
                handleCategoryChange(`sort=${!isSelected}`);
              }}
              isSelected={isSelected}
              onValueChange={setIsSelected}
            >
              sort by upvote
            </Checkbox>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default page;

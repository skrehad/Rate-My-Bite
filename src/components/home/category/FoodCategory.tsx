import Image from "next/image";
import TextSizer from "@/components/shared/TextSizer";
import { getAllHomePageCategory } from "@/services/category";
import { ICategory } from "@/types/category.type";

const FoodCategory = async () => {
  const { data } = await getAllHomePageCategory();
  console.log({ data });
  return (
    <section className=" rounded-2xl   dark:bg-gray-800">
      <TextSizer
        title="Search By Cuisine"
        desc="Explore restaurants and cafes by your favorite cuisine"
      />

      <div className="grid  grid-cols-2 md:grid-cols-4 gap-6">
        {data?.slice(0, 8)?.map((category: ICategory) => (
          <div
            key={category?.id}
            className="bg-white shadow cursor-pointer rounded-lg overflow-hidden hover:scale-105 transition-transform duration-400"
          >
            <Image
              src={category?.image}
              alt={category?.name}
              width={400}
              height={300}
              className="w-full h-40 object-cover"
            />
            <div className="p-3 text-center">
              <h3 className="text-xl font-semibold text-[#FF3C48]">
                {category?.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FoodCategory;

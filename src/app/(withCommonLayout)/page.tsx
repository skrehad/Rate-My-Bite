import FoodCategory from "@/components/home/category/FoodCategory";
import Gallery from "@/components/home/Gallery/gallery";
import Banner from "@/components/home/header/Banner";

export default function Home() {
  return (
    <div>
      <Banner />
      <FoodCategory />

      <Gallery />
    </div>
  );
}

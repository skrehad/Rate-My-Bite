import FoodCategory from "@/components/home/category/FoodCategory";
import Gallery from "@/components/home/Gallery/gallery";
import Banner from "@/components/home/header/Banner";
import SubscriptionPlans from "@/components/home/subscription/SubscriptionPlans";
import Testimonial from "@/components/home/Testimonials/testimonial";
import { NewsletterSignup } from "@/components/newsLetter/newsLetter";

export default function Home() {
  return (
    <div className="mx-10">
      <Banner />
      <FoodCategory />
      <SubscriptionPlans />
      <Testimonial />
      <Gallery />
      <NewsletterSignup />
    </div>
  );
}

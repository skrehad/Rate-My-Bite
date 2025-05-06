import FoodCategory from "@/components/home/category/FoodCategory";
import Gallery from "@/components/home/Gallery/gallery";
import Banner from "@/components/home/header/Banner";
import SubscriptionPlans from "@/components/home/subscription/SubscriptionPlans";
import HowItWorks from "@/components/home/HowItWorks/HowItWorks";
import Testimonial from "@/components/home/Testimonials/testimonial";
import { NewsletterSignup } from "@/components/newsLetter/newsLetter";

export default function Home() {
  return (
    <div className="space-y-28">
      <Banner />
      <FoodCategory />
      <SubscriptionPlans />
      <Testimonial />
      <Gallery />
      <div className="container  space-y-24 mx-auto">
        <FoodCategory />

        <Testimonial />
        <HowItWorks></HowItWorks>
        <Gallery />
      </div>
      <NewsletterSignup />
    </div>
  );
}

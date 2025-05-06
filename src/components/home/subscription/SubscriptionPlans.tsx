"use client"

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import useAuthCheck from '@/hooks/useAuthCheck';

interface PlanFeature {
  feature: string;
  included: boolean;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  duration: number;
  features: PlanFeature[];
}

const plans: SubscriptionPlan[] = [
  {
    id: "FREE",
    name: "Free",
    price: 0,
    description: "Basic access to street food spots",
    duration: 0,
    features: [
      { feature: "Access to public food posts", included: true },
      { feature: "Comment on food posts", included: true },
      { feature: "Rate food spots (1-5 stars)", included: true },
      { feature: "Vote on food posts", included: true },
      { feature: "Access to premium content", included: false },
      { feature: "No ads experience", included: false },
    ],
  },
  {
    id: "MONTHLY",
    name: "Monthly Premium",
    price: 299,
    description: "Full access for 30 days",
    duration: 30,
    features: [
      { feature: "Access to public food posts", included: true },
      { feature: "Comment on food posts", included: true },
      { feature: "Rate food spots (1-5 stars)", included: true },
      { feature: "Vote on food posts", included: true },
      { feature: "Access to premium content", included: true },
      { feature: "No ads experience", included: true },
    ],
  },
  {
    id: "YEARLY",
    name: "Yearly Premium",
    price: 2499,
    description: "Full access for 1 year (save 30%)",
    duration: 365,
    features: [
      { feature: "Access to public food posts", included: true },
      { feature: "Comment on food posts", included: true },
      { feature: "Rate food spots (1-5 stars)", included: true },
      { feature: "Vote on food posts", included: true },
      { feature: "Access to premium content", included: true },
      { feature: "No ads experience", included: true },
    ],
  },
];

const SubscriptionPlans = () => {
  const { isLoggedIn } = useAuthCheck();
  console.log({isLoggedIn});
  const router = useRouter();

  const handleSubscribe = (planId: string) => {
    // Check if user is authenticated
    if (!isLoggedIn) {
      toast.error("Please log in to subscribe");
      router.push("/login?redirect=subscription");
      return;
    }

    if (planId === "FREE") {
      toast.info("You're already on the free plan!");
      return;
    }

    // Redirect to payment page with plan info
    router.push(`/checkout?plan=${planId}`);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <h2 className="text-4xl font-bold tracking-tight">Premium Subscription Plans</h2>
          <p className="mt-4 text-lg text-gray-600">
            Unlock exclusive street food discoveries with our premium plans. Access curated posts that only premium members can see.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`flex flex-col p-6 rounded-lg shadow-lg ${
                plan.id === "MONTHLY" ? "border-2 border-primary relative" : "border border-gray-200"
              } bg-white`}
            >
              {plan.id === "MONTHLY" && (
                <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-semibold py-1 px-3 rounded-full">
                  POPULAR
                </span>
              )}
              <div className="flex-1">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-bold">৳{plan.price}</span>
                  {plan.duration > 0 && (
                    <span className="text-gray-600 ml-1">
                      /{plan.duration === 30 ? "month" : "year"}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div
                        className={`${
                          feature.included ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        } rounded-full p-1 mr-2`}
                      >
                        {feature.included ? (
                          <Check size={16} />
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                          </svg>
                        )}
                      </div>
                      <span className={feature.included ? "text-gray-800" : "text-gray-500"}>
                        {feature.feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                onClick={() => handleSubscribe(plan.id)}
                variant={plan.id === "FREE" ? "outline" : "default"}
                className={`w-full cursor-pointer ${
                  plan.id === "MONTHLY" ? "bg-primary hover:bg-primary/90" : ""
                }`}
              >
                {plan.id === "FREE" ? "Current Plan" : "Subscribe"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlans; 
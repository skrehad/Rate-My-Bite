/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { initiatePayment } from "@/lib/shurjopay";
import { fetchWithAuth, isAuthenticated, getUserFromToken } from "@/lib/auth";

// ShurjoPay logo from public directory
const shurjopayLogoUrl = "/shurjopay-logo.png";

interface PlanDetails {
  name: string;
  price: number;
  description: string;
  duration: number;
}

const planDetails: Record<string, PlanDetails> = {
  MONTHLY: {
    name: "Monthly Premium",
    price: 299,
    description: "Access to all premium content for 30 days",
    duration: 30,
  },
  YEARLY: {
    name: "Yearly Premium",
    price: 2499,
    description: "Access to all premium content for 1 year (save 30%)",
    duration: 365,
  },
};

const CheckoutPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const plan = searchParams.get("plan");
  const [isLoading, setIsLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
  });

  useEffect(() => {
    // Get user info from token if available
    const fetchUserInfo = async () => {
      try {
        // Check auth using cookies instead of localStorage
        if (!isAuthenticated()) {
          router.push("/login?redirect=checkout");
          return;
        }

        // Try to get user info from the JWT token first
        const userData = getUserFromToken();
        if (userData && userData.email) {
          setCustomerInfo((prev) => ({
            ...prev,
            name: userData.fullName || "",
            email: userData.email || "",
          }));
          return;
        }

        // If we couldn't get enough info from the token, fetch from API
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API}/api/auth/me`);

        if (response.ok) {
          const data = await response.json();
          setCustomerInfo((prev) => ({
            ...prev,
            name: data.data.fullName || "",
            email: data.data.email || "",
          }));
        } else {
          // If API call fails, redirect to login
          toast.error("Authentication required");
          router.push("/login?redirect=checkout");
        }
      } catch (_error) {
        toast.error("Error loading user information");
        router.push("/login?redirect=checkout");
      }
    };

    fetchUserInfo();
  }, [router]);

  useEffect(() => {
    // Validate plan parameter
    if (plan && !planDetails[plan]) {
      toast.error("Invalid subscription plan");
      router.push("/");
    }
  }, [plan, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!plan || !planDetails[plan]) {
      toast.error("Invalid subscription plan");
      return;
    }

    // Double-check authentication before submitting
    if (!isAuthenticated()) {
      toast.error("Please log in to continue");
      router.push("/login?redirect=checkout");
      return;
    }

    try {
      setIsLoading(true);
      
      const paymentData = {
        plan,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        customerCity: customerInfo.city,
        customerAddress: customerInfo.address,
      };

      const result = await initiatePayment(paymentData);

      console.log({result})

      if (result.success && result.data?.checkout_url) {
        // Redirect to ShurjoPay payment page
        window.location.href = result.data.checkout_url;
      } else {
        toast.error("Failed to initiate payment");
      }
    } catch (_error) {
      toast.error("An error occurred while processing your payment");
    } finally {
      setIsLoading(false);
    }
  };

  if (!plan || !planDetails[plan]) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const selectedPlan = planDetails[plan];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Plan Details */}
          <div className="bg-gray-50 p-8">
            <h1 className="text-2xl font-bold mb-6">Subscription Details</h1>
            
            <div className="border border-gray-200 rounded-lg p-6 bg-white mb-6">
              <h2 className="text-xl font-semibold mb-2">{selectedPlan.name}</h2>
              <p className="text-gray-600 mb-4">{selectedPlan.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Duration:</span>
                <span>{selectedPlan.duration} days</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-500">Price:</span>
                <span className="text-2xl font-bold">৳{selectedPlan.price}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-center mt-8">
              <div className="mr-2 text-sm text-gray-500">Powered by</div>
              <div className="relative h-10 w-32">
                {/* Use a div with background image as fallback */}
                <div 
                  style={{
                    backgroundImage: `url(${shurjopayLogoUrl})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: '100%'
                  }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Payment Form */}
          <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Customer Information</h1>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={customerInfo.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full mt-6 bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Pay ৳${selectedPlan.price}`
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 
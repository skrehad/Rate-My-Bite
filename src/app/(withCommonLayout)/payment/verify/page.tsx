/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { fetchWithAuth, isAuthenticated } from "@/lib/auth";
import { verifyPayment } from "@/lib/shurjopay";

type PaymentStatus = "loading" | "success" | "failed";

const VerifyPaymentPage = () => {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<PaymentStatus>("loading");
  const [message, setMessage] = useState("Verifying your payment...");
  const order_id = searchParams.get("order_id");

  useEffect(() => {
    const checkPayment = async () => {
      try {
        if (!order_id) {
          setStatus("failed");
          setMessage("No order ID found. Payment verification failed.");
          return;
        }

        // Check if user is authenticated via cookies
        if (!isAuthenticated()) {
          setStatus("failed");
          setMessage("Authentication required. Please log in to verify your payment.");
          return;
        }

        // Verify payment with backend using our utility function
        const result = await verifyPayment(order_id);

        if (result.success) {
          setStatus("success");
          setMessage(result.message || "Payment successful! You now have premium access.");
          toast.success("Payment verified successfully!");
        } else {
          setStatus("failed");
          setMessage(result.message || "Payment verification failed. Please try again.");
          toast.error(result.message || "Payment verification failed");
        }
      } catch (_error) {
        setStatus("failed");
        setMessage("An error occurred while verifying your payment.");
        toast.error("Payment verification failed");
      }
    };

    checkPayment();
  }, [order_id]);

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
        {status === "loading" && (
          <div className="flex flex-col items-center">
            <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />
            <h1 className="text-2xl font-bold mb-2">Verifying Payment</h1>
            <p className="text-gray-600 mb-6">Please wait while we verify your payment...</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/posts">Explore Premium Content</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          </div>
        )}

        {status === "failed" && (
          <div className="flex flex-col items-center">
            <XCircle className="h-16 w-16 text-red-500 mb-4" />
            <h1 className="text-2xl font-bold mb-2">Payment Failed</h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/checkout">Try Again</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyPaymentPage; 
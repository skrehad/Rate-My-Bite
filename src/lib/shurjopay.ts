/**
 * Utility functions for ShurjoPay payment integration
 */
import { fetchWithAuth, getAccessToken } from '@/lib/auth';

interface InitiatePaymentPayload {
  plan: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCity: string;
  customerAddress: string;
}

interface PaymentResponse {
  success: boolean;
  message: string;
  data?: {
    checkout_url: string;
    transactionId: string;
  };
}

/**
 * Initiates a payment for subscription through ShurjoPay
 */
export async function initiatePayment(payload: InitiatePaymentPayload): Promise<PaymentResponse> {
  try {
    // Check if token exists
    const token = getAccessToken();
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API}/subscription/payment/initiate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
    });

    console.log({response})

    return await response.json();
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to initiate payment",
    };
  }
}

/**
 * Verifies a payment after ShurjoPay redirect
 */
export async function verifyPayment(orderId: string): Promise<PaymentResponse> {
  try {
    // Check if token exists
    const token = getAccessToken();
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API}/subscription/payment/verify?order_id=${orderId}`
    );

    return await response.json();
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to verify payment",
    };
  }
}

/**
 * Checks the user's subscription status
 */
export async function checkSubscriptionStatus(): Promise<{
  isSubscribed: boolean;
  premiumUntil?: Date;
  role?: string;
  hasCancelled?: boolean;
  message?: string;
}> {
  try {
    // Check if token exists
    const token = getAccessToken();
    if (!token) {
      return { isSubscribed: false };
    }

    const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API}/subscription/check`);
    const result = await response.json();

    if (result.success && result.data) {
      return {
        isSubscribed: result.data.isSubscribed,
        premiumUntil: result.data.premiumUntil ? new Date(result.data.premiumUntil) : undefined,
        role: result.data.role,
        hasCancelled: result.data.hasCancelled,
        message: result.message,
      };
    }

    return { isSubscribed: false, message: result.message };
  } catch (error) {
    return {
      isSubscribed: false,
      message: error instanceof Error ? error.message : "Failed to check subscription status",
    };
  }
}

/**
 * Cancels the user's subscription
 */
export async function cancelSubscription(): Promise<{ success: boolean; message: string }> {
  try {
    // Check if token exists
    const token = getAccessToken();
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API}/subscription/cancel`, {
      method: "POST"
    });

    return await response.json();
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to cancel subscription",
    };
  }
} 

"use server";
import { Ipost } from "@/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// get all products
// lib/api.ts
export const getAllposts = async (
  page?: string,
  limit?: string,
  query: { [key: string]: string | undefined } = {}
) => {
  const params = new URLSearchParams()

  if (query.searchTerm) params.append("searchTerm", query.searchTerm)
  if (query.category) params.append("category", query.category)
  if (query.location) params.append("location", query.location)
  if (query.minPrice) params.append("minPrice", query.minPrice)
  if (query.maxPrice) params.append("maxPrice", query.maxPrice)

  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/post?page=${page}&limit=${limit}&${params}`)
  const data = await res.json()
  return data
}



// get single product
export const getSinglePost = async (postId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/post/${postId}`,
      {
        next: {
          tags: ["POST"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// add product
export const createPost = async (postData:Ipost): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/post`, {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
       

      },
    });
    revalidateTag("POST");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// update product
export const updatePost = async (
  postData: Ipost,
  productId: string
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/product/${productId}`,
      {
        method: "PATCH",
        body: JSON.stringify(postData),
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("POST");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

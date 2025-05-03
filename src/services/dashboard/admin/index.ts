/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";

export const getAllUsers = async (query: { [key: string]: string }) => {
  try {
    let url = `${process.env.NEXT_PUBLIC_API}/user?`;
    if (Object.keys(query).length > 0) {
      url += new URLSearchParams(query).toString();
    }
    console.log({ url });
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")?.value as string,
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};

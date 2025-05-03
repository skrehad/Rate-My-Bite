export type PostStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface Ipost {
    title: string
    description: string
    location: string
    image: string
    priceRange: string
    isPremium: boolean
    status: string
    categoryId: string
    userId: string
  }
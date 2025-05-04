export type PostStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface Ipost {
    title: string
    description: string
    location: string
    image: string
    priceRange: string
    categoryId: string
    userId: string
    price:number
  }
  export interface Irating{
    value: number
    userId: string
    postId: string
  }

  export interface IpostVote {
    status: "UPVOTE" | "DOWNVOTE"
    userId: string
    postId: string
  }
  export interface IpostComment {
    text: string
    userId: string
    postId: string
  }
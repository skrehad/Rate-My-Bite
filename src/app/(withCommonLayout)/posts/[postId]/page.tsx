import { notFound } from "next/navigation"
import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
// import CommentSection from "./comment-section"
import RatingSection from "./rating-section"
import VoteSection from "./vote-section"
import PriceTag from "./price-tag"
import PostStatusBadge from "./post-status-badge"
import { PostStatus } from "@/types"

async function getPost(id: string) {
  const data = [
    {
      id: "1",
      title: "Modern Apartment in Downtown",
      description: "Beautiful apartment with amazing city views and modern amenities.",
      image: "/placeholder.svg?height=300&width=400",
      location: "New York, NY",
      price: 1200,
      priceRange: "High",
      isPremium: true,
      status: "APPROVED",
      category: { name: "Real Estate" },
      createdAt: new Date("2023-08-01"),
    },
    {
      id: "2",
      title: "Professional DSLR Camera",
      description: "Slightly used professional camera with multiple lenses included.",
      image: "/placeholder.svg?height=300&width=400",
      location: "Los Angeles, CA",
      price: 899,
      priceRange: "Medium",
      isPremium: false,
      status: "APPROVED",
      category: { name: "Electronics" },
      createdAt: new Date("2023-08-01"),
    },
    {
      id: "3",
      title: "Vintage Vinyl Collection",
      description: "Collection of 200+ vinyl records from the 60s and 70s in excellent condition.",
      image: "/placeholder.svg?height=300&width=400",
      location: "Chicago, IL",
      price: 450,
      priceRange: "Medium",
      isPremium: false,
      status: "PENDING",
      category: { name: "Collectibles" },
      createdAt: new Date("2023-08-01"),
    },
    {
      id: "4",
      title: "Mountain Bike - Premium Model",
      description: "High-end mountain bike, perfect for trails and rough terrain.",
      image: "/placeholder.svg?height=300&width=400",
      location: "Denver, CO",
      price: 1500,
      priceRange: "High",
      isPremium: true,
      status: "APPROVED",
      category: { name: "Sports" },
      createdAt: new Date("2023-08-01"),
    },
    {
      id: "5",
      title: "Handcrafted Wooden Furniture",
      description: "Beautiful handmade wooden dining table with four matching chairs.",
      image: "/placeholder.svg?height=300&width=400",
      location: "Portland, OR",
      price: 750,
      priceRange: "Medium",
      isPremium: false,
      status: "APPROVED",
      category: { name: "Furniture" },
      createdAt: new Date("2023-08-01"),
    },
    {
      id: "6",
      title: "Graphic Design Services",
      description: "Professional graphic design services for logos, branding, and marketing materials.",
      image: "/placeholder.svg?height=300&width=400",
      location: "Remote",
      price: 299,
      priceRange: "Low",
      isPremium: false,
      status: "APPROVED",
      category: { name: "Services" },
      createdAt: new Date("2023-08-01"),
    },
  ]
  return data.find((post) => post.id === id)
}


async function getPostData(id: string) {
  const post = await getPost(id)
  return post
}

export default async function PostPage({ params }: { params: { postId: string } }) {
  const post = await getPostData(params?.postId)

  if (!post) {
    notFound()
  }

  // Calculate average rating
  // const averageRating = post?.ratings.length
  //   ? post?.ratings.reduce((acc, rating) => acc + rating.value, 0) / post.ratings.length
  //   : 0

  // Calculate votes
  // const upvotes = post.votes.filter((vote) => vote.status === "UPVOTE").length
  // const downvotes = post.votes.filter((vote) => vote.status === "DOWNVOTE").length

  return (
    <div className="container  py-8">
      <Card className="overflow-hidden">
        <div className="relative h-[300px] sm:h-[400px]">
          <Image
            src={post.image || "/placeholder.svg?height=400&width=800"}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <PostStatusBadge status={post.status as PostStatus} />
            {post.isPremium && (
              <Badge variant="secondary" className="bg-amber-500 text-white hover:bg-amber-600">
                Premium
              </Badge>
            )}
          </div>
        </div>

        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{post.category.name}</Badge>
              <Badge variant="secondary">{post.priceRange}</Badge>
            </div>
            <h1 className="text-2xl font-bold">{post.title}</h1>
            <p className="text-muted-foreground">{post.location}</p>
          </div>
          <PriceTag price={post.price} isPremium={post.isPremium} />
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt={"alamin"} />
              <AvatarFallback>
                Alamin
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{'alsujon2001@gmail.com'}</p>
              <p className="text-sm text-muted-foreground">
                Posted {post.createdAt.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) || 0}
              </p>
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="whitespace-pre-line">{post.description}</p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <VoteSection postId={post.id} upvotes={10} downvotes={20} />
            <RatingSection postId={post.id} averageRating={5} totalRatings={3} />
          </div>
        </CardContent>

        <CardFooter className="block p-0">
          <Separator />
          {/* <CommentSection postId={post.id} comments={post.comments} /> */}
        </CardFooter>
      </Card>
    </div>
  )
}

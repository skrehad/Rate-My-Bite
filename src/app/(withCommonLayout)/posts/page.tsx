import Link from "next/link"
import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import PostStatusBadge from "./[postId]/post-status-badge"
import { PostStatus } from "@/types"
// import PostStatusBadge from "@/app/posts/[id]/post-status-badge"


async function getPosts() {
  // In a real app, this would fetch posts from the database
  // For now, we'll return mock data
  return [
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
    },
  ]
}

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <div className="container py-8">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Explore Posts</h1>
          <p className="text-muted-foreground">Discover amazing items and services from our community</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link href={`/posts/${post.id}`} key={post.id} className="group">
            <Card className="overflow-hidden h-full transition-all hover:shadow-md">
              <div className="relative aspect-video">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <PostStatusBadge status={post.status as PostStatus} />
                  {post.isPremium && (
                    <Badge variant="secondary" className="bg-amber-500 text-white hover:bg-amber-600">
                      Premium
                    </Badge>
                  )}
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{post.category.name}</Badge>
                  <span className="font-semibold text-muted-foreground text-sm">{post.location}</span>
                </div>
                <h2 className="text-xl font-semibold mb-2 line-clamp-1">{post.title}</h2>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{post.description}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <Badge variant="secondary">{post.priceRange}</Badge>
                {/* <span className={`font-bold text-lg ${post.isPremium ? "text-amber-500" : ""}`}>
                  {formatCurrency(post.price)}
                </span> */}
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

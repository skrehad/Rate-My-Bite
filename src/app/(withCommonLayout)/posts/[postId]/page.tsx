

import { notFound } from "next/navigation"
import Image from "next/image"
import { getSinglePost } from "@/services/posts"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import RatingSection from "./rating-section"
import VoteSection from "./vote-section"
import PriceTag from "./price-tag"

import { PostStatus } from "@/types"
import { PostStatusBadge } from "./post-status-badge"
import CommentSection from "./comment-section"

export default async function PostPage({ params }: { params: { postId: string } }) {
  const post = await getSinglePost(params?.postId)
console.log('the single post is',post);
  if (!post || post instanceof Error) {
    return notFound()
  }

  return (
    <div className="container py-8">
      <Card className="overflow-hidden">
        <div className="relative h-[300px] sm:h-[400px]">
          <Image
            src={post.data.image || "/placeholder.svg?height=400&width=800"}
            alt={post.data.title}
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
              <Badge variant="outline">{post.category?.name}</Badge>
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
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt={post.user?.name || "User"} />
              <AvatarFallback>
                {(post.user?.name || "U").slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{post.user?.email || "No Email"}</p>
              <p className="text-sm text-muted-foreground">
                Posted {new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="whitespace-pre-line">{post.description}</p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <VoteSection postId={post.id} upvotes={post.upvotes || 0} downvotes={post.downvotes || 0} />
            <RatingSection postId={post.id} averageRating={post.averageRating || 0} totalRatings={post.totalRatings || 0} />
          </div>
        </CardContent>

        <CardFooter className="block p-0">
          <Separator />
          <CommentSection postId={post.id} comments={post.comments || []} />
        </CardFooter>
      </Card>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
// import { formatDistanceToNow } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { SendHorizontal } from "lucide-react"

type Comment = {
  id: string
  text: string
  createdAt: Date
  user: {
    id: string
    fullName: string | null
    email: string
  }
}

export default function CommentSection({
  postId,
  comments,
}: {
  postId: string
  comments: Comment[]
}) {
  const [commentText, setCommentText] = useState("")
  console.log(postId)
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit the comment to the server
    alert(`Comment submitted: ${commentText}`)
    setCommentText("")
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Comments ({comments.length})</h2>

      <form onSubmit={handleSubmitComment} className="mb-6">
        <div className="flex gap-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your avatar" />
            <AvatarFallback>YA</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="mb-2 min-h-[80px]"
            />
            <Button type="submit" className="ml-auto" disabled={!commentText.trim()}>
              <SendHorizontal className="mr-2 h-4 w-4" />
              Post Comment
            </Button>
          </div>
        </div>
      </form>

      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Card key={comment.id} className="border-muted">
              <CardContent className="p-4">
                <div className="flex gap-3 mb-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt={comment.user.fullName || comment.user.email}
                    />
                    <AvatarFallback>
                      {comment.user.fullName?.substring(0, 2) || comment.user.email.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{comment.user.fullName || comment.user.email}</p>
                    {/* <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </p> */}
                  </div>
                </div>
                <p className="text-sm ml-11">{comment.text}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-muted-foreground py-4">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  )
}

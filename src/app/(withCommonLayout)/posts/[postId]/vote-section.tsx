"use client"

import { useState } from "react"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function VoteSection({
    postId,
    upvotes,
    downvotes,
}: {
    postId: string
    upvotes: number
    downvotes: number
}) {
    const [userVote, setUserVote] = useState<"UPVOTE" | "DOWNVOTE" | null>(null)

    const handleVote = (voteType: "UPVOTE" | "DOWNVOTE") => {
        // Toggle vote if clicking the same button
        if (userVote === voteType) {
            setUserVote(null)
            // In a real app, this would remove the vote on the server
            alert(`Vote removed`)
        } else {
            setUserVote(voteType)
            // In a real app, this would submit the vote to the server
            alert(`Vote submitted: ${voteType}`)
        }
    }

    return (
        <Card className="border-muted">
            <CardContent className="p-4">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                        <Button
                            variant="ghost"
                            size="sm"
                            className={`p-1 h-auto ${userVote === "UPVOTE" ? "text-green-500" : ""}`}
                            onClick={() => handleVote("UPVOTE")}
                        >
                            <ThumbsUp className={`w-5 h-5 ${userVote === "UPVOTE" ? "fill-green-500" : ""}`} />
                        </Button>
                        <span className="text-sm font-medium">
                            {upvotes + (userVote === "UPVOTE" ? 1 : 0) - (userVote === "UPVOTE" && upvotes > 0 ? 1 : 0)}
                        </span>
                    </div>

                    <div className="flex flex-col items-center">
                        <Button
                            variant="ghost"
                            size="sm"
                            className={`p-1 h-auto ${userVote === "DOWNVOTE" ? "text-red-500" : ""}`}
                            onClick={() => handleVote("DOWNVOTE")}
                        >
                            <ThumbsDown className={`w-5 h-5 ${userVote === "DOWNVOTE" ? "fill-red-500" : ""}`} />
                        </Button>
                        <span className="text-sm font-medium">
                            {downvotes + (userVote === "DOWNVOTE" ? 1 : 0) - (userVote === "DOWNVOTE" && downvotes > 0 ? 1 : 0)}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

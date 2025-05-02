"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function RatingSection({
    postId,
    averageRating,
    totalRatings,
}: {
    postId: string
    averageRating: number
    totalRatings: number
}) {
    const [userRating, setUserRating] = useState<number | null>(null)
    const [hoverRating, setHoverRating] = useState<number | null>(null)
    console.log(postId)
    const handleRating = (rating: number) => {
        setUserRating(rating)
        // In a real app, this would submit the rating to the server
        alert(`Rating submitted: ${rating}`)
    }

    return (
        <Card className="border-muted">
            <CardContent className="p-4">
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg font-bold">{averageRating.toFixed(1)}</span>
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`w-5 h-5 ${star <= Math.round(averageRating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground"
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-sm text-muted-foreground">({totalRatings})</span>
                    </div>

                    <div className="text-sm mb-2">Rate this post:</div>
                    <div className="flex">
                        <TooltipProvider>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Tooltip key={star}>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="p-1 h-auto"
                                            onClick={() => handleRating(star)}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(null)}
                                        >
                                            <Star
                                                className={`w-6 h-6 ${star <= (hoverRating || userRating || 0)
                                                    ? "fill-amber-400 text-amber-400"
                                                    : "text-muted-foreground"
                                                    }`}
                                            />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>
                                            {star} star{star !== 1 ? "s" : ""}
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            ))}
                        </TooltipProvider>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

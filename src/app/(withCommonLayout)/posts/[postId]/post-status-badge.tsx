import { Badge } from "@/components/ui/badge"
import { PostStatus } from "@/types"


export default function PostStatusBadge({ status }: { status: PostStatus }) {
    const statusConfig = {
        PENDING: {
            variant: "outline" as const,
            className: "border-yellow-500 text-yellow-500",
            label: "Pending",
        },
        APPROVED: {
            variant: "outline" as const,
            className: "border-green-500 text-green-500",
            label: "Approved",
        },
        REJECTED: {
            variant: "outline" as const,
            className: "border-red-500 text-red-500",
            label: "Rejected",
        },
    }

    const config = statusConfig[status]

    return (
        <Badge variant={config.variant} className={config.className}>
            {config.label}
        </Badge>
    )
}

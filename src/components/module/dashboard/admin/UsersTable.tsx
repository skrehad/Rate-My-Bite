"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, ChevronLeft, ChevronRight, MoreHorizontal, XCircle } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IUser } from "@/types"
// import { IUser } from "@/types"

// Sample users data
// const users = [
//     {
//         id: "4b9ba5cb-b6a3-48c1-b01f-2bccf9547ff6",
//         email: "d@gmail.com",
//         fullName: "Alamin Sujon",
//         role: "USER",
//         status: "ACTIVE",
//         isPremium: false,
//         createdAt: "2025-05-01T08:20:39.206Z",
//     },
//     {
//         id: "7c8de3fa-9b24-47e5-a6c2-1d45f8e79a12",
//         email: "john.doe@example.com",
//         fullName: "John Doe",
//         role: "ADMIN",
//         status: "ACTIVE",
//         isPremium: true,
//         createdAt: "2025-04-15T14:30:22.106Z",
//     },
//     {
//         id: "2a5b7c9d-e3f1-4a6b-8c0d-2e4f6g8h0i2j",
//         email: "sarah.smith@example.com",
//         fullName: "Sarah Smith",
//         role: "MODERATOR",
//         status: "ACTIVE",
//         isPremium: true,
//         createdAt: "2025-04-20T09:15:33.452Z",
//     },
//     {
//         id: "3k4l5m6n-7o8p-9q0r-1s2t-3u4v5w6x7y8z",
//         email: "michael.brown@example.com",
//         fullName: "Michael Brown",
//         role: "USER",
//         status: "SUSPENDED",
//         isPremium: false,
//         createdAt: "2025-03-10T11:45:18.789Z",
//     },
//     {
//         id: "9a8b7c6d-5e4f-3g2h-1i0j-9k8l7m6n5o4p",
//         email: "emily.johnson@example.com",
//         fullName: "Emily Johnson",
//         role: "USER",
//         status: "ACTIVE",
//         isPremium: false,
//         createdAt: "2025-04-25T16:20:05.321Z",
//     },
//     {
//         id: "1q2w3e4r-5t6y-7u8i-9o0p-1a2s3d4f5g6h",
//         email: "david.wilson@example.com",
//         fullName: "David Wilson",
//         role: "USER",
//         status: "INACTIVE",
//         isPremium: false,
//         createdAt: "2025-02-18T08:30:42.654Z",
//     },
//     {
//         id: "7j8k9l0m-1n2b-3v4c-5x6z-7a8s9d0f1g2h",
//         email: "jennifer.lee@example.com",
//         fullName: "Jennifer Lee",
//         role: "MODERATOR",
//         status: "ACTIVE",
//         isPremium: true,
//         createdAt: "2025-04-05T13:10:27.987Z",
//     },
//     {
//         id: "3e4r5t6y-7u8i-9o0p-1a2s-3d4f5g6h7j8k",
//         email: "robert.taylor@example.com",
//         fullName: "Robert Taylor",
//         role: "USER",
//         status: "DELETED",
//         isPremium: false,
//         createdAt: "2025-01-30T10:55:36.159Z",
//     },
//     {
//         id: "9l0m1n2b-3v4c-5x6z-7a8s-9d0f1g2h3j4k",
//         email: "lisa.anderson@example.com",
//         fullName: "Lisa Anderson",
//         role: "USER",
//         status: "ACTIVE",
//         isPremium: false,
//         createdAt: "2025-04-12T15:40:19.753Z",
//     },
//     {
//         id: "5l6m7n8o-9p0q-1r2s-3t4u-5v6w7x8y9z0a",
//         email: "james.martin@example.com",
//         fullName: "James Martin",
//         role: "ADMIN",
//         status: "ACTIVE",
//         isPremium: true,
//         createdAt: "2025-03-25T12:05:48.321Z",
//     },
// ]
interface UsersTableProps {
    data: IUser[]
    meta: {
        page: number
        limit: number
        total: number
        totalPage: number
    }
}
export function UsersTable({ data, meta }: UsersTableProps) {
    const [currentPage, setCurrentPage] = useState(1)
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    // Handle pagination
    const goToNextPage = () => {
        if (currentPage < meta?.totalPage) {
            setCurrentPage(currentPage + 1)
        }
    }

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    // Get status badge variant
    const getStatusVariant = (status: string) => {
        switch (status) {
            case "ACTIVE":
                return "bg-green-50 text-green-500"
            case "BLOCKED":
                return "bg-blue-100 text-blue-500"
            case "DELETED":
                return "bg-red-100 text-red-500"
            default:
                return ""
        }
    }

    // Get role badge variant
    const getRoleVariant = (role: string) => {
        switch (role) {
            case "ADMIN":
                return "default"
            case "PREMIUM":
                return "destructive"
            default:
                return "outline"
        }
    }

    return (
        <div className="space-y-4">
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[250px]">Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Premium</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.map((user) => (
                            <TableRow key={user?.id}>
                                <TableCell className="font-medium">{user?.fullName}</TableCell>
                                <TableCell>{user?.email}</TableCell>
                                <TableCell>
                                    <Badge className="rounded-full" variant={getRoleVariant(user?.role)}>{user?.role}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge className={`rounded-full ${getStatusVariant(user?.status)}`} >{user?.status}</Badge>
                                </TableCell>
                                {/* <TableCell>
                                    <Badge className="rounded-full" variant={getStatusVariant(user?.status)}>{user?.status}</Badge>
                                </TableCell> */}
                                <TableCell>
                                    {user?.isPremium ? (
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                    ) : (
                                        <XCircle className="h-5 w-5 text-gray-400" />
                                    )}
                                </TableCell>
                                <TableCell>{formatDate(user?.createdAt)}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem>View details</DropdownMenuItem>
                                            <DropdownMenuItem>Edit user</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-600">Delete user</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                    Showing {data?.length} of {meta?.total} users
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={goToPreviousPage} className=" cursor-pointer" disabled={currentPage === 1}>
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Previous page</span>
                    </Button>
                    <div className="text-sm font-medium">
                        Page {currentPage} of {meta?.totalPage}
                    </div>
                    <Button variant="outline" size="sm" onClick={goToNextPage} disabled={currentPage === meta?.totalPage}>
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">Next page</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

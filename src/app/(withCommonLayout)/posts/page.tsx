'use client'

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import PostStatusBadge from "./[postId]/post-status-badge"
import { PostStatus } from "@/types"

const POSTS_PER_PAGE = 6

// 🔹 Fake Posts Data (18 sample cards)
const fakePosts = Array.from({ length: 18 }, (_, i) => ({
  id: `${i + 1}`,
  title: `Product ${i + 1}`,
  description: `This is a description for product ${i + 1}. It includes features and highlights.`,
  image: "/placeholder.svg?height=300&width=400",
  location: ["New York", "Sydney", "London", "Tokyo", "Berlin"][i % 5],
  price: 100 + i * 15,
  priceRange: i % 3 === 0 ? "Low" : i % 3 === 1 ? "Medium" : "High",
  isPremium: i % 4 === 0,
  status: "APPROVED",
  category: { name: ["Electronics", "Furniture", "Real Estate", "Clothing"][i % 4] },
}))

export default function PostsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(fakePosts.length / POSTS_PER_PAGE)

  const currentPosts = fakePosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  return (
    <div className="container mx-auto p-4">
      {/* 🔹 Page Header */}
    {/* 🔹 Page Header + Search */}
<div className="flex flex-col gap-4 mb-8">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Explore Posts</h1>
      <p className="text-muted-foreground">Discover amazing items and services from our community.</p>
    </div>
    <div>
      <Link
        href="/createpost"
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#FF6168] rounded-md hover:bg-red-700"
      >
        Create New Post
      </Link>
    </div>
  </div>

  {/* 🔍 Search Bar */}
  <div className="w-72 flex items-center">
    <input
      type="text"
      placeholder="Search posts by title, category, or location..."
      className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
    />
    <button
     className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#FF6168] rounded-md hover:bg-red-700"
      
    >
      Search
    </button>
  </div>
</div>


      {/* 🔹 Main Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* 🔸 Sidebar Filter */}
        <aside className="w-full lg:w-1/4 border p-4 rounded-md shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>

          {/* Price */}
          <div className="mb-6">
            <label className="block font-medium mb-2">Filter By Price</label>
            <div className="flex gap-2 mb-2">
              <input type="number" placeholder="Min" className="w-1/2 border rounded p-1 text-sm" />
              <input type="number" placeholder="Max" className="w-1/2 border rounded p-1 text-sm" />
            </div>
            <input type="range" min="0" max="2000" className="w-full" />
          </div>

          {/* Product Types */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Product Types</h3>
            {[
              "Laptop & Accessories",
              "Computers-Pc",
              "Speakers & Headset",
              "Keyboards & Mouse",
              "Camera",
              "Video Recording",
              "Tablets",
              "Table Lights",
            ].map((type) => (
              <div key={type} className="flex items-center mb-1">
                <input type="checkbox" className="mr-2" />
                <label className="text-sm">{type}</label>
              </div>
            ))}
          </div>

          {/* Brands */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Brands</h3>
            {["HP", "Apple", "Dell", "Asus", "Canon"].map((brand) => (
              <div key={brand} className="flex items-center mb-1">
                <input type="checkbox" className="mr-2" />
                <label className="text-sm">{brand}</label>
              </div>
            ))}
          </div>

          {/* Rating */}
          <div>
            <h3 className="font-medium mb-2">Rating</h3>
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-yellow-500 text-sm">5.00 ⭐⭐⭐⭐⭐</span>
            </div>
          </div>
        </aside>

        {/* 🔸 Posts Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {currentPosts.map((post) => (
              <Link href={`/posts/${post.id}`} key={post.id} className="group">
                <Card className="overflow-hidden h-full transition-all hover:shadow-md">
                  <div className="relative aspect-video">
                    <Image
                      src={post.image}
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
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>

          {/* 🔹 Pagination */}
          <div className="flex justify-center items-center mt-6 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded border text-sm ${
                  currentPage === i + 1 ? "bg-blue-600 text-white" : "hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

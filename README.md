# Rate My Bite

https://project-9-client.vercel.app/

## 🍔 Overview

Rate My Bite is a Next.js web application where users can discover, post, and review street food spots. The platform features premium content for subscribed users, an admin dashboard for content moderation, and a comprehensive street food discovery experience.

## ✨ Features

- **User Authentication**
  - Register and login with email and password
  - JWT-based secure authentication
  - User profile management

- **Food Discovery**
  - Browse street food spots
  - Search by name, category, or location
  - Filter by price range, rating, and popularity
  - View detailed information about each food spot

- **Content Creation**
  - Post new street food discoveries
  - Upload images
  - Categorize and tag posts
  - Set price ranges and location information

- **Interaction**
  - Upvote/downvote food spots
  - Rate spots from 1-5 stars
  - Comment on posts

- **Premium Features**
  - Subscribe to access exclusive premium content
  - Integrated payment gateway (ShurjoPay/SSLCommerz)
  - Manage subscription

- **Admin Dashboard**
  - Review and approve posts
  - Mark content as premium
  - Moderate comments and reviews
  - Manage users and categories

- **Responsive Design**
  - Fully responsive UI for all devices
  - Mobile-first approach

## 🛠️ Tech Stack

- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **State Management**: React Context API / Redux
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **HTTP Client**: Axios
- **Authentication**: JWT
- **Payment**: ShurjoPay/SSLCommerz

## 📋 Prerequisites

- Node.js (v16+)
- npm or yarn
- Backend API running (see [Street Food Finder API](https://github.com/your-username/street-food-finder-api))

## 🚀 Getting Started

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/your-username/street-food-finder.git
   cd street-food-finder
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Set up environment variables:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   Then edit the `.env.local` file with your configuration.

4. Start the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

\`\`\`
# API Configuration
NEXT_PUBLIC_API=https://assignment9-flax.vercel.app/api


## 📱 Pages & Features

### Public Pages
- **Home**: Featured food spots and search
- **Posts**: Browse all food spots with filters
- **Blogs**: View all blogs
- **Login/Register**: User authentication
- **About**: Information about the platform
- **Contact**: Contact form

### Authenticated User Pages
- **Post Food Spot**: Form to submit new food spots
- **My Posts**: User's submitted food spots
- **Profile**: User profile management
- **Subscription**: Premium subscription management

### Premium User Pages
- **Premium Food Spots**: Exclusive premium content

### Admin Pages
- **Dashboard**: Overview of platform statistics
- **Users**: View and manage user
- **Posts**: Edit or delete existing posts
- **Category**: View and manage category

## 🚢 Deployment

### Build for Production

\\\bash
npm run build
# or
yarn build
\\\

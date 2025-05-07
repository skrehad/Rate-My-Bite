# Street Food Finder

![Street Food Finder](https://placeholder.svg?height=200&width=600)

## 🍔 Overview

Street Food Finder is a Next.js web application where users can discover, post, and review street food spots. The platform features premium content for subscribed users, an admin dashboard for content moderation, and a comprehensive street food discovery experience.

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
  - Share food spots

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
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Authentication
NEXT_PUBLIC_JWT_EXPIRES_IN=7d

# Payment Gateway (Choose one)
# ShurjoPay
NEXT_PUBLIC_PAYMENT_GATEWAY=shurjopay
NEXT_PUBLIC_SHURJOPAY_API_URL=https://sandbox.shurjopayment.com

# SSLCommerz
# NEXT_PUBLIC_PAYMENT_GATEWAY=sslcommerz
# NEXT_PUBLIC_SSLCOMMERZ_API_URL=https://sandbox.sslcommerz.com

# Google Maps (if using maps for location)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
\`\`\`

## 📁 Project Structure

\`\`\`
street-food-finder/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Authentication routes
│   ├── (dashboard)/        # Admin dashboard routes
│   ├── (main)/             # Main application routes
│   ├── api/                # API routes
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # Reusable components
│   ├── ui/                 # UI components
│   ├── forms/              # Form components
│   ├── layout/             # Layout components
│   └── features/           # Feature-specific components
├── lib/                    # Utility functions
│   ├── api.ts              # API client
│   ├── auth.ts             # Authentication utilities
│   └── utils.ts            # General utilities
├── hooks/                  # Custom React hooks
├── types/                  # TypeScript type definitions
├── public/                 # Static assets
├── styles/                 # Global styles
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
\`\`\`

## 📱 Pages & Features

### Public Pages
- **Home**: Featured food spots and search
- **Explore**: Browse all food spots with filters
- **Food Spot Details**: View details, ratings, and comments
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
- **Pending Posts**: Review and approve/reject posts
- **Manage Posts**: Edit or delete existing posts
- **Manage Users**: View and manage user accounts
- **Manage Comments**: Moderate user comments

## 🚢 Deployment

### Build for Production

\`\`\`bash
npm run build
# or
yarn build
\`\`\`

### Deployment Options

- **Vercel**:
  - Connect your GitHub repository
  - Set environment variables
  - Deploy

- **Netlify**:
  - Connect your GitHub repository
  - Set environment variables
  - Deploy

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

If you have any questions or feedback, please reach out to [your-email@example.com](mailto:your-email@example.com).

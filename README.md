# Organic Farm

Organic Farm is a comprehensive, full-stack e-commerce platform designed to connect organic farmers directly with consumers. It provides a marketplace for selling produce and renting equipment, empowering farmers and promoting organic agriculture. The platform includes a seller dashboard, a user-friendly product discovery experience, a shopping cart, and an AI-powered assistant for agricultural queries.

## Features

- **Marketplace:** Browse, filter, and purchase a wide range of organic products and machinery.
- **Seller Dashboard:** A dedicated dashboard for sellers to manage products, view business metrics, and track transactions.
- **Product Management:** Full CRUD (Create, Read, Update, Delete) functionality for product listings.
- **User Authentication:** Secure user registration and login with email/password and Google OAuth.
- **Shopping Cart:** A persistent shopping cart for buyers to add, update, and remove items.
- **AI Assistant:** An intelligent chat interface powered by Google Gemini to answer farming and agricultural questions.
- **Multi-Step Onboarding:** A guided onboarding process for new users to set up their buyer, seller, or supplier profiles.
- **Modern Tech Stack:** Built with Next.js, React, Tailwind CSS, and Shadcn UI for a responsive and performant user experience.
- **Type-Safe Backend:** Features a robust backend with Hono for API routes and Drizzle ORM for type-safe database interactions with PostgreSQL.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v20 or later)
- bun (or your preferred package manager)
- PostgreSQL database instance

### 1. Clone the Repository

```bash
git clone https://github.com/homocodian/organic-farm.git
cd organic-farm
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root of the project and add the following environment variables.

```env
# Get this from your PostgreSQL provider (e.g., Supabase, Neon or local instance)
DIRECT_DATABASE_URL="postgresql://..."
DATABASE_URL="postgresql://..."

# Get these from the Google Cloud Console for OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 4. Set Up the Database

Run the following command to push the database schema to your PostgreSQL instance.

```bash
bunx drizzle-kit push
```

### 5. Run the Development Server

You can now start the development server.

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (React)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Backend API:** [Hono](https://hono.dev/)
- **Database ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **Authentication:** [Better Auth](https://github.com/joulev/better-auth)
- **AI:** [Vercel AI SDK](https://sdk.vercel.ai/) with Google Gemini
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Form Handling:** [TanStack Form](https://tanstack.com/form)

## 📂 Project Structure

The repository is organized to separate concerns, making it easier to navigate and maintain.

```
└── src/
    ├── app/          # Next.js App Router: pages, layouts, and API routes
    ├── components/   # Reusable UI components (Shadcn, custom)
    ├── constants/    # Global constants (links, theme)
    ├── lib/          # Helper functions, utilities, and client-side logic
    └── server/       # Server-side logic
        ├── db/       # Drizzle ORM schema, migrations, and database instance
        ├── functions/ # Server Actions and backend functions
        └── route/     # Hono API route handlers
```

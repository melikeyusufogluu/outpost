# Outpost

Outpost is a full-stack web app for planning work in shared workspaces. Each workspace moves across a board (Planning, In progress, In review, Done), and teams can work in a Clerk organization or in a personal space.

## Full-stack development with Next.js

The frontend and the backend both live in one [Next.js](https://nextjs.org) App Router project:

- **Frontend:** React Server Components and client components in `app/` and `components/`, styled with Tailwind CSS and shadcn/ui.
- **Backend:** Server Actions in `actions/` handle data changes (such as creating a workspace) directly from the UI, with no separate API server.
- **Database:** PostgreSQL through Prisma ORM. The schema and migrations are in `prisma/`.
- **Auth and billing:** Clerk handles sign-in, organizations, and plans. `proxy.ts` protects private routes, and plan limits are checked on the server.

## Tech stack

| Layer | Tools |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 4, shadcn/ui, Radix UI, lucide-react |
| Data | Prisma 7, PostgreSQL |
| Auth and billing | Clerk |
| Utilities | date-fns, sonner |

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file with your database connection and Clerk keys:

   ```bash
   DATABASE_URL=
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   ```

3. Apply the database migrations and generate the Prisma client:

   ```bash
   npx prisma migrate dev
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `npm run dev` starts the development server.
- `npm run build` builds the app for production.
- `npm run start` runs the production build.
- `npm run lint` runs ESLint.

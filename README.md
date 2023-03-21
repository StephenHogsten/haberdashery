## Running

- start Next: `yarn dev`
- start Redis: `yarn redis`
  - **_note_**: I tried to run with concurrently but docker didn't like it
    - TODO: could run both with docker and startup with docker compose
  - **_note_**: the data isn't actually persisting at the moment after I stop it
    - TODO: could have a docker-compose volume

## Notable endpoints

- `/api/catchup`: based on the last timestamp stored (or 24 hours by default), update statuses
  - can pass values in with commenting
  - will update redis theoretically
- `/api/redis`: check what's currently stored
- `/api/test`: for messing aroudn with whatever
- `/api/query`: basically also for messing around with whatever at this point
- `/api/backfill`: used for populating all icons based on creation time. Probably wouldn't need it again

---

\*\*\*original Next
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

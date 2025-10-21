<div align="center">
  <h1 align="center">Papermark</h1>
  <h3>The open-source DocSend alternative.</h3>

<a target="_blank" href="https://www.producthunt.com/posts/papermark-3?utm_source=badge-top-post-badge&amp;utm_medium=badge&amp;utm_souce=badge-papermark"><img src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=411605&amp;theme=light&amp;period=daily" alt="Papermark - The open-source DocSend alternative | Product Hunt" style="width:250px;height:40px"></a>

</div>

<div align="center">
  <a href="https://www.papermark.com">papermark.com</a>
</div>

<br/>

<div align="center">
  <a href="https://github.com/mfts/papermark/stargazers"><img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/mfts/papermark"></a>
  <a href="https://twitter.com/papermarkio"><img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/papermarkio"></a>
  <a href="https://github.com/mfts/papermark/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/badge/license-AGPLv3-purple"></a>
</div>

<br/>

Papermark is the open-source document-sharing alternative to DocSend, featuring built-in analytics and custom domains.

## Features

- **Shareable Links:** Share your documents securely by sending a custom link.
- **Custom Branding:** Add a custom domain and your own branding.
- **Analytics:** Gain insights through document tracking and soon page-by-page analytics.
- **Self-hosted, Open-source:** Host it yourself and customize it as needed.

## Demo

![Papermark Welcome GIF](.github/images/papermark-welcome.gif)

## Tech Stack

- [Next.js](https://nextjs.org/) – Framework
- [TypeScript](https://www.typescriptlang.org/) – Language
- [Tailwind](https://tailwindcss.com/) – CSS
- [shadcn/ui](https://ui.shadcn.com) - UI Components
- [Prisma](https://prisma.io) - ORM [![Made with Prisma](https://made-with.prisma.io/dark.svg)](https://prisma.io)
- [PostgreSQL](https://www.postgresql.org/) - Database
- [NextAuth.js](https://next-auth.js.org/) – Authentication
- [Tinybird](https://tinybird.co) – Analytics
- [Resend](https://resend.com) – Email
- [Stripe](https://stripe.com) – Payments
- [Vercel](https://vercel.com/) – Hosting

## Getting Started

### Prerequisites

Here's what you need to run Papermark:

- Node.js (version >= 18.17.0)
- PostgreSQL Database
- Blob storage (currently [AWS S3](https://aws.amazon.com/s3/) or [Vercel Blob](https://vercel.com/storage/blob))
- [Resend](https://resend.com) (for sending emails)

### 1. Clone the repository

```shell
git clone https://github.com/mfts/papermark.git
cd papermark
```

### 2. Install npm dependencies

```shell
npm install
```

### 3. Copy the environment variables to `.env` and change the values

```shell
cp .env.example .env
```

### 4. Initialize the database

```shell
npm run dev:prisma
```

### 5. Run the dev server

```shell
npm run dev
```

### 6. Open the app in your browser

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Deploying to Vercel with Neon

Papermark runs well on [Vercel](https://vercel.com/) with [Neon](https://neon.tech/) as the managed PostgreSQL backend. The project already includes a `vercel.json` that sets the build command to `npm run vercel-build`, which applies Prisma migrations (`prisma migrate deploy`) before building the Next.js app.

### 1. Accounts and tooling

- Vercel account with access to import the Papermark repository
- Neon account (free tier works for testing)
- Optional services you plan to enable (Resend for email, Upstash for queues, Tinybird for analytics, etc.)

### 2. Provision Neon

1. Create a new Neon project (e.g., `papermark`) and keep the default `main` branch.
2. In the **Connection Details** panel:
   - Copy the **connection string with pooling** (under `psql (with pooling)` or similar) and use it for `POSTGRES_PRISMA_URL`.
   - Copy the **direct connection string without pooling** (`psql` / `psql (direct)`) and use it for `POSTGRES_PRISMA_URL_NON_POOLING`.
3. Create a separate database (e.g., `papermark_shadow`) on the same branch and copy its direct connection string. Use this for `POSTGRES_PRISMA_SHADOW_URL` so Prisma migrations have an isolated shadow database.
4. Ensure each connection string ends with `?sslmode=require` (Neon supplies this by default). If it is missing, append it manually.

### 3. Prepare environment variables

Populate these variables in Vercel before deploying (Settings → Environment Variables). Duplicate them in each environment (`Preview` / `Production`) as needed.

| Variable | Description |
| --- | --- |
| `NEXTAUTH_SECRET` | Generate with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Production URL, e.g., `https://<project>.vercel.app` |
| `NEXT_PUBLIC_BASE_URL` | Same as `NEXTAUTH_URL` unless using a dedicated marketing site |
| `NEXT_PUBLIC_MARKETING_URL` | Marketing site origin (can match app URL) |
| `NEXT_PUBLIC_APP_BASE_HOST` | Hostname without protocol (e.g., `<project>.vercel.app`) |
| `POSTGRES_PRISMA_URL` | Neon pooled connection string |
| `POSTGRES_PRISMA_URL_NON_POOLING` | Neon direct connection string |
| `POSTGRES_PRISMA_SHADOW_URL` | Neon shadow DB direct connection string |
| `BLOB_READ_WRITE_TOKEN` | Create in Vercel → Storage → Blob store; grants server write access |
| `NEXT_PUBLIC_UPLOAD_TRANSPORT` | Leave as `vercel` for Vercel Blob |
| `NEXT_PRIVATE_UPLOAD_DISTRIBUTION_HOST` | Blob public host, e.g., `<id>.public.blob.vercel-storage.com` |
| `RESEND_API_KEY` | Required for transactional email (optional in development) |
| `SLACK_APP_INSTALL_URL`, `SLACK_CLIENT_ID`, `SLACK_CLIENT_SECRET`, `SLACK_INTEGRATION_ID` | Optional – set only if you plan to use the Slack notification integration |
| `PROJECT_ID_VERCEL`, `TEAM_ID_VERCEL`, `AUTH_BEARER_TOKEN` | Needed only if you plan to automate custom domain provisioning via the API |

Configure optional providers (Tinybird, Google OAuth, Stripe, Upstash, Hanko, Trigger.dev, etc.) as your deployment requires.

### 4. Create the Vercel project

1. Import the repository into Vercel (GitHub/GitLab/Bitbucket).
2. Set **Framework Preset** to Next.js (Vercel detects this automatically).
3. Ensure the **Build Command** is `npm run vercel-build` (Vercel uses this automatically when present in `package.json`, but you can override it in the project settings).
4. Verify the **Node.js version** is `18.x` or newer (Vercel default for Next.js 14).
5. Save the environment variable configuration from step 3.

### 5. First deployment checklist

- Kick off a deployment. During the build Vercel will run `prisma migrate deploy` using the Neon credentials and then `next build`.
- After the deployment finishes, run `npm run dev:prisma` locally (against the same Neon database) if you add new migrations later.
- Visit the deployed URL to confirm authentication and document upload flows work.
- (Optional) Attach a custom domain in Vercel once DNS is ready.

## Tinybird Instructions

To prepare the Tinybird database, follow these steps:

0. We use `pipenv` to manage our Python dependencies. If you don't have it installed, you can install it using the following command:
   ```sh
   pkgx pipenv
   ```
1. Download the Tinybird CLI from [here](https://www.tinybird.co/docs/cli.html) and install it on your system.
2. After authenticating with the Tinybird CLI, navigate to the `lib/tinybird` directory:
   ```sh
   cd lib/tinybird
   ```
3. Push the necessary data sources using the following command:
   ```sh
   tb push datasources/*
   tb push endpoints/get_*
   ```
4. Don't forget to set the `TINYBIRD_TOKEN` with the appropriate rights in your `.env` file.

#### Updating Tinybird

```sh
pipenv shell
## start: pkgx-specific
cd ..
cd papermark
## end: pkgx-specific
pipenv update tinybird-cli
```

## Contributing

Papermark is an open-source project, and we welcome contributions from the community.

If you'd like to contribute, please fork the repository and make any changes you'd like. Pull requests are warmly welcome.

### Our Contributors ✨

<a href="https://github.com/mfts/papermark/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=mfts/papermark" />
</a>

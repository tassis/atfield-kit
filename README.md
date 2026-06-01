# atfield-kit

Clone. Configure. Deploy.

Turn your AT Protocol identity into HTTP endpoints in minutes.

Write with offprint, pckt.blog, or leaflet. Use atfield-kit to expose your AT Protocol records as clean JSON endpoints for your website, feed, static site generator, or custom integration.

`atfield-kit` is a small SvelteKit starter for exposing Bluesky profile data, `site.standard.document` posts, configurable views, and minimal feed-generator endpoints as clean HTTP APIs.

It is designed to stay simple:

* clone this repo
* edit `atfield.config.ts`
* deploy it

No AppView. No indexer. No heavy backend.

## Why atfield-kit?

AT Protocol records are portable, but most websites and frontend tools still expect simple HTTP endpoints.

atfield-kit bridges that gap:

```txt
AT Protocol identity
        ↓
atfield reads and normalizes records
        ↓
atfield-kit exposes HTTP endpoints
        ↓
Your website, SSG, frontend, feed, or custom integration
```

Use existing AT Protocol apps to publish content. Use atfield-kit to make that content easy to consume outside the AT Protocol ecosystem.

## What it gives you

From AT Protocol:

* DID-first identity resolution
* Bluesky profile reads
* `site.standard.document` post reads from offprint, pckt.blog, and leaflet

As HTTP endpoints:

* profile JSON
* posts JSON
* single-post JSON
* configurable views
* structured `content`
* optional `renderedMarkdown`
* minimal feed-generator XRPC endpoints

## Use cases

* Use AT Protocol as a lightweight CMS-like source for a personal site
* Expose Bluesky profile data as JSON
* Write with offprint, pckt.blog, or leaflet, then publish to your own frontend through `site.standard.document`
* Build static snapshots from AT Protocol records
* Provide simple endpoints for Astro, SvelteKit, Next.js, or other clients
* Experiment with feed-generator endpoints without building a full AppView

## What it is not

atfield-kit is intentionally small.

It is not:

* a canonical publishing frontend
* a CMS editor
* an AppView
* an indexer
* an RSS or sitemap generator
* a replacement for existing AT Protocol apps

Those concerns should stay in your publishing app, website, or frontend.

atfield-kit focuses on one job:

> Turn selected AT Protocol records into clean, deployable HTTP endpoints.

## Quick start

### 1. Clone

```sh
git clone <your-fork-or-template>
cd atfield-kit
bun install
```

### 2. Configure

Edit `atfield.config.ts`.

At minimum, set:

* `site.name`
* `site.publicUrl`
* `identity.handle` or `identity.did`

Example:

```ts
import { defineConfig } from '#atfield';

export default defineConfig({
	site: {
		name: 'My Site',
		description: 'AT Protocol endpoint kit',
		publicUrl: 'https://example.com'
	},
	identity: {
		handle: 'your.handle.bsky.social'
		// or did: 'did:plc:xxxx'
	},
	posts: {
		limit: 10
	},
	views: [
		{
			id: 'recent',
			title: 'Recent articles',
			source: 'posts',
			limit: 5
		}
	]
});
```

### 3. Run locally

```sh
bun run dev
```

### 4. Build

```sh
bun run build
node build
```

## Endpoints

### Basic endpoints

* `GET /health.json`
* `GET /profile.json`
* `GET /posts.json`
* `GET /posts/[post].json`
* `GET /posts/[post].json?type=text`
* `GET /views.json`
* `GET /views/[view].json`

### Feed generator endpoints

* `GET /xrpc/app.bsky.feed.describeFeedGenerator`
* `GET /xrpc/app.bsky.feed.getFeedSkeleton?feed=...`

## Content model

atfield-kit exposes normalized content for easier frontend integration.

Posts can include:

* source URI
* CID
* title
* path or slug
* structured content
* rendered Markdown
* original record metadata

The goal is to preserve useful AT Protocol record data while still giving websites and frontend tools something easy to consume.

## Deployment

The default setup uses the Node adapter.

atfield-kit is intentionally small so it can be adapted to different deployment styles:

* Node server
* Cloudflare Pages / Workers
* static snapshot output

The recommended starting point is the default Node setup. Cloudflare and static snapshot modes can be added when your project needs them.

## Verify

```sh
bun run check
bun run lint
bun run build
```

## Project goal

atfield-kit exists to make AT Protocol records easier to reuse on the open web.

It does not try to own your publishing workflow. Instead, it gives your AT Protocol identity a simple endpoint layer that your website, frontend, static generator, feed, or integration can consume.

Write with existing AT Protocol apps. Expose with atfield-kit. Build your own web surface on top.


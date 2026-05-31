# atfield-kit

`atfield-kit` is a SvelteKit starter for exposing read-only AT Protocol endpoints for one identity.

Current scope:

- DID-first identity resolution
- Bluesky profile reads
- `site.standard.document` reads
- JSON endpoints for profile, posts, and views
- minimal feed-generator XRPC endpoints

Default runtime strategy:

- default adapter: Node
- optional deployment targets: Cloudflare or static-mode snapshots

> `atfield-kit` does not try to be a canonical publishing frontend, CMS, editor, RSS generator, or sitemap generator. Those concerns belong to the user's own site or publishing frontend.

## Quick Setup

1. Install dependencies.

```sh
bun install
```

2. Edit `atfield.config.ts`.

Before deploy, you should at least change:

- `site.name`
- `site.publicUrl`
- `identity.handle` or `identity.did`

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

3. Start local dev.

```sh
bun run dev
```

4. Verify the service with:

- `/health.json`
- `/profile.json`
- `/posts.json`

## Endpoints

- `GET /health.json`
- `GET /profile.json`
- `GET /posts.json`
- `GET /posts/[post].json`
- `GET /views.json`
- `GET /views/[view].json`
- `GET /xrpc/app.bsky.feed.describeFeedGenerator`
- `GET /xrpc/app.bsky.feed.getFeedSkeleton?feed=...`

## Deployment Options

### Node Default

This repo defaults to `@sveltejs/adapter-node`.

Build and run:

```sh
bun run build
node build
```

### Cloudflare Option

If you want Cloudflare Workers / Pages instead, change these pieces:

1. Install Cloudflare adapter deps:

```sh
bun add -d @sveltejs/adapter-cloudflare @cloudflare/workers-types
```

2. Update `svelte.config.js`:

```js
import adapter from '@sveltejs/adapter-cloudflare';
```

3. Use the Cloudflare adapter in `kit.adapter`.

4. Update `wrangler.jsonc` for your deployment name and environment.
   At minimum, change:
   - `name`

### Static Option

If you want static output instead, change these pieces:

1. Install the static adapter:

```sh
bun add -d @sveltejs/adapter-static
```

2. Update `svelte.config.js`:

```js
import adapter from '@sveltejs/adapter-static';
```

3. Use the static adapter in `kit.adapter`.

4. Treat `atfield-kit` as a snapshot build target.

Static-mode tradeoffs:

- good for build-time JSON snapshots
- not a live endpoint runtime after build

## Verify

```sh
bun run check
bun run lint
bun run build
```

import { defineConfig } from '#atfield';

const config = defineConfig({
	site: {
		name: 'ATField',
		description: 'ATProto-first personal endpoint kit',
		publicUrl: 'http://localhost:5173'
	},
	services: {
		handleResolverUrl: 'https://bsky.social/xrpc',
		appViewUrl: 'https://public.api.bsky.app/xrpc'
	},
	identity: {
		handle: 'tassis.bsky.social'
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

export default config;

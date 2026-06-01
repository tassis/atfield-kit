import type { ContentResult as StandardSiteContentResult } from 'atfield-core/providers/standardsite';

export const DEFAULT_HANDLE_RESOLVER_URL = 'https://bsky.social/xrpc';
export const DEFAULT_APPVIEW_URL = 'https://public.api.bsky.app/xrpc';
export const DEFAULT_POST_LIMIT = 10;
export const MAX_POST_LIMIT = 100;

export type AtfieldSiteConfig = {
	name: string;
	description?: string;
	publicUrl?: string;
};

export type AtfieldServicesConfig = {
	handleResolverUrl?: string;
	appViewUrl?: string;
};

export type AtfieldIdentityConfig = {
	handle?: string;
	did?: string;
};

export type AtfieldPostsConfig = {
	limit?: number;
};

export type AtfieldConfig = {
	site: AtfieldSiteConfig;
	services?: AtfieldServicesConfig;
	identity: AtfieldIdentityConfig;
	posts?: AtfieldPostsConfig;
	views?: AtfieldViewConfig[];
};

export type AtfieldViewConfig = {
	id: string;
	title: string;
	source: 'posts';
	limit?: number;
};

export function defineConfig(config: AtfieldConfig) {
	return config;
}

export type ResolvedIdentity = {
	handle?: string;
	did: string;
	pdsUrl: string;
};

export type AtfieldProfile = {
	did: string;
	handle: string;
	displayName?: string;
	description?: string;
	avatar?: string;
	followersCount?: number;
	followsCount?: number;
	postsCount?: number;
};

export type AtfieldPost = {
	uri: string;
	rkey: string;
	cid: string;
	title: string;
	site: string;
	publishedAt: string;
	path?: string;
	description?: string;
	tags?: string[];
	textContent?: string;
	renderedMarkdown?: string;
	content?: StandardSiteContentResult;
	updatedAt?: string;
	coverImage?: string;
	bskyPostUri?: string;
	contributors?: Array<{
		did: string;
		displayName?: string;
		role?: string;
	}>;
	author: {
		did: string;
		handle?: string;
	};
};

export type AtfieldPostsPayload = {
	posts: AtfieldPost[];
	count: number;
};

export type AtfieldView = {
	id: string;
	title: string;
	source: 'posts';
	limit: number;
};

export type AtfieldViewsPayload = {
	views: AtfieldView[];
};

export type AtfieldViewPayload = {
	view: AtfieldView;
	items: AtfieldPost[];
	count: number;
};

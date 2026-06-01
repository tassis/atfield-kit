import { getConfig } from '$lib/server/config.server';
import { getCore, resolveConfiguredIdentity } from '$lib/server/core.server';
import type {
	AtfieldPost,
	AtfieldPostsPayload,
	AtfieldViewPayload,
	AtfieldViewsPayload
} from '$lib/atfield';
import type { StandardSiteDocumentOutput } from 'atfield-core/providers/standardsite';

export async function getAtfieldProfile() {
	const core = getCore();
	const identity = await resolveConfiguredIdentity();
	const profile = await core.providers.bsky.getProfile(identity);

	return profile;
}

export async function getAtfieldPosts(): Promise<AtfieldPostsPayload> {
	const config = getConfig();
	const core = getCore();
	const identity = await resolveConfiguredIdentity();
	const { documents: posts } = await core.providers.standardsite.document.list(identity, {
		limit: config.posts?.limit ?? 10
	});

	return {
		posts: posts.map((post) => mapPost(core, post)),
		count: posts.length
	};
}

export async function getAtfieldPost(rkey: string): Promise<AtfieldPost | null> {
	const core = getCore();
	const identity = await resolveConfiguredIdentity();
	const post = await core.providers.standardsite.document.get(identity, { rkey });

	return post ? mapPost(core, post) : null;
}

export function getAtfieldViews(): AtfieldViewsPayload {
	const config = getConfig();

	return {
		views: (config.views ?? []).map((view) => ({
			id: view.id,
			title: view.title,
			source: view.source,
			limit: view.limit ?? config.posts?.limit ?? 10
		}))
	};
}

export async function getAtfieldView(viewId: string): Promise<AtfieldViewPayload | null> {
	const config = getConfig();
	const view = (config.views ?? []).find((entry) => entry.id === viewId);

	if (!view) {
		return null;
	}

	const core = getCore();
	const identity = await resolveConfiguredIdentity();

	if (view.source === 'posts') {
		const { documents: items } = await core.providers.standardsite.document.list(identity, {
			limit: view.limit ?? config.posts?.limit ?? 10
		});

		return {
			view: {
				id: view.id,
				title: view.title,
				source: view.source,
				limit: view.limit ?? config.posts?.limit ?? 10
			},
			items: items.map((item) => mapPost(core, item)),
			count: items.length
		};
	}

	return null;
}

function mapPost(core: ReturnType<typeof getCore>, post: StandardSiteDocumentOutput): AtfieldPost {
	return {
		...post,
		renderedMarkdown: post.content
			? core.providers.standardsite.content.renderMarkdown(post.content, {
					inlineStyle: 'html'
				})
			: post.textContent
	};
}

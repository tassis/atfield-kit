import { getConfig } from '$lib/server/config.server';
import { getCore, resolveConfiguredIdentity } from '$lib/server/core.server';

export async function getAtfieldProfile() {
	const core = getCore();
	const identity = await resolveConfiguredIdentity();
	const profile = await core.providers.bsky.getProfile(identity);

	return profile;
}

export async function getAtfieldPosts() {
	const config = getConfig();
	const core = getCore();
	const identity = await resolveConfiguredIdentity();
	const { documents: posts } = await core.providers.standardsite.listDocuments(identity, {
		limit: config.posts?.limit ?? 10
	});

	return {
		posts,
		count: posts.length
	};
}

export async function getAtfieldPost(rkey: string) {
	const core = getCore();
	const identity = await resolveConfiguredIdentity();
	const post = await core.providers.standardsite.getDocument(identity, { rkey });

	return post;
}

export function getAtfieldViews() {
	const config = getConfig();

	return {
		views: (config.views ?? []).map((view) => ({
			id: view.id,
			title: view.title,
			source: view.source,
			limit: view.limit
		}))
	};
}

export async function getAtfieldView(viewId: string) {
	const config = getConfig();
	const view = (config.views ?? []).find((entry) => entry.id === viewId);

	if (!view) {
		return null;
	}

	const core = getCore();
	const identity = await resolveConfiguredIdentity();

	if (view.source === 'posts') {
		const { documents: items } = await core.providers.standardsite.listDocuments(identity, {
			limit: view.limit ?? config.posts?.limit ?? 10
		});

		return {
			view: {
				id: view.id,
				title: view.title,
				source: view.source,
				limit: view.limit ?? config.posts?.limit ?? 10
			},
			items,
			count: items.length
		};
	}

	return null;
}

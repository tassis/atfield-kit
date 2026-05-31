type ProfilePreview = {
	handle?: string;
	displayName?: string;
	avatar?: string;
};

export async function load({ fetch }: { fetch: typeof globalThis.fetch }) {
	const response = await fetch('/profile.json');

	if (!response.ok) {
		return {
			profile: null
		};
	}

	const payload = (await response.json()) as {
		profile?: ProfilePreview;
	};

	return {
		profile: payload.profile
			? {
					handle: payload.profile.handle,
					displayName: payload.profile.displayName,
					avatar: payload.profile.avatar
				}
			: null
	};
}

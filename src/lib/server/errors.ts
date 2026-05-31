import { json } from '@sveltejs/kit';

export const ERROR_CODE = {
	CONFIG_ERROR: 'config_error',
	UPSTREAM_ERROR: 'upstream_error',
	INVALID_POST: 'invalid_post',
	POST_NOT_FOUND: 'post_not_found',
	INVALID_VIEW: 'invalid_view',
	VIEW_NOT_FOUND: 'view_not_found'
} as const;

export type ErrorCode = (typeof ERROR_CODE)[keyof typeof ERROR_CODE];

export function jsonError(status: number, code: ErrorCode, message: string, details?: unknown) {
	return json(
		{
			error: {
				code,
				message,
				...(details === undefined ? {} : { details })
			}
		},
		{ status }
	);
}

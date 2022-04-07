import type { LoadInput, LoadOutput } from '@sveltejs/kit/types/private';
import type { ClientMiddlewareCallback } from '../types';

const sendClient200StatusCodeCallback = async <D>(
	event: LoadInput & { middleware: D }
): Promise<LoadOutput<{}> & { status: 200 }> => {
	return {
		status: 200,
		props: {}
	};
};

export default sendClient200StatusCodeCallback;

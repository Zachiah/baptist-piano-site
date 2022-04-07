import type { ApiMiddleware, ClientMiddleware, MergeMiddlewareData } from '$lib/middleware/types';
import compose from 'lodash/fp/compose';

export const composeApiMiddleware =
	<T extends any[]>(
		...mw: Array<any> & { [p in keyof T]: ApiMiddleware<T[p]> }
	): ApiMiddleware<MergeMiddlewareData<T>> =>
	(cb) =>
		compose(...mw)(cb);

export const composeClientMiddleware =
	<T extends any[]>(
		...mw: Array<any> & { [p in keyof T]: ClientMiddleware<T[p]> }
	): ClientMiddleware<MergeMiddlewareData<T>> =>
	(cb) =>
		compose(...mw)(cb);

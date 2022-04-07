import type { Middleware, MiddlewareCallback } from './Middleware';
import compose from 'lodash/fp/compose';

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
	? I
	: never;

type MergeMiddleware<T extends any[]> = UnionToIntersection<T[number]>;

const composeMiddleware =
	<T extends any[]>(
		...mw: Array<any> & { [p in keyof T]: Middleware<T[p]> }
	): Middleware<MergeMiddleware<T>> =>
	(cb) =>
		compose(...mw)(cb);

export default composeMiddleware;

import type { RequestHandlerOutput } from '@sveltejs/kit';
import type { LoadInput, LoadOutput, RequestEvent } from '@sveltejs/kit/types/private';

export type ApiMiddlewareCallback<D extends {}> = (
	event: RequestEvent & { middleware: D }
) => Promise<RequestHandlerOutput>;

export type ApiMiddleware<D extends {}> = <O extends {}>(
	cb: ApiMiddlewareCallback<D & O>
) => ApiMiddlewareCallback<O>;

export type ClientMiddlewareCallback<D extends {}> = (
	event: LoadInput & { middleware: D }
) => Promise<LoadOutput>;

export type ClientMiddleware<D extends {}> = <O extends {}>(
	cb: ClientMiddlewareCallback<D & O>
) => ClientMiddlewareCallback<O>;

export type ConfigurableApiMiddleware<TConfig extends {}, TContext extends {}> = (
	p: TConfig
) => ApiMiddleware<TContext>;

export type ConfigurableClientMiddleware<TConfig extends {}, TContext extends {}> = (
	p: TConfig
) => ClientMiddleware<TContext>;

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
	k: infer I
) => void
	? I
	: never;

export type MergeMiddlewareData<T extends any[]> = UnionToIntersection<T[number]>;
import type { Middleware } from './Middleware';

export type ConfigurableMiddleware<TConfig extends {}, TContext extends {}> = (
	p: TConfig
) => Middleware<TContext>;

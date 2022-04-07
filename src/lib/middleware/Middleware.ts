import type { User } from '@prisma/client';
import type { RequestHandlerOutput } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit/types/private';
import Joi from 'joi';
import composeMiddleware from './composeMiddleware';
import withSchema from './withSchema';
import withUser from './withUser';

// export type Middleware<MT extends {}> = <T extends {} = {}>(
// 	cb: (
// 		p: RequestEvent<Record<string, string>> & {
// 			middleware: T & MT;
// 		}
// 	) => Promise<RequestHandlerOutput>
// ) => (
// 	event: RequestEvent<Record<string, string>> & {
// 		middleware: T;
// 	}
// ) => Promise<RequestHandlerOutput>;

// export type MiddlewareCallback<NewProperties, OldProperties> = (
// 	event: RequestEvent<Record<string, string>>,
//     middlewareData: NewProperties & OldProperties
// ) => Promise<RequestHandlerOutput>

// export type Middleware<NewProperties extends {}> = <OldProperties extends {}>(
// 	cb: MiddlewareCallback<NewProperties, OldProperties>
// ) => (event: RequestEvent<Record<string, string>>) => Promise<RequestHandlerOutput>;

export type MiddlewareCallback<D extends {}> = (
	event: RequestEvent & { middleware: D }
) => Promise<RequestHandlerOutput>;

export type Middleware<D extends {}> = <O extends {}>(
	cb: MiddlewareCallback<D & O>
) => MiddlewareCallback<O>;


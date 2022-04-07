import type { LoadInput, LoadOutput } from "@sveltejs/kit/types/private";
import type { ClientMiddlewareCallback } from "../types";

const sendClientMiddlewareAsPropsCallback = async <D,>(
	event: LoadInput & { middleware: D }
): Promise<LoadOutput<D> & {status: 200}> => {
    return {
        status: 200,
        props: {
            ...event.middleware
        }
    }
}

export default sendClientMiddlewareAsPropsCallback;
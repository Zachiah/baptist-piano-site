import cuid from 'cuid';

export type Flash = {
	type: 'success' | 'error' | 'info';
	message: string;
	preserve?: boolean;
	createdAt?: number;
	id: string;
};

export const createFlash = (p: {
	type: Flash['type'];
	message: Flash['message'];
	preserve?: boolean;
}): Flash => ({
	type: p.type,
	message: p.message,
	preserve: p.preserve ?? false,
	createdAt: new Date().valueOf(),
	id: cuid()
});

export const showFlash = (flash: Flash): boolean => {
	const now = new Date().valueOf();
	const diff = now - flash.createdAt;

	return diff < 5000 || flash.preserve;
};

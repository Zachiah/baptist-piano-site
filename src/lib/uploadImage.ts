import 'dotenv/config';
import cuid from 'cuid';
import { BlobServiceClient } from '@azure/storage-blob';
import { AZURE_STORAGE_CONNECTION_STRING, CONTAINER_NAME } from './sensitiveConfig';
import { MAX_UPLOAD_SIZE, MAX_UPLOAD_SIZE_HUMAN_NAME } from './config';

const uploadImage = async (image: any) => {
	if (image.size > MAX_UPLOAD_SIZE) {
		return {
			value: null,
			error: `Image size is too large. Max size is ${MAX_UPLOAD_SIZE_HUMAN_NAME}.`
		};
	}

	const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
	const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);
	const blockBlobClient = containerClient.getBlockBlobClient(`image-${cuid()}`);
	const arrayBuffer: ArrayBuffer = await image.arrayBuffer();
	const uploadBlobResponse = await blockBlobClient.upload(arrayBuffer, arrayBuffer.byteLength);
	console.log(blockBlobClient.url);

	return {
		value: blockBlobClient.url,
		error: null
	};
};

export default uploadImage;

import 'dotenv/config';
import cuid from 'cuid';
import { BlobServiceClient } from '@azure/storage-blob';
import { AZURE_STORAGE_CONNECTION_STRING, CONTAINER_NAME } from './sensitiveConfig';

const uploadImage = async (image: any) => {
	const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
	const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);
	const blockBlobClient = containerClient.getBlockBlobClient(`image-${cuid()}`);
	const arrayBuffer: ArrayBuffer = await image.arrayBuffer();
	const uploadBlobResponse = await blockBlobClient.upload(arrayBuffer, arrayBuffer.byteLength);
	console.log(blockBlobClient.url);

	return blockBlobClient.url;
};

export default uploadImage;

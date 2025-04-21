import { Readable } from 'stream';
import { pinata } from './pinata.ts';

export default async function uploadImage(image: Express.Multer.File) {
  try {
    // convert multer file buffer to a readable stream
    const readableStream = Readable.from(image.buffer);

    // add original filename to the stream
    (readableStream as any).path = image.originalname;

    // upload to pinata using stream
    const result = await pinata.pinFileToIPFS(readableStream, {
      pinataMetadata: {
        name: image.originalname,
      },
      pinataOptions: {
        cidVersion: 1,
      },
    });

    // the url of the uploaded image
    const fileUrl = `https://${process.env.PUBLIC_GATEWAY_URL || 'gateway.pinata.cloud'}/ipfs/${result.IpfsHash}`;

    return fileUrl;
  } catch (error) {
    console.error('Error uploading to Pinata:', error);
    throw new Error('Failed to upload image to Pinata');
  }
}

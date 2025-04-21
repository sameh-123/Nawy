//pinata configuration for uploading images
import PinataSDK  from '@pinata/sdk';

export const  pinata = new PinataSDK(
  process.env.PINATA_API_KEY,
  process.env.PINATA_SECRET_API_KEY
);


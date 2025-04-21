// this is a global function to handle all the rwsponses

import { Response } from 'express';

export default function httpResponse(
  status: number,
  message: string,
  data: any,
  res: Response
) {
  return res.status(status).json({
    message,
    data,
  });
}

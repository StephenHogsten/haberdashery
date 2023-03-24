import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const ENV_TYPE = process.env.VERCEL_ENV || process.env.NODE_ENV;

export function DevOnly(handler: NextApiHandler): NextApiHandler {
  if (ENV_TYPE !== "development") {
    return (_, res: NextApiResponse) => {
      res.status(404).end();
    };
  }
  return handler;
}

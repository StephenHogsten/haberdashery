// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { DevOnly } from "backend/routeHelpers";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default DevOnly(function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe" });
});

import { backfill } from "backend/services/statusBackfill";
import { NextApiRequest, NextApiResponse } from "next";

async function Backfill(req: NextApiRequest, res: NextApiResponse) {
  const resp = await backfill();
  res.status(200).json(resp);
}

export default Backfill;

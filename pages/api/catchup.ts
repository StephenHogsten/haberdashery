import { catchUpIcons } from "backend/services/catchUpIcons";
import { NextApiRequest, NextApiResponse } from "next";

async function CatchUp(req: NextApiRequest, res: NextApiResponse) {
  // const afterYesterday = "2023-03-20T22:00:00.000Z";  // 3/20 at 3p
  // const beforeNow = "2023-03-21T18:00:04.841Z"; // 3/21 at 11a

  const resp = await catchUpIcons({
    //  firstTimestamp: new Date(2023, 2, 21, 12, 30).toISOString(),
    // lastTimestamp: beforeNow,
  });
  res.status(200).json(resp);
}

export default CatchUp;

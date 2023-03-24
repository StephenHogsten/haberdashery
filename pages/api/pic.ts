import { NextApiRequest, NextApiResponse } from "next";
import { createReadStream } from "fs";
import { catchUpIcons } from "backend/services/catchUpIcons";

async function Pic(req: NextApiRequest, res: NextApiResponse) {
  const resp = await catchUpIcons();
  console.log("resp", resp);
  const fileStream = createReadStream("./public/thumbs_up.jpeg");
  fileStream.pipe(res);
  // res.status(200).json({});
}

export default Pic;

import { NextApiRequest, NextApiResponse } from "next";
import { catchUpIcons } from "backend/services/catchUpIcons";
import { Readable } from "stream";

async function Pic(req: NextApiRequest, res: NextApiResponse) {
  try {
    const url = getImgUrl(req);
    await Promise.all([
      catchUpIcons().then((resp) => console.log("resp", resp)),
      fetch(url).then(async (fetchResp) => {
        for await (const chunk of fetchResp.body as unknown as Iterable<Readable>) {
          res.write(chunk);
        }
        res.status(200);
      }),
    ]);
    res.end();
  } catch (e) {
    console.error("e", e);
    res.status(500).end();
  }
}

// default is thumbs up
function getImgUrl(req: NextApiRequest) {
  const path = req.query.q;
  if (path) {
    console.info("external image");
    return path as string;
  }
  console.info("default image");
  const base =
    process.env.VERCEL_ENV === "production"
      ? "https://" + process.env.VERCEL_URL
      : "http://" + process.env.VERCEL_URL;
  return new URL("/thumbs_up.jpeg", base).toString();
}

export default Pic;

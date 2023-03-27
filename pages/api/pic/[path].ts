import { NextApiRequest, NextApiResponse } from "next";
import { catchUpIcons } from "backend/services/catchUpIcons";
import { Readable } from "stream";

async function Pic(req: NextApiRequest, res: NextApiResponse) {
  const path = req.url?.split("/").pop()!;
  try {
    const base =
      process.env.VERCEL_ENV === "production"
        ? "https://" + process.env.VERCEL_URL
        : "http://" + process.env.VERCEL_URL;
    const url = new URL(path, base).toString();
    console.log("url", url);
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

export default Pic;

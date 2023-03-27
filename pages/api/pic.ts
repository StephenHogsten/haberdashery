import { NextApiRequest, NextApiResponse } from "next";
import type { ReadStream } from "fs";
import { catchUpIcons } from "backend/services/catchUpIcons";
// import img from "./thumbs_up.jpeg";

async function Pic(req: NextApiRequest, res: NextApiResponse) {
  try {
    const base =
      process.env.VERCEL_ENV === "production"
        ? "https://" + process.env.VERCEL_URL
        : "http://" + process.env.VERCEL_URL;
    const url = new URL("/thumbs_up.jpeg", base);
    await Promise.all([
      catchUpIcons().then((resp) => console.log("resp", resp)),
      fetch(url).then((fetchResp) => {
        // const x = createReadStream(fetchResp.body)
        // this can end er
        return new Promise((resolve, reject) => {
          (fetchResp.body as unknown as ReadStream)
            .pipe(res)
            .on("close", () => {
              console.log("success end");
              resolve(true);
            })
            .on("error", (e) => {
              console.error("error", e);
              reject(e);
            });
        });
      }),
    ]);
  } catch (e) {
    console.error("e", e);
    res.status(500).end();
  }
  // res.status(200).json({});
}

export default Pic;

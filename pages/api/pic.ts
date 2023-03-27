import { NextApiRequest, NextApiResponse } from "next";
import { createReadStream, ReadStream } from "fs";
import { catchUpIcons } from "backend/services/catchUpIcons";
// import img from "./thumbs_up.jpeg";

async function Pic(req: NextApiRequest, res: NextApiResponse) {
  try {
    const url = new URL("/thumbs_up.jpeg", "http://localhost:3000");
    console.log("new url", url);
    const resp = await catchUpIcons();
    console.log("resp", resp);
    // res.send(img);
    await fetch(url).then((fetchResp) => {
      // const x = createReadStream(fetchResp.body)
      (fetchResp.body as unknown as ReadStream).pipe(res);
    });
    // req.
    // res.redirect("/thumbs_up.jpeg");
    // const fileStream = createReadStream('/public/thumbs_up.jpeg');
    // fileStream.pipe(res);
  } catch (e) {
    console.error("e", e);
    res.status(500).end();
  }
  // res.status(200).json({});
}

export default Pic;

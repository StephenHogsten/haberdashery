import { get, save, set } from "backend/redis";
import { DevOnly } from "backend/routeHelpers";
import { NextApiRequest, NextApiResponse } from "next";

const REDIS_TIMESTAMP_KEY = "MOST_RECENT_UPDATED_AT";
const REDIS_CURSOR_KEY = "MOST_RECENT_CREATED_AT_CURSOR";

async function Redis(req: NextApiRequest, res: NextApiResponse) {
  // await tmp(res);
  await lookup(res);
  // await clear(res);
  // await save()
}

async function lookup(res: NextApiResponse) {
  const cursor = await get(REDIS_CURSOR_KEY);
  const timestamp = await get(REDIS_TIMESTAMP_KEY);
  res.status(200).json({ cursor, timestamp });
}

async function tmp(res: NextApiResponse) {
  await set(REDIS_TIMESTAMP_KEY, "2023-03-21T18:46:04.841Z");
  await lookup(res);
}

async function clear(res: NextApiResponse) {
  set(REDIS_CURSOR_KEY, "");
  res.status(200).json({ status: "cleared" });
}

export default DevOnly(Redis);

import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";
import { DevOnly } from "backend/routeHelpers";

const DB_ID = "88848413-60ab-4a03-b882-b3a07b678204";

export const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

async function ListDb(req: NextApiRequest, res: NextApiResponse) {
  const data = await notion.databases.retrieve({ database_id: DB_ID });
  res.status(200).json(data);
}

export default DevOnly(ListDb);

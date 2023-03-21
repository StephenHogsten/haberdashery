import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { NextApiRequest, NextApiResponse } from "next";
import { notion } from "../../backend/notion";

interface EntryMap {
  [key: string]: Entry;
}

interface Entry {
  [key: string]: any;
}

// current GTD tasks: eb9dbd9cb54c41e9bd751c85e59a9e9b
const DB_CURRENT_ID = "eb9dbd9cb54c41e9bd751c85e59a9e9b";

const DB_ID = process.env.NOTION_DB_ID || "";

async function* genEntries(): AsyncIterable<QueryDatabaseResponse> {
  let hasMore = true;
  let cursor = "";
  while (hasMore) {
    const data = await notion.databases.query({
      database_id: DB_ID,
      start_cursor: cursor,
    });
    yield data;
    hasMore = data.has_more;
    if (hasMore) {
      cursor = data.next_cursor || "";
    }
  }
}

async function simpleQuery(databaseId: string) {
  return notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        timestamp: "created_time",
        direction: "ascending",
      },
    ],
  });
}

async function QueryDb(req: NextApiRequest, res: NextApiResponse) {
  // let entries: EntryMap = {};
  // for await (const data of genEntries()) {
  //   data.results.forEach((entry) => {
  //     entries[entry.id] = entry;
  //   });
  // }
  // console.log("entries", entries);
  // const data = await simpleQuery("88848413-60ab-4a03-b882-b3a07b678204");
  const data2 = await simpleQuery(DB_CURRENT_ID);
  res.status(200).json(data2);
}

export default QueryDb;

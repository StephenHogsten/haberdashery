import notion, { CURRENT_GTD_DB } from "backend/notion";
import { zip } from "lodash";
import { get, set } from "../redis";
import { setExpectedIcon, TaskPage } from "./changeStatusIcon";

const REDIS_CURSOR_KEY = "MOST_RECENT_CREATED_AT_CURSOR";

export async function backfill() {
  const params = await backfillParams();
  const queryResp = await notion.databases.query(params);
  const nextCursor = queryResp.next_cursor;
  const tasks = queryResp.results as TaskPage[];
  const updateResp = await Promise.all(tasks.map(setExpectedIcon));
  if (nextCursor) {
    set(REDIS_CURSOR_KEY, nextCursor);
    console.log("nextCursor", nextCursor);
  } else {
    set(REDIS_CURSOR_KEY, "DONE");
    console.log("last one");
  }
  return zip(tasks, updateResp);
}

async function getCursor(): Promise<string | null> {
  const cursor = await get(REDIS_CURSOR_KEY);
  return cursor;
}

async function backfillParams() {
  const cursor = await getCursor();

  const params: Parameters<typeof notion.databases.query>[0] = {
    database_id: CURRENT_GTD_DB,
    sorts: [
      {
        timestamp: "created_time",
        direction: "ascending",
      },
    ],
  };
  if (cursor) {
    params.start_cursor = cursor;
  }
  return params;
}

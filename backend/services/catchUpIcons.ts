import {
  CURRENT_GTD_DB,
  NotionQueryParams,
  paginationGenerator,
} from "backend/notion";
import { get, set } from "backend/redis";
import sub from "date-fns/sub";
import { setExpectedIcon, TaskPage } from "./changeStatusIcon";

const REDIS_TIMESTAMP_KEY = "MOST_RECENT_UPDATED_AT";

export async function catchUpIcons({
  firstTimestamp = "",
  lastTimestamp = "",
} = {}) {
  firstTimestamp = firstTimestamp || (await getTimestamp());
  lastTimestamp = lastTimestamp || new Date().toISOString();
  let promises: any[] = [];
  for await (const taskPages of paginationGenerator<TaskPage>(
    await baseParams(firstTimestamp, lastTimestamp)
  )) {
    promises = promises.concat(taskPages.map(setExpectedIcon));
  }
  const results = await Promise.all(promises);
  await set(REDIS_TIMESTAMP_KEY, lastTimestamp);
  return {
    updated: results.filter((x) => x).length,
    skipped: results.filter((x) => !x).length,
    total: results.length,
    firstTimestamp,
    lastTimestamp,
  };
}

// TODO: handle pagination
async function baseParams(firstTimestamp: string, lastTimestamp: string) {
  const params: NotionQueryParams = {
    database_id: CURRENT_GTD_DB,
    sorts: [
      {
        timestamp: "last_edited_time",
        direction: "ascending",
      },
    ],
    filter: {
      and: [
        { property: "Last edited time", date: { after: firstTimestamp } },
        { property: "Last edited time", date: { before: lastTimestamp } },
      ],
    },
  };
  return params;
}

async function getTimestamp() {
  // default to 24 hours ago
  const existingTimestamp: string | null = await get(REDIS_TIMESTAMP_KEY);
  if (existingTimestamp) {
    return existingTimestamp;
  }
  const d = sub(new Date(), { days: 1 });
  return d.toISOString();
}

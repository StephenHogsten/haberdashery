import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Emoji } from "./emoji";

// Initializing a client
export const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

export const CURRENT_GTD_DB = "eb9dbd9cb54c41e9bd751c85e59a9e9b";

// Note: I see no "batched update" endpoint, so we can just call this
// TODO: handle rate limited response (429) - might not be here
export async function updatePageEmoji(pageId: string, emoji: Emoji) {
  return notion.pages.update({
    page_id: pageId,
    icon: {
      type: "emoji",
      emoji,
    },
  });
}

export type NotionQueryParams = Parameters<typeof notion.databases.query>[0];

export async function* paginationGenerator<T = PageObjectResponse>(
  baseParams: NotionQueryParams
) {
  const params = { ...baseParams };
  while (true) {
    const resp = await notion.databases.query(params);
    console.log("one query with", params);
    yield resp.results as T[];
    if (!resp.has_more || !resp.next_cursor) {
      break;
    }
    params.start_cursor = resp.next_cursor;
  }
}

export default notion;

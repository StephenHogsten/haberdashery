import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Emoji } from "backend/emoji";
import { updatePageEmoji } from "backend/notion";

type Properties = PageObjectResponse["properties"];
type Property<T> = Extract<Properties[keyof Properties], { type: T }>;
export type TaskPage = Omit<PageObjectResponse, "properties"> & {
  properties: {
    Name: Property<"title">;
    Complete: Property<"checkbox">;
    "🧑‍🏫 Topics for Study": Property<"relation">;
    Tags: Property<"multi_select">;
    "Tickle on": Property<"date">;
    List: Property<"select">;
    "Next action list": Property<"select">;
    Created: Property<"created_time">;
    "Last edited time": Property<"last_edited_time">;
  };
};

export async function setExpectedIcon(page: TaskPage) {
  try {
    const expectedIcon = getExpectedIcon(page);
    if (shouldUpdateIcon(page, expectedIcon)) {
      await updatePageEmoji(page.id, expectedIcon);
      return true;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
}

const ResettableIcons = ["✅", "⬜", "🥧", "⏰", "⏳", "🚫", "⁉️", "🤷"];

function shouldUpdateIcon(page: TaskPage, expectedIcon: Emoji) {
  if (page.icon === null) {
    return true;
  }
  // not changing external or file icons
  // only changing when it's currently an auto-set icon
  return (
    page.icon.type === "emoji" &&
    page.icon.emoji !== expectedIcon &&
    ResettableIcons.includes(page.icon.emoji)
  );
}

function getExpectedIcon(page: TaskPage): Emoji {
  const status = page.properties["Complete"].checkbox;
  if (status) {
    return "✅";
  }
  const list = page.properties["List"].select?.name;
  switch (list) {
    case "Next actions":
      return "⬜";
    case "Someday / maybe":
      return "🥧";
    case "Tickler":
      return "⏰";
    case "Waiting For":
      return "⏳";
    case "Cancelled":
      return "🚫";
    default:
      return "⁉️";
    // return "🤷";
  }
}

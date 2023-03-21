import { UpdatePageParameters } from "@notionhq/client/build/src/api-endpoints";

interface WithEmoji {
  emoji: any;
}
type PageParameters = NonNullable<UpdatePageParameters["icon"]>;
export type Emoji = Extract<PageParameters, WithEmoji>["emoji"];

import { CURRENT_GTD_DB, notion, updatePageEmoji } from "backend/notion";
import { DevOnly } from "backend/routeHelpers";
import { setExpectedIcon, TaskPage } from "backend/services/changeStatusIcon";
import { NextApiRequest, NextApiResponse } from "next";

// https://www.notion.so/Create-calculated-property-for-missing-info-b2eaaa1aa1de4439ba4b18cd8081fa4e
const pageId = "b2eaaa1a-a1de-4439-ba4b-18cd8081fa4e";

async function Test(req: NextApiRequest, res: NextApiResponse) {
  // const response = await notion.search({
  //   query: "create notion integration",
  // });
  // const response = await notion.pages.retrieve({ page_id: page_id });

  const resp = await notion.databases.query({
    database_id: CURRENT_GTD_DB,
    sorts: [{ timestamp: "last_edited_time", direction: "ascending" }],
  });
  const pages = resp.results;
  console.log("pages", pages);
  // const updateResp = await Promise.all(
  //   pages.map((page) => setExpectedIcon(page as TaskPage))
  // );

  /* 
  // find a specific page to test
  const lightBulbPage = pages.filter(
    (page) =>
      (page as TaskPage).properties.Name.title[0].plain_text ===
      "Test lightbulbs"
  )[0];

  let updateResp;
  if (lightBulbPage) {
    updateResp = await setExpectedIcon(lightBulbPage as TaskPage);
    console.log("yes", updateResp);
  } else {
    updateResp = { success: false };
    console.log("no");
  }
  */

  // console.log("data", response);
  res.status(200).json(pages);
}

export default DevOnly(Test);

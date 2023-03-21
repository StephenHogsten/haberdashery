import { NextApiRequest, NextApiResponse } from "next";

// TODO:
//  read from a (yet to exist) notion database to get the last timestamp we ran on
//  query from the task database for entries more recently updated
//  for each, update the emoji if it's not correct

async function UpdateStatuses(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({});
}

export default UpdateStatuses;

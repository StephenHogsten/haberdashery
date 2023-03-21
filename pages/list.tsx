import { Box, Heading } from "@chakra-ui/react";
import { useContext } from "react";
import useSwr from "swr";

const DBID = "8884841360ab4a03b882b3a07b678204";

enum NOTION_ENDPOINTS {
  LIST_DB,
}

const List = () => {
  const { data, error } = useSwr("/api/query");

  const 

  console.log("data", data);
  console.log("error", error);

  return (
    <Box p={8}>
      <Heading as="h1">All the stuff</Heading>
      {data &&
        data.results &&
        data.results.map((entry: any) => (
          <Heading as="h3" key={entry.id}>
            {entry.properties.Title.title[0].plain_text}
          </Heading>
        ))}
    </Box>
  );
};

export default List;

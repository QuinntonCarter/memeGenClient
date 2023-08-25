import { useContext } from "react";
import { AppContext } from "../context/appContext";
import { HStack, Text } from "@chakra-ui/react";
import DBMemes from "./memes/DBMemes";
import moment from "moment";

export default function MemesView() {
  const { getCreatedMemes, memes } = useContext(AppContext);
  console.log("meme date", memes.created);
  // turn to component **
  const mappedMemes = memes
    ? memes
        .map((meme, i) => (
          <DBMemes
            {...meme}
            meme={meme}
            index={i}
            created={moment(meme.created).format("MM-DD-YY")}
          />
        ))
        .reverse()
    : getCreatedMemes();

  return mappedMemes ? (
    <HStack
      display={"flex"}
      flexDir={"row"}
      flexWrap={"wrap"}
    >
      {mappedMemes}
    </HStack>
  ) : (
    <Text as="p"> Memes will display here </Text>
  );
}

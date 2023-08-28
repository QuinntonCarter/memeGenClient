import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/appContext";
import { HStack, Text } from "@chakra-ui/react";
import DBMemes from "./memes/DBMemes";
import moment from "moment";

export default function MemesView() {
  const { getCreatedMemes, memes, setMemes } = useContext(AppContext);
  // push filtered meme(s) indexes into this array
  const [lostMemes, setLostMemes] = useState([]);
  // created memes are removed for now **
  // const mappedMemes = memes
  //   ? memes
  //       .map((meme, i) => (
  //         <DBMemes
  //           {...meme}
  //           memes={memes}
  //           index={i}
  //           created={moment(meme.created).format("MM-DD-YY")}
  //         />
  //       ))
  //       .reverse()
  //   : getCreatedMemes();

  const mappedMemes = memes
    .map((meme, i) => (
      <DBMemes
        {...meme}
        memes={memes}
        index={i}
        setLostMemes={setLostMemes}
        created={moment(meme.created).format("MM-DD-YY")}
      />
    ))
    .reverse();

  useEffect(() => {
    // removes broken memes from map
    const filtered = memes.filter((meme, index) => {
      if (!lostMemes.includes(index)) {
        return meme;
      }
    });
    setMemes(filtered);
  }, [lostMemes]);

  // return "hi";
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

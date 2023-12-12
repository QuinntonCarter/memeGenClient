import { useContext, useEffect } from "react";
import { AppContext } from "../context/appContext";
import { Box, HStack, Text } from "@chakra-ui/react";
import DBMemes from "./memes/DBMemes";
import moment from "moment";
import LoadingComp from "./Loading";

export default function MemesView() {
  const { memes, isLoading, lostMemes } = useContext(AppContext);

  const mappedMemes = memes
    ?.map((meme, i) => (
      <DBMemes
        {...meme}
        memes={memes}
        index={i}
        created={moment(meme.created).format("MM-DD-YY")}
      />
    ))
    .reverse();

  useEffect(() => {
    console.log(
      `found ${memes?.length} memes, ${lostMemes?.length} returned error from imgFlip API`
    );
  }, [memes]);

  if (!mappedMemes?.length) {
    return (
      <Box className="loaderContainer">
        <LoadingComp />
      </Box>
    );
    // } else if (!mappedMemes?.length) {
    //   return <Text as="p"> Memes will display here </Text>;
  } else {
    // return{mappedMemes}
    return <Box className="memesView">{mappedMemes}</Box>;
  }
}

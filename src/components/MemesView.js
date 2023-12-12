import { useContext } from "react";
import { AppContext } from "../context/appContext";
import { Box } from "@chakra-ui/react";
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

  if (!mappedMemes?.length) {
    return (
      <Box className="loaderContainer">
        <LoadingComp />
      </Box>
    );
  } else {
    return <Box className="memesView">{mappedMemes}</Box>;
  }
}

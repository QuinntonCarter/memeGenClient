import { useContext, useState, useEffect, Suspense, memo } from "react";
import { AppContext } from "../context/appContext";
import { HStack, Text } from "@chakra-ui/react";
import DBMemes from "./memes/DBMemes";
import moment from "moment";
import LoadingComp from "./Loading";

export default memo(function MemesView() {
  const { memes, setMemes, isLoading, setIsLoading } = useContext(AppContext);
  const [lostMemes, setLostMemes] = useState([]);

  const mappedMemes = memes
    .map((meme, i) => (
      <DBMemes
        {...meme}
        memes={memes}
        index={i}
        lostMemes={lostMemes}
        setLostMemes={setLostMemes}
        created={moment(meme.created).format("MM-DD-YY")}
      />
    ))
    .reverse();

  useEffect(() => {
    // removes broken memes from map
    let filtered = memes.filter((meme, index) => !lostMemes.includes(index));
    function filterMemes() {
      setMemes(filtered);
      setIsLoading(false);
    }
    setIsLoading(true);
    filterMemes();
  }, [lostMemes]);

  return (
    mappedMemes && (
      // isLoading ? (
      // <LoadingComp />
      // ) : (
      <Suspense fallback={LoadingComp}>
        <HStack display={"flex"} flexDir={"row"} flexWrap={"wrap"}>
          {mappedMemes}
        </HStack>
      </Suspense>
      // ) : (
      //   // )
      //   <Text as="p"> Memes will display here </Text>
    )
  );
});

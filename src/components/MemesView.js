import { useContext, useEffect, Suspense, memo } from "react";
import { AppContext } from "../context/appContext";
import { HStack, Text } from "@chakra-ui/react";
import DBMemes from "./memes/DBMemes";
import moment from "moment";
import LoadingComp from "./Loading";

export default memo(function MemesView() {
  const { memes, setMemes, isLoading, setIsLoading, lostMemes } =
    useContext(AppContext);
  // const [lostMemes, setLostMemes] = useState([]);

  const mappedMemes = memes
    ?.map((meme, i) => (
      <DBMemes
        {...meme}
        memes={memes}
        index={i}
        // lostMemes={lostMemes}
        // setLostMemes={setLostMemes}
        created={moment(meme.created).format("MM-DD-YY")}
      />
    ))
    .reverse();

  useEffect(() => {
    console.log(
      `found ${memes?.length} memes, ${lostMemes?.length} returned error from imgFlip API`
    );
  }, [memes]);

  return (
    mappedMemes?.length &&
    (isLoading ? (
      <LoadingComp />
    ) : (
      <Suspense fallback={LoadingComp}>
        <HStack display={"flex"} flexDir={"row"} flexWrap={"wrap"}>
          {mappedMemes}
        </HStack>
      </Suspense>
      // )
      // : (
      // )
      // <Text as="p"> Memes will display here </Text>
      // )
    ))
  );
});

import { useEffect } from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import { MdOutlineBrokenImage } from "react-icons/md";
import { useContext, memo } from "react";
import { AppContext } from "../../context/appContext";
import LoadingComp from "../Loading";

export default memo(function DBMemes({
  alias,
  _id,
  imgSrc,
  initialUrl,
  created,
  index,
  // lostMemes,
  setLostMemes,
}) {
  const { error, lostMemes } = useContext(AppContext);

  useEffect(() => {
    // console.log(lostMemes);
    //   // removes broken memes from map
    //   let filtered = memes.filter((meme, index) => !lostMemes.includes(index));
    //   function filterMemes() {
    //     setTimeout(async () => {
    //       console.log("is loading", isLoading);
    //       setIsLoading(false);
    //       await setMemes(filtered);
    //     }, 5000);
    //   }
    //   setIsLoading(true);
    //   filterMemes();
    //   console.log("is loading", isLoading);
  }, []);

  return _id ? (
    <Box className="" key={_id}>
      <Text as="h5" className="">
        {" "}
        Posted {`${created} by ${alias || _id.slice(14)}`}
      </Text>
      <Image
        className=""
        src={imgSrc}
        alt={`user meme: ${_id}`}
        // onError={() => setLostMemes((prevState) => [...prevState, index])}
        fallback={<MdOutlineBrokenImage title="Missing Image" size={"60%"} />}
      />
      <Text> {error && error} </Text>
    </Box>
  ) : (
    <LoadingComp />
  );
});

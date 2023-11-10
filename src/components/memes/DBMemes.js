import { Box, Image, Text } from "@chakra-ui/react";
import { MdOutlineBrokenImage } from "react-icons/md";
import { useContext } from "react";
import { AppContext } from "../../context/appContext";
import LoadingComp from "../Loading";

export default function DBMemes({ alias, _id, imgSrc, created }) {
  const { error } = useContext(AppContext);

  return _id ? (
    <Box
      className="dBMemeContainer"
      key={_id}
      minW={"auto"}
      height={"auto"}
      maxH={"fit-content"}
      padding={"1vw"}
    >
      <Text as="h5" className="">
        {" "}
        Posted {`${created} by ${alias || _id.slice(14)}`}
      </Text>
      <Image
        src={imgSrc}
        alt={`user meme: ${_id}`}
        fallback={<MdOutlineBrokenImage title="Missing Image" size={"60%"} />}
        min-width={"auto"}
        width={"600px"}
        alignSelf={"center"}
      />
      <Text> {error && error} </Text>
    </Box>
  ) : (
    <LoadingComp />
  );
}

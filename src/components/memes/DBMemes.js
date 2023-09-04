import { Box, Image, Text } from "@chakra-ui/react";
import { MdOutlineBrokenImage } from "react-icons/md";
import { useContext } from "react";
import { AppContext } from "../../context/appContext";
import LoadingComp from "../Loading";

export default function DBMemes({
  alias,
  _id,
  imgSrc,
  initialUrl,
  created,
  index,
  setLostMemes,
}) {
  console.log("meme props", alias, "created", created);
  const { error, setError } = useContext(AppContext);

  return _id ? (
    <Box
      className=""
      key={_id}
    >
      <Text
        as="h5"
        className=""
      >
        {" "}
        Posted {`${created} by ${alias || _id.slice(14)}`}
      </Text>
      <Image
        className=""
        src={imgSrc}
        alt={`user meme: ${_id}`}
        loading={() => <LoadingComp />}
        onError={() => setLostMemes((prevState) => [...prevState, index])}
        fallback={
          <MdOutlineBrokenImage
            title="Missing Image"
            size={"60%"}
          />
        }
      />
      <Text> {error && error} </Text>
    </Box>
  ) : (
    <LoadingComp />
  );
}

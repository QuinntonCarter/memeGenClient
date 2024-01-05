import { useContext, useEffect, useState } from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import { MdOutlineBrokenImage } from "react-icons/md";
import axios from "axios";
import { AppContext } from "../../context/appContext";

export default function DBMemes({ alias, id, imgSrc, index, endOfMemeArray }) {
  const { setIsLoading, setErrors } = useContext(AppContext);
  const [missing, setMissing] = useState(false);

  // on mount, check meme for error
  useEffect(() => {
    (async function checkMemeAvailaibility() {
      // if(i === )
      setIsLoading(true);
      await axios
        .get(imgSrc)
        // if get response, leave missing state as false
        .then((response) => {
          setMissing((prevState) => prevState);
        })
        // if error response, setMissing(true)
        .catch((error) => {
          // maybe setup so small error modal returns # of missing memes
          setMissing(true);
          console.log(error);
          // setErrors(error);
        });
    })();
    // set isLoading state to false if at end of array
    if (endOfMemeArray) {
      setIsLoading(false);
    }
  }, []);

  // if meme not missing, return component otherwise return null
  return !missing ? (
    <Box
      className="dBMemeContainer"
      key={id}
      minW={"auto"}
      height={"auto"}
      maxH={"fit-content"}
      padding={"1vw"}
    >
      <Text as="h5" className="">
        {/* refactoring */}
        {/* {`${created}   */}
        {`Posted by ${alias || id.slice(14)}`}
      </Text>
      <Image
        src={imgSrc}
        alt={`user meme: ${id}`}
        fallback={<MdOutlineBrokenImage title="Missing Image" size={"60%"} />}
        min-width={"auto"}
        width={"600px"}
        alignSelf={"center"}
      />
    </Box>
  ) : null;
}

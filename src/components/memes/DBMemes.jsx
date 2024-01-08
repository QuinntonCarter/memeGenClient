import { useContext, useEffect, useState } from "react";
import { Image, Text, WrapItem } from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import { MdOutlineBrokenImage } from "react-icons/md";
import { AppContext } from "../../context/appContext";

export default function DBMemes({ id, imgSrc, created, endOfMemeArray }) {
  const { setIsLoading, setErrors } = useContext(AppContext);
  const [missing, setMissing] = useState(false);

  // check if date object is valid
  const { _isValid } = moment(created);
  const date = _isValid ? moment(created).format("LLL") : "unknown";

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
    <WrapItem
      key={id}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
    >
      <Text title={_isValid ? `${date}` : `Error with post date retrieval`}>
        {`Posted on ${date}`}
      </Text>
      <Image
        src={imgSrc}
        alt={`user meme: ${id}`}
        fallback={<MdOutlineBrokenImage title="Missing Image" size={"60%"} />}
        boxSize="500px"
        objectFit="contain"
      />
    </WrapItem>
  ) : null;
}

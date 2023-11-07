import { useContext } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { BiSave, BiShuffle } from "react-icons/bi";
import { AppContext } from "../context/appContext";
import LoadingComp from "../components/Loading";

export default function MemeForm({
  handleSubmit,
  handleChange,
  inputs,
  setInputs,
}) {
  const {
    randomMeme,
    setRandomMeme,
    allMemes,
    error,
    setIsLoading,
    memeRef,
    setError,
  } = useContext(AppContext);

  const imgSrcSync = !randomMeme.imgSrc
    ? memeRef?.current?.url
    : randomMeme?.imgSrc;

  function getRandom(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      memeRef.current = allMemes[Math.floor(Math.random() * allMemes.length)];
      setRandomMeme({
        name: memeRef.current?.name,
        imgSrc: memeRef.current?.url,
        initialUrl: memeRef.current?.url,
        id: memeRef.current?.id,
        boxes: memeRef.current?.box_count,
      });
      setInputs({ topText: "", bottomText: "" });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError("error randomizing meme, please reload and try again", err);
    }
  }

  return memeRef.current ? (
    <Box
      className="memePreviewFormContainer"
      margin="1vw 0vw 0vw"
      display="flex"
      alignItems={"center"}
    >
      <FormControl
        className="memeForm"
        // gap={"4"}
        position={"relative"}
        isInvalid={error}
        onSubmit={handleSubmit}
      >
        <Box className="memeImgContainer" height={"45vh"} width={"100%"}>
          <Image
            width={"100%"}
            height={"100%"}
            margin={"auto"}
            objectFit={"contain"}
            src={imgSrcSync}
            alt="initial-meme"
          />
        </Box>
        <Box className="memeInputsContainer" margin={"auto"}>
          <Text as="h2" fontWeight={"bold"} textTransform={"capitalize"}>
            {memeRef.current?.name}
          </Text>
          <FormLabel>Create Meme Form</FormLabel>
          <FormHelperText>Enter text captions to create a meme</FormHelperText>
          <form
            method="post"
            // onChange={(e) => handleChange(e)}
          >
            <FormLabel>
              text one
              <input
                required
                type="text"
                name="topText"
                placeholder="First text"
                value={inputs.topText}
                onChange={(e) => handleChange(e)}
              />
            </FormLabel>
            <FormLabel>
              text two
              <input
                required
                type="text"
                name="bottomText"
                placeholder="Second text"
                value={inputs.bottomText}
                onChange={(e) => handleChange(e)}
              />
            </FormLabel>
          </form>
          <Box
            className="buttonContainer"
            as="span"
            display={"flex"}
            flexDir={"row"}
            gap={"1.5"}
            maxWidth={"360px"}
            width={"auto"}
            flexWrap={"wrap"}
            height={"10%"}
            justifyContent={"space-evenly"}
          >
            <Button
              mt={"1"}
              type="button"
              onClick={getRandom}
              width={"165px"}
              backgroundColor={"black"}
              color={"white"}
              _hover={{
                color: "black",
                backgroundColor: "yellow",
              }}
            >
              <BiShuffle />
              Randomize
            </Button>
            {/* reimplement save to screen later */}
            {/* <Button
                  mt={"1"}
                  type="submit"
                  width={"165px"}
                >
                  <HiPlus />
                  Generate
                </Button> */}
            <Button
              mt={"1"}
              type="submit"
              width={"165px"}
              backgroundColor={"black"}
              color={"white"}
              _hover={{
                color: "black",
                backgroundColor: "yellow",
              }}
            >
              <BiSave />
              Share to DB
            </Button>
          </Box>
          <FormErrorMessage>
            Error: {error}, please reload and try again{" "}
          </FormErrorMessage>
        </Box>
      </FormControl>
    </Box>
  ) : (
    <LoadingComp />
  );
}

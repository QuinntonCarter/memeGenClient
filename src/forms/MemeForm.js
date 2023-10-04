import { useContext, useEffect, useRef, memo } from "react";
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
import { HiPlus } from "react-icons/hi";
import { BiSave, BiShuffle } from "react-icons/bi";
import LoadingComp from "../components/Loading";
import { AppContext, imgFlipAxios } from "../context/appContext";

const { REACT_APP_GET } = process.env;

export default memo(function MemeForm({
  handleSubmit,
  handleChange,
  inputs,
  setInputs,
}) {
  const {
    randomMeme,
    setRandomMeme,
    setAllMemes,
    allMemes,
    error,
    setError,
    isLoading,
    setIsLoading,
  } = useContext(AppContext);
  const memeRef = useRef(null);
  const imgSrcSync = !randomMeme.imgSrc
    ? memeRef.current?.url
    : randomMeme?.imgSrc;

  async function getMemes() {
    try {
      setIsLoading(true);
      const {
        data: {
          data: { memes },
        },
      } = await imgFlipAxios.get(REACT_APP_GET);
      const memesFit = memes.filter((memes) => memes.box_count <= 2);
      setAllMemes(memesFit);
      memeRef.current = memesFit[Math.floor(Math.random() * memesFit.length)];
      // console.log("memesfit boxes", randomizedMeme.box_count, randomizedMeme);
      // watch for break **
      // memeRef.current = randomizedMeme;
      setRandomMeme({
        name: memeRef.current?.name,
        imgSrc: memeRef.current?.url,
        initialUrl: memeRef.current?.url,
        id: memeRef.current?.id,
        box_count: memeRef.current?.box_count,
        x: memeRef.current?.x,
        y: memeRef.current?.y,
        width: memeRef.current?.width,
        height: memeRef.current?.height,
      });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError("Error, please reload and try again");
    }
  }

  function getRandom(e) {
    e.preventDefault();
    memeRef.current = allMemes[Math.floor(Math.random() * allMemes.length)];
    // watch for break **
    setRandomMeme({
      name: memeRef.current?.name,
      imgSrc: memeRef.current?.url,
      initialUrl: memeRef.current?.url,
      id: memeRef.current?.id,
      boxes: memeRef.current?.box_count,
    });
    setInputs({ topText: "", bottomText: "" });
  }

  useEffect(() => {
    if (!memeRef.current) {
      getMemes();
    }
  }, []);

  return (
    <>
      {memeRef.current?.url &&
        memeRef.current?.name === randomMeme.name &&
        !isLoading && (
          <Box
            height="100%"
            width="100%"
            display="flex"
            align-content="center"
            margin="auto"
            flex-wrap="wrap"
          >
            <FormControl
              display={"flex"}
              flexDirection={"row"}
              gap={"4"}
              isInvalid={error}
              onSubmit={handleSubmit}
            >
              <Image
                maxWidth={"600px"}
                width={"100%"}
                margin={"auto"}
                height={"100%"}
                src={imgSrcSync}
                alt="initial-meme"
              />
              <Box
                display={"flex"}
                flexDir={"column"}
                gap={"2"}
                margin={"auto"}
              >
                <Text as="h2" fontWeight={"bold"} textTransform={"capitalize"}>
                  {memeRef.current?.name}
                </Text>
                <FormLabel>Create Meme Form</FormLabel>
                <FormHelperText>
                  Enter text captions to create a meme
                </FormHelperText>
                <Box
                  as="span"
                  display={"flex"}
                  flexDir={"column"}
                  gap={"1.5"}
                  maxWidth={"360px"}
                  width={"360px"}
                  flexWrap={"wrap"}
                >
                  {/* map boxes */}
                  <FormLabel>
                    text one
                    <Input
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
                    <Input
                      required
                      type="text"
                      name="bottomText"
                      placeholder="Second text"
                      value={inputs.bottomText}
                      onChange={(e) => handleChange(e)}
                    />
                  </FormLabel>
                </Box>
                <Box
                  as="span"
                  display={"flex"}
                  flexDir={"row"}
                  gap={"1.5"}
                  maxWidth={"360px"}
                  width={"360px"}
                  flexWrap={"wrap"}
                  justifyContent={"space-evenly"}
                >
                  <Button
                    mt={"1"}
                    type="button"
                    onClick={getRandom}
                    width={"165px"}
                    __active={{
                      backgroundColor: "purple.600",
                      color: "white",
                    }}
                    __hover={{ backgroundColor: "black", color: "white" }}
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
                  <Button mt={"1"} type="submit" width={"165px"}>
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
        )}
    </>
  );
});

import { useContext, forwardRef } from "react";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { AppContext } from "../context/appContext";
import LoadingComp from "../components/Loading";
import MemeCreationButtons from "../components/MemeCreationButtons.jsx";

export const MemeForm = forwardRef(function MemeForm(props, ref) {
  const { randomMeme, isLoading, setIsLoading, errors, setErrors } =
    useContext(AppContext);

  let templateAvailable = Boolean(randomMeme.url);

  function clickGetRandom(e) {
    setIsLoading(true);
    e.preventDefault();
    props.getMemeTemplate();
  }

  return (
    <Box
      className="memePreviewFormContainer"
      display="flex"
      alignItems={"center"}
    >
      <FormControl
        className="memeForm"
        position={"relative"}
        onSubmit={props.handleSubmit}
      >
        {templateAvailable && !isLoading ? (
          <>
            <Box className="memeImgContainer" height={"45vh"}>
              <Image
                width={"100%"}
                height={"100%"}
                margin={"auto"}
                objectFit={"contain"}
                src={randomMeme.url}
                alt="initial-meme"
              />
            </Box>
            <Box className="memeInputsContainer" margin={"auto"}>
              <Text as="h2" fontWeight={"bold"} textTransform={"capitalize"}>
                {randomMeme.name}
              </Text>
              <FormLabel>Create Meme Form</FormLabel>
              <FormHelperText>
                Enter text captions to create a meme
              </FormHelperText>

              <form onChange={(e) => props.handleChange(e)}>
                <FormLabel
                  display={"flex"}
                  flexDir={"column"}
                  justifyItems={"left"}
                  gap={"0.5vw"}
                >
                  text one
                  {/* refactor ** */}
                  <Input
                    required
                    type="text"
                    name="topText"
                    placeholder="First text"
                    value={props.inputs.topText}
                    onChange={(e) => props.handleChange(e)}
                  />
                </FormLabel>
                <FormLabel
                  display={"flex"}
                  flexDir={"column"}
                  justifyItems={"left"}
                  gap={"0.5vw"}
                >
                  text two
                  {/* refactor ** */}
                  <Input
                    required
                    type="text"
                    name="bottomText"
                    placeholder="Second text"
                    value={props.inputs.bottomText}
                    onChange={(e) => props.handleChange(e)}
                  />
                </FormLabel>
                <MemeCreationButtons
                  getRandom={clickGetRandom}
                  inputs={props.inputs}
                />
              </form>
              <FormErrorMessage>
                Error: {errors.message}, please reload and try again{" "}
              </FormErrorMessage>
            </Box>
          </>
        ) : (
          <LoadingComp loading={!templateAvailable} />
        )}
      </FormControl>
    </Box>
  );
});

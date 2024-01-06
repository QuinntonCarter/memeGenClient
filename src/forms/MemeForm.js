import { useContext, useState } from "react";
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
import { useMutation } from "@apollo/client";
import moment from "moment";
import { AppContext, imgFlipAxios } from "../context/appContext";
import LoadingComp from "../components/Loading";
import MemeCreationButtons from "../components/MemeCreationButtons.jsx";
import { useForm } from "../utils/hooks.js";
import { ADD_MEME } from "../mutations/meme.js";
import { GET_MEMES } from "../queries/meme.js";

const initInputs = { topText: "", bottomText: "" };

export default function MemeForm(props) {
  const { isLoading, errors, setErrors, randomMeme, setRandomMeme } =
    useContext(AppContext);
  const [inputs, setInputs] = useState(initInputs);
  const [newMeme, setNewMeme] = useState({});

  let templateAvailable = Boolean(randomMeme.url);
  let memeTemplateOrPreview = !newMeme.imgSrc ? randomMeme.url : newMeme.imgSrc;

  function clickGetRandom(e) {
    e.preventDefault();
    props.getMemeTemplate();
  }

  const { onChange, onSubmit, values } = useForm(handlePreviewSubmit, {
    topText: "",
    bottomText: "",
  });

  async function handlePreviewSubmit(e) {
    const created = moment().format("MM-DD-YY hh:mm");
    const { data } = await imgFlipAxios(process.env.REACT_APP_POST, {
      method: "POST",
      params: {
        username: process.env.REACT_APP_USERNAME,
        password: process.env.REACT_APP_PASSWORD,
        font: "arial",
        text0: values.topText,
        text1: values.bottomText,
        template_id: randomMeme.id,
      },
    });
    if (!data.success) {
      // set errors
      setErrors("Error contacting imgFlip API, try reloading");
    } else {
      const { url } = data.data;
      setNewMeme({
        imgSrc: url,
        initialUrl: randomMeme.url,
        _api_id: randomMeme.id,
        created: created,
      });
    }
  }

  // call mutation
  function addMemeCallback() {
    // calls add meme function pulled from line 36
    addMeme();
    // sets randomMeme key values to match default image's
    setRandomMeme((prevState) => prevState);
    // reset inputs to init
    setInputs("");
  }

  // watch for bad request issues **
  // create mutation call to backend
  const [addMeme, { loading, data }] = useMutation(ADD_MEME, {
    variables: {
      imgSrc: newMeme.imgSrc,
      initialUrl: newMeme.initialUrl,
      _api_id: newMeme._api_id,
      created: newMeme.created,
    },
    update(cache, { data: { addMeme } }) {
      const { memes } = cache.readQuery({ query: GET_MEMES });
      cache.writeQuery({
        query: GET_MEMES,
        data: {
          memes: [...memes, addMeme],
        },
      });
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
  });

  return (
    <Box
      className="memePreviewFormContainer"
      display="flex"
      alignItems={"center"}
    >
      <FormControl
        className="memeForm"
        position={"relative"}
        onSubmit={onSubmit}
      >
        {templateAvailable && !isLoading ? (
          <>
            <Box className="memeImgContainer" height={"45vh"}>
              {data && <p> Meme submitted! </p>}
              <Image
                width={"100%"}
                height={"100%"}
                margin={"auto"}
                objectFit={"contain"}
                src={memeTemplateOrPreview}
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

              <form>
                <FormLabel
                  display={"flex"}
                  flexDir={"column"}
                  justifyItems={"left"}
                  gap={"0.5vw"}
                >
                  text one
                  <Input
                    required
                    type="text"
                    name="topText"
                    placeholder="First text"
                    onChange={onChange}
                  />
                </FormLabel>
                <FormLabel
                  display={"flex"}
                  flexDir={"column"}
                  justifyItems={"left"}
                  gap={"0.5vw"}
                >
                  text two
                  <Input
                    required
                    type="text"
                    name="bottomText"
                    placeholder="Second text"
                    onChange={onChange}
                  />
                </FormLabel>
                <MemeCreationButtons
                  randomMeme={randomMeme}
                  getRandom={clickGetRandom}
                  inputs={inputs}
                  setInputs={setInputs}
                  handlePreviewSubmit={handlePreviewSubmit}
                  addMemeCallback={addMemeCallback}
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
}

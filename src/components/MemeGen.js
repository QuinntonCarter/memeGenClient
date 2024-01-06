import React, { useState, useContext, useEffect, forwardRef } from "react";
import { useMutation } from "@apollo/client";
import axios from "axios";
// import { Flex } from "@chakra-ui/react";
// import LoadingComp from "./Loading";
import { AppContext } from "../context/appContext.js";
import { useForm } from "../utils/hooks.js";
import { MemeForm } from "../forms/MemeForm.js";
import { ADD_MEME } from "../mutations/meme.js";
import { GET_MEMES } from "../queries/meme.js";

// const initInputs = { topText: "", bottomText: "" };

// ** bug maybe **
export default forwardRef(function MemeGenerator(props, ref) {
  const {
    setErrors,
    errors,
    isLoading,
    setIsLoading,
    randomMeme,
    setRandomMeme,
  } = useContext(AppContext);

  async function getMemeTemplate() {
    const { data } = await axios.get("https://api.imgflip.com/get_memes");
    setIsLoading(true);
    // if error contacting imgFlip API
    if (!data.success) {
      // set errors
      setErrors("Error contacting imgFlip API, try reloading");
    } else {
      const { memes } = data.data;
      const memesFit = memes.filter((memes) => memes.box_count <= 2);
      // setMemeTemplates(memesFit);
      ref.current = memesFit[Math.floor(Math.random() * memesFit.length)];
      setRandomMeme(ref.current);
    }
    setIsLoading(false);
  }

  console.log("ref info", ref.current);

  // grab meme templates on mount
  useEffect(() => {
    // ** watch for bug **
    if (!ref.current) {
      getMemeTemplate();
    }
    setIsLoading(false);
    // ** watch for bug **
  }, []);

  // function handleSubmit(e) {
  // e.preventDefault();
  // const createdDate = moment().format("LL LTS");
  // sends inputs through as params to endpoint to complete meme creation
  // refactoring
  // setUserMemes((prevState) => [
  //   ...prevState,
  //   {
  //     imgSrc: randomMeme.imgSrc,
  //     initialUrl: randomMeme.initialUrl,
  //     tempID: randomMeme.tempID,
  //     _api_id: randomMeme.id,
  //     // created: createdDate,
  //   },
  // ]);
  // // sets randomMeme key values to match default image's
  // setRandomMeme((prevState) => prevState);
  // // reset inputs to init
  // return setInputs(initInputs);
  // }

  // refactoring **
  // useEffect(() => {
  //   imgFlipAxios(REACT_APP_POST, {
  //     method: "POST",
  //     params: {
  //       username: REACT_APP_USERNAME,
  //       password: REACT_APP_PASSWORD,
  //       font: "arial",
  //       text0: inputs.topText,
  //       text1: inputs.bottomText,
  //       template_id: randomMeme.id,
  //     },
  //   })
  //     // sets preview img url to randomMeme imgSrc
  //     .then((res) =>
  //       setRandomMeme((prevInputs) => ({
  //         ...prevInputs,
  //         imgSrc:
  //           res?.data?.data?.url === randomMeme.imgSrc
  //             ? randomMeme.imgSrc
  //             : res?.data?.data?.url,
  //         tempID: res?.data?.data?.page_url.slice(22),
  //       }))
  //     )
  //     .catch((err) => console.log("error retrieving preview from db", err));
  // }, [inputs.topText, inputs.bottomText]);

  return (
    <>
      <MemeForm
        // inputs={inputs}
        // setInputs={setInputs}
        // handleChange={onChange}
        // handleSubmit={onSubmit}
        // randomMeme={props.randomMeme}
        // initialURL={randomMeme.url}
        getMemeTemplate={getMemeTemplate}
      />
    </>
  );
});

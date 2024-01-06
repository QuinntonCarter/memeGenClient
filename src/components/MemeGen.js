import React, { useContext, useEffect, forwardRef } from "react";
import axios from "axios";
import { AppContext } from "../context/appContext.js";
import MemeForm from "../forms/MemeForm.js";

// ** bug maybe **
export default forwardRef(function MemeGenerator(props, ref) {
  const { setErrors, setIsLoading, setRandomMeme } = useContext(AppContext);

  async function getMemeTemplate() {
    const { data } = await axios.get("https://api.imgflip.com/get_memes");
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
  }

  // grab meme templates on mount
  useEffect(() => {
    // ** watch for bug **
    if (!ref.current) {
      getMemeTemplate();
    }
    setIsLoading(false);
    // ** watch for bug **
  }, []);

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
      <MemeForm getMemeTemplate={getMemeTemplate} />
    </>
  );
});

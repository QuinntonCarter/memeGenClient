import React, { useState, useEffect, useContext } from "react";
import UserMemes from "./UserMemes.js";
import MemeForm from "../forms/MemeForm.js";
import { AppContext, imgFlipAxios } from "../context/appContext.js";
import moment from "moment";

const { REACT_APP_POST, REACT_APP_USERNAME, REACT_APP_PASSWORD } = process.env;

const initInputs = { topText: "", bottomText: "" };

export default function MemeGenerator() {
  const { userMemes, setUserMemes, randomMeme, setRandomMeme } =
    useContext(AppContext);

  const [inputs, setInputs] = useState(initInputs);

  function handleChange(e) {
    // REFACTOR // look into formdata way..?
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const createdDate = moment().format("LL LTS");
    // sends inputs through as params to endpoint to complete meme creation
    setUserMemes((prevState) => [
      ...prevState,
      {
        imgSrc: randomMeme.imgSrc,
        initialUrl: randomMeme.initialUrl,
        tempID: randomMeme.tempID,
        _api_id: randomMeme.id,
        created: createdDate,
      },
    ]);
    // sets randomMeme key values to match default image's
    setRandomMeme((prevState) => prevState);
    // reset inputs to init
    return setInputs(initInputs);
  }

  useEffect(() => {
    // grabs edited image source from DB
    imgFlipAxios(REACT_APP_POST, {
      method: "POST",
      params: {
        username: REACT_APP_USERNAME,
        password: REACT_APP_PASSWORD,
        font: "arial",
        text0: inputs.topText,
        text1: inputs.bottomText,
        template_id: randomMeme.id,
      },
    })
      .then((res) => {
        // sets preview img url to randomMeme imgSrc
        setRandomMeme((prevInputs) => ({
          ...prevInputs,
          name: prevInputs.name,
          imgSrc: res.data.data ? res.data.data.url : prevInputs.imgSrc,
          tempID: res.data.data ? res.data.data.page_url.slice(22) : "",
          initialUrl: prevInputs.initialUrl,
          id: prevInputs.id,
        }));
      })
      .catch((err) => console.error(err));
  }, [inputs.topText, inputs.bottomText]);

  return (
    <>
      <MemeForm
        inputs={inputs}
        setInputs={setInputs}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {userMemes &&
        userMemes
          .map((meme) => (
            <UserMemes
              key={meme.tempID}
              {...randomMeme}
              inputs={inputs}
              handleEdit={handleSubmit}
              handleChange={handleChange}
              tempID={meme.tempID}
              _api_id={meme._api_id}
              imgSrc={meme.imgSrc}
              created={meme.created}
              initialUrl={meme.initialUrl}
            />
          ))
          .reverse()}
    </>
  );
}

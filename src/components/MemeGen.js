import React, { useState, useEffect, useContext } from "react";
import UserMemes from "./UserMemes.js";
import MemeForm from "../forms/MemeForm.js";
import { AppContext } from "../context/appContext.js";
import moment from "moment";
import axios from "axios";

const { REACT_APP_POST_URL, REACT_APP_USERNAME, REACT_APP_PASSWORD } =
  process.env;

const initInputs = { topText: "", bottomText: "" };

export default function MemeGenerator() {
  const {
    // all current user's memes
    userMemes,
    setUserMemes,
    randomMeme,
    setRandomMeme,
  } = useContext(AppContext);

  const [inputs, setInputs] = useState(initInputs);

  function handleChange(e) {
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
    setInputs(initInputs);
  }

  const mappedMemes =
    userMemes &&
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
      .reverse();

  useEffect(() => {
    // grabs edited image source from DB
    axios(REACT_APP_POST_URL, {
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
      .then((res) =>
        // sets preview img url to randomMeme imgSrc
        setRandomMeme((prevInputs) => ({
          ...prevInputs,
          name: prevInputs.name,
          imgSrc: res.data.data ? res.data.data.url : prevInputs.imgSrc,
          tempID: res.data.data ? res.data.data.page_url.slice(22) : "",
          initialUrl: prevInputs.initialUrl,
          id: prevInputs.id,
        }))
      )
      .catch((err) => console.error(err));
  }, [inputs.topText, inputs.bottomText]);

  return (
    <div className="flex flex-col pb-12 pt-16 overflow-scroll bg-blue-200 w-screen p-3">
      <MemeForm
        inputs={inputs}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {userMemes ? mappedMemes : null}
      <p className="pt-14 text-center text-xs font-mono text-blue-300">
        {" "}
        Quinnton Carter 2023{" "}
      </p>
    </div>
  );
}

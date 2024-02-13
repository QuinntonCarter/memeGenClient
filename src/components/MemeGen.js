import React, { useContext, useEffect, useRef } from "react";
import axios from "axios";
import { AppContext } from "../context/appContext.js";
import MemeForm from "../forms/MemeForm.js";

export default function MemeGenerator() {
  const { setErrors, setIsLoading, setRandomMeme } = useContext(AppContext);
  const memeTemplateRef = useRef(null);

  async function getMemeTemplate() {
    const { data } = await axios.get("https://api.imgflip.com/get_memes");
    // if error contacting imgFlip API
    if (!data.success) {
      // set errors
      setErrors("Error contacting imgFlip API, try reloading");
    } else {
      const { memes } = data.data;
      const memesFit = memes.filter((memes) => memes.box_count === 2);
      memeTemplateRef.current =
        memesFit[Math.floor(Math.random() * memesFit.length)];
      setRandomMeme(memeTemplateRef.current);
    }
  }

  // grab meme templates on mount
  useEffect(() => {
    if (!memeTemplateRef.current) {
      getMemeTemplate();
    }
    setIsLoading(false);
  }, []);

  return (
    <div className="memeGenContainer">
      <MemeForm getMemeTemplate={getMemeTemplate} />
    </div>
  );
}

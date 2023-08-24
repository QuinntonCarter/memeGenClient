import { useContext, useEffect, useState, useRef } from "react";
// import { BeakerIcon } from "@heroicons/react/outline";
// import { SwitchHorizontalIcon } from "@heroicons/react/outline";
import LoadingComp from "../components/Loading";
import { AppContext } from "../context/appContext";
import axios from "axios";
const { REACT_APP_GET_URL } = process.env;

export default function MemeForm(props) {
  const { randomMeme, setRandomMeme, setAllMemes, allMemes } =
    useContext(AppContext);
  const { handleSubmit, handleChange, inputs } = props;
  const [error, setError] = useState();
  const memeRef = useRef(null);
  const imgSrcSync =
    memeRef.current?.url === randomMeme?.imgSrc
      ? memeRef.current?.url
      : randomMeme?.imgSrc;

  async function getMemes() {
    try {
      const {
        data: {
          data: { memes },
        },
      } = await axios.get(REACT_APP_GET_URL);
      const memesFit = memes.filter((memes) => memes.box_count <= 2);
      setAllMemes(memesFit);
      const randomizedMeme =
        memesFit[Math.floor(Math.random() * memesFit.length)];
      memeRef.current = randomizedMeme;
      setRandomMeme({
        name: randomizedMeme?.name,
        imgSrc: randomizedMeme?.url,
        initialUrl: randomizedMeme?.url,
        id: randomizedMeme?.id,
        boxes: randomizedMeme?.box_count,
      });
    } catch (err) {
      setError("Error, please reload and try again");
    }
  }

  function getRandom(e) {
    e.preventDefault();
    const randomMeme = allMemes[Math.floor(Math.random() * allMemes.length)];
    memeRef.current = randomMeme;
    setRandomMeme({
      name: randomMeme?.name,
      imgSrc: randomMeme?.url,
      initialUrl: randomMeme?.url,
      id: randomMeme?.id,
      boxes: randomMeme?.box_count,
    });
  }

  useEffect(() => {
    if (!memeRef.current) {
      getMemes();
    }
  }, []);

  return (
    <>
      {memeRef.current?.url ? (
        <div className="">
          <h1 className="">{memeRef.current.name}</h1>
          <form
            className=""
            onSubmit={handleSubmit}
          >
            <button
              className=""
              type="submit"
            >
              Generate
              {/* <BeakerIcon className="" /> */}
            </button>
            <button
              className=""
              onClick={getRandom}
            >
              Randomize
              {/* <SwitchHorizontalIcon className="" /> */}
            </button>
            <img
              className=""
              src={imgSrcSync}
              alt="initial-meme"
            />
            <input
              required
              className=""
              type="text"
              name="topText"
              placeholder="First text"
              value={inputs.topText}
              onChange={(e) => handleChange(e)}
            />
            <input
              required
              className=""
              type="text"
              name="bottomText"
              placeholder="Second text"
              value={inputs.bottomText}
              onChange={(e) => handleChange(e)}
            />
          </form>
          {error && error}
        </div>
      ) : (
        <LoadingComp />
      )}
    </>
  );
}

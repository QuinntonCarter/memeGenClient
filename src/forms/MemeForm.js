import { useContext, useEffect, useState, useRef } from "react";
import { BeakerIcon } from "@heroicons/react/outline";
import { SwitchHorizontalIcon } from "@heroicons/react/outline";
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
        <div className="rounded pt-3 px-3">
          <h1 className="border-solid border-2 border-navy p-2 text-center bg-white rounded font-normal text-navy">
            {memeRef.current.name}
          </h1>
          <form
            className="grid pt-2 grid-cols-4"
            onSubmit={handleSubmit}
          >
            <button
              className="col-span-2 text-xs px-4 p-1 m-1 mx-auto font-medium rounded-full w-auto bg-cream border-b-4 border-yellow-400 text-indigo-800 inline-flex items-center"
              type="submit"
            >
              Generate
              <BeakerIcon className="w-5" />
            </button>
            <button
              className="col-span-2 text-xs px-4 p-1 m-1 mx-auto rounded-full font-medium w-auto bg-babyBlue text-indigo-800 border-b-4 border-blue-400 inline-flex items-center"
              onClick={getRandom}
            >
              Randomize
              <SwitchHorizontalIcon className="w-5" />
            </button>
            <img
              className="col-span-4 max-h-auto mx-auto rounded border-white border-4 m-3"
              src={imgSrcSync}
              alt="initial-meme"
            />
            <input
              required
              className="col-span-4 focus:ring-2 text-xs focus:ring-gray-200"
              type="text"
              name="topText"
              placeholder="First text"
              value={inputs.topText}
              onChange={(e) => handleChange(e)}
            />
            <input
              required
              className="col-span-4 focus:ring-2 text-xs focus:ring-gray-200"
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

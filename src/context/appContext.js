import { useState, useEffect, createContext, useRef } from "react";
import axios from "axios";

const { REACT_APP_SERVER_URL, REACT_APP_IMGFLIP_URL, REACT_APP_GET } =
  process.env;

export const AppContext = createContext();
export const imgFlipAxios = axios.create();
imgFlipAxios.interceptors.request.use((config) => {
  config.baseURL = REACT_APP_IMGFLIP_URL;
  return config;
});
export default function AppProvider({ children }) {
  // const [ errMsg, setErrMsg ] = useState('')
  // all memes from the app's DB
  const [memes, setMemes] = useState();
  // indexes of memes with error response from imgflip API
  const [lostMemes, setLostMemes] = useState([]);
  // all api memes
  const [allMemes, setAllMemes] = useState([]);
  // all memes created by current user
  const [userMemes, setUserMemes] = useState([]);
  // initial meme for editing
  const [randomMeme, setRandomMeme] = useState({});
  const [error, setError] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const memeRef = useRef(null);

  // GET memes from DB
  function getCreatedMemes() {
    // array for grabbing memes still live on the API
    let liveMemes = [];
    axios
      .get(`${REACT_APP_SERVER_URL}/db`)
      .then(async (res) => {
        for (let meme of res.data) {
          await fetch(meme.imgSrc)
            .then((res) => {
              // if meme doesn't return error => push to liveMemes array
              if (res.status !== 404 && res.ok) {
                liveMemes.push(meme);
              } else {
                setLostMemes((prevState) => [...prevState, meme]);
              }
            })
            .catch((err) => console.log("error retrieving memes", err));
        }
        // set live memes to memes
      })
      .catch((err) => console.log("error", err));
    return setMemes(liveMemes);
  }

  async function getMemes() {
    try {
      setIsLoading(true);
      console.log("ran get memes function");
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
      console.log("get memes error");
      setIsLoading(false);
      setError("Error, please reload and try again");
    }
  }

  // refactor this into submit to db function:
  function submitMeme(source, url, id, alias) {
    try {
      // generates object for send to backend
      const submittedMeme = {
        imgSrc: source,
        initialUrl: url,
        _api_id: id,
        alias: alias,
      };
      axios
        .post(`${REACT_APP_SERVER_URL}/db`, submittedMeme)
        .then((res) =>
          // adds to db and returns response from db, push res obj to array
          setMemes((prevState) => [...prevState, res.data])
        )
        .catch(getCreatedMemes());
    } catch (err) {
      console.log(err);
    }
  }

  // gather initial data
  useEffect(() => {
    getCreatedMemes();
    if (!memeRef.current) {
      // ** remove before production **
      console.log("ran get memes useeffect");
      getMemes();
      // ** remove before production **
      console.log("meme ref context", memeRef);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        error,
        setError,
        randomMeme,
        setRandomMeme,
        // for submit meme to DB
        submitMeme,
        // all memes from DB
        memes,
        setMemes,
        lostMemes,
        // all from api
        allMemes,
        setAllMemes,
        // all current user's memes
        userMemes,
        setUserMemes,
        getCreatedMemes,
        isLoading,
        setIsLoading,
        memeRef,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

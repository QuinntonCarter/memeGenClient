import { useState, useEffect, createContext } from "react";
import axios from "axios";

const { REACT_APP_SERVER_URL, REACT_APP_IMGFLIP_URL } = process.env;

export const AppContext = createContext();
export const imgFlipAxios = axios.create();
imgFlipAxios.interceptors.request.use((config) => {
  config.baseURL = REACT_APP_IMGFLIP_URL;
  return config;
});
export default function AppProvider({ children }) {
  // const [ errMsg, setErrMsg ] = useState('')
  // all memes from the app's DB
  const [memes, setMemes] = useState([]);
  // all api memes
  const [allMemes, setAllMemes] = useState([]);
  // all memes created by current user
  const [userMemes, setUserMemes] = useState([]);
  // initial meme for editing
  const [randomMeme, setRandomMeme] = useState({});
  const [error, setError] = useState();

  const [isLoading, setIsLoading] = useState(false);

  // GET memes from DB
  function getCreatedMemes() {
    axios
      .get(`${REACT_APP_SERVER_URL}/db`)
      .then((res) => {
        setMemes(res.data);
      })
      .catch((err) => console.log("error", err));
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
        // all from api
        allMemes,
        setAllMemes,
        // all current user's memes
        userMemes,
        setUserMemes,
        getCreatedMemes,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

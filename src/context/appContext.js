import React, { useState, useEffect } from "react";
import axios from "axios";

const { REACT_APP_SERVER_URL } = process.env;

export const AppContext = React.createContext();

export default function AppProvider(props) {
  // const [ errMsg, setErrMsg ] = useState('')
  // all memes from the app's DB
  const [memes, setMemes] = useState([]);
  // all api memes
  const [allMemes, setAllMemes] = useState([]);
  // all memes created by current user
  const [userMemes, setUserMemes] = useState([]);
  // initial meme for editing
  const [randomMeme, setRandomMeme] = useState({});

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
      .catch((err) => console.log(err))
      .finally(getCreatedMemes());
  }

  // gather initial data
  useEffect(() => {
    getCreatedMemes();
  }, []);

  return (
    <AppContext.Provider
      value={{
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
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

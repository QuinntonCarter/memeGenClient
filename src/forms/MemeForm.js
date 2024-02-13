import { useContext, useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import moment from "moment"; // change to dayjs ** check if this was causing date conversion issues
import dayjs from "dayjs";
import { AppContext, imgFlipAxios } from "../context/appContext";
import LoadingComp from "../components/Loading";
import MemeCreationButtons from "../components/MemeCreationButtons.jsx";
import { useForm } from "../utils/hooks.js";
import { ADD_MEME } from "../mutations/meme.js";
import { GET_MEMES } from "../queries/meme.js";
import { useNavigate } from "react-router-dom";

const initInputs = { topText: "", bottomText: "" };

export default function MemeForm(props) {
  const { isLoading, errors, setErrors, randomMeme } = useContext(AppContext);
  const navigate = useNavigate();

  const [toggleButtons, setToggleButtons] = useState(false);
  const [newMeme, setNewMeme] = useState({});

  let templateAvailable = Boolean(randomMeme.url);
  let memeTemplateOrPreview = !newMeme.imgSrc ? randomMeme.url : newMeme.imgSrc;

  function clickGetRandom(e) {
    e.preventDefault();
    // reset input values
    setValues(initInputs);
    props.getMemeTemplate();
  }

  const { onChange, onSubmit, values, setValues } = useForm(
    handlePreviewSubmit,
    initInputs
  );

  async function handlePreviewSubmit() {
    if (values.topText.length === 0 || values.bottomText.length === 0) {
      setErrors({ message: "Enter captions first" });
      return;
    } else {
      const created = moment().format("MM-DD-YY hh:mm");
      const { data } = await imgFlipAxios(process.env.REACT_APP_POST, {
        method: "POST",
        params: {
          username: process.env.REACT_APP_USERNAME,
          password: process.env.REACT_APP_PASSWORD,
          font: "arial",
          text0: values.topText,
          text1: values.bottomText,
          template_id: randomMeme.id,
        },
      });
      if (!data.success) {
        // set errors
        setErrors("Error contacting imgFlip API, try reloading");
      } else {
        const { url } = data.data;
        setNewMeme({
          imgSrc: url,
          initialUrl: randomMeme.url,
          _api_id: randomMeme.id,
          created: created,
        });
        setToggleButtons(true);
      }
    }
  }

  // call mutation
  function addMemeCallback(e) {
    e.preventDefault();
    // calls add meme function pulled from line 36
    addMeme();
    reset();
    // resets meme to initial image
    setNewMeme({});
    // reset input values
    setValues(initInputs);
    // button menu toggle
    setToggleButtons(false);
    navigate("/memes");
  }

  // create mutation call to backend
  const [addMeme, { loading, data, reset }] = useMutation(ADD_MEME, {
    variables: {
      imgSrc: newMeme.imgSrc,
      initialUrl: newMeme.initialUrl,
      _api_id: newMeme._api_id,
      created: newMeme.created,
    },
    refetchQueries: [GET_MEMES, "getMemes"],
  });

  useEffect(() => {
    setErrors([]);
  }, []);

  return (
    <div className="memeFormContainer">
      {templateAvailable && !isLoading ? (
        <>
          <span className="memeImgTitleContainer">
            <h2 className="memeForm-memeTitle">{randomMeme.name}</h2>
            <div className="memeImgContainer">
              <img
                className="memeImage"
                src={memeTemplateOrPreview}
                alt="initial-meme"
              />
            </div>
          </span>
          <div>
            <form className="memeInputForm">
              <MemeCreationButtons
                randomMeme={randomMeme}
                getRandom={clickGetRandom}
                onSubmit={onSubmit}
                addMemeCallback={addMemeCallback}
                toggleButtons={toggleButtons}
                setToggleButtons={setToggleButtons}
                newMeme={newMeme}
                setNewMeme={setNewMeme}
                setValues={setValues}
                initInputs={initInputs}
              />
              <h3 className="memeForm-title">
                Enter text captions to create a meme
                {data ? <p> Meme submitted! </p> : <br />}
              </h3>
              <label>
                Caption one
                <input
                  required
                  disabled={toggleButtons}
                  type="text"
                  name="topText"
                  value={values.topText}
                  placeholder="First caption"
                  onChange={onChange}
                />
              </label>
              <label>
                Caption two
                <input
                  required
                  disabled={toggleButtons}
                  type="text"
                  name="bottomText"
                  value={values.bottomText}
                  placeholder="Second caption"
                  onChange={onChange}
                />
              </label>
            </form>
            {errors.message && (!values.topText || !values.bottomText) ? (
              <p className="errorMsg" style={{ color: "red", fontWeight: 600 }}>
                Error: {errors.message}
              </p>
            ) : (
              <br />
            )}
          </div>
        </>
      ) : (
        <LoadingComp loading={!templateAvailable} />
      )}
    </div>
  );
}

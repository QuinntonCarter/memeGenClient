import React, { useState, useEffect, useContext, memo } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";

import LoadingComp from "./Loading";
import { AppContext } from "../context/appContext";
import { ADD_MEME } from "../mutations/meme";
import { GET_MEMES } from "../queries/meme";

// ** this is mapped memes saved locally **

const { REACT_APP_POST_URL, REACT_APP_USERNAME, REACT_APP_PASSWORD } =
  process.env;

export default function UserMemes(props) {
  const { setUserMemes, userMemes } = useContext(AppContext);

  const [toggleEdit, setToggleEdit] = useState(false);
  const [toggleSave, setToggleSave] = useState(false);
  // REFACTOR // formData way
  const [inputs, setInputs] = useState({
    topText: "",
    bottomText: "",
    alias: "",
  });
  const [alias, setAlias] = useState("");

  // create editable img obj
  const [imgEditable, setImgEditable] = useState({
    imgSrc: props.initialUrl,
    initialUrl: props.initialUrl,
    tempID: props.tempID,
    _api_id: props._api_id,
  });

  const [addMeme] = useMutation(ADD_MEME, {
    variables: {
      imgSrc: props.imgSrc,
      tempID: props.tempID,
      _api_id: props._api_id,
      // created: props.created,
      initialUrl: props.initialUrl,
    },
    update(cache, { data: { addMeme } }) {
      const { memes } = cache.readQuery({ query: GET_MEMES });
      cache.writeQuery({
        query: GET_MEMES,
        data: {
          memes: [...memes, addMeme],
        },
      });
    },
  });

  // delete from frontend state
  const deleteMeme = (id) => {
    const newMemes = userMemes.filter((memes) => memes.tempID !== id);
    return setUserMemes(newMemes);
  };

  // save to DB ** replace w mutation
  function onSubmit(src, initial, id, name) {
    deleteMeme(props.tempID);
    addMeme(src, initial, id, name);
  }
  //

  function handleChangeEdit(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }

  // submits the edit
  const handleEdit = (e, id) => {
    // const createdDate = JSON.stringify(new Date()).slice(1, 11);
    e.preventDefault();
    deleteMeme(id);
    setUserMemes((prevState) => [
      ...prevState,
      {
        imgSrc: imgEditable.imgSrc,
        initialUrl: props.initialUrl,
        tempID: imgEditable.tempID,
        _api_id: props._api_id,
        // created: createdDate,
      },
    ]);
    setToggleEdit((prevState) => !prevState);
    setInputs({
      topText: "",
      bottomText: "",
    });
  };

  // refactor **
  // useEffect(() => {
  //   axios(REACT_APP_POST_URL, {
  //     method: "POST",
  //     params: {
  //       username: REACT_APP_USERNAME,
  //       password: REACT_APP_PASSWORD,
  //       font: "arial",
  //       text0: inputs.topText,
  //       text1: inputs.bottomText,
  //       template_id: props._api_id,
  //     },
  //   })
  //     .then((res) =>
  //       setImgEditable((prevInputs) => ({
  //         ...prevInputs,
  //         imgSrc: res.data.data ? res.data.data.url : imgEditable.imgSrc,
  //         tempID: res.data.data
  //           ? res.data.data.page_url.slice(22)
  //           : imgEditable.tempID,
  //       }))
  //     )
  //     .catch((err) => console.log(err));
  // }, [inputs.topText, inputs.bottomText]);

  return (
    <>
      {props.imgSrc ? (
        <Box className="">
          {!toggleEdit ? (
            <Box
              className="dBMemeContainer"
              minW={"auto"}
              height={"auto"}
              maxH={"fit-content"}
              padding={"1vw"}
            >
              <Text as={"h5"} className="">
                Local ID: '{props.tempID}'{/* created: {props.created}{" "} */}
              </Text>
              <Image
                src={props.imgSrc}
                alt={`user meme: ${props.tempID}`}
                min-width={"auto"}
                width={"600px"}
              />
              <Box className="userMemesButtonsContainer">
                {!toggleSave ? (
                  <>
                    <Button
                      className="userMemesButtons"
                      backgroundColor={"black"}
                      color={"white"}
                      _hover={{
                        color: "black",
                        backgroundColor: "yellow",
                      }}
                      onClick={() => deleteMeme(props.tempID)}
                    >
                      {" "}
                      delete{" "}
                    </Button>
                    <Button
                      className="userMemesButtons"
                      backgroundColor={"black"}
                      color={"white"}
                      _hover={{
                        color: "black",
                        backgroundColor: "yellow",
                      }}
                      onClick={() => {
                        setToggleSave((prevState) => !prevState);
                      }}
                    >
                      {" "}
                      Submit to DB{" "}
                    </Button>
                  </>
                ) : (
                  <Flex flexDir={"column"}>
                    <Button
                      className="userMemesButtons"
                      backgroundColor={"black"}
                      color={"white"}
                      _hover={{
                        color: "black",
                        backgroundColor: "yellow",
                      }}
                      onClick={() => {
                        setToggleSave((prevState) => !prevState);
                      }}
                    >
                      {" "}
                      Cancel{" "}
                    </Button>
                    <Flex flexDir={"column"}>
                      <Button
                        className=""
                        backgroundColor={"black"}
                        color={"white"}
                        _hover={{
                          color: "black",
                          backgroundColor: "yellow",
                        }}
                        onClick={() => {
                          onSubmit(
                            props.imgSrc,
                            props.initialUrl,
                            props._api_id,
                            alias
                          );
                        }}
                      >
                        {" "}
                        Submit{" "}
                      </Button>
                      <FormLabel>
                        {" "}
                        Enter username to save with image
                        <Input
                          className=""
                          type="text"
                          maxLength="18"
                          pattern="[A-Za-z0-9]"
                          onChange={(e) => setAlias(e.target.value)}
                          background={"rgb(236, 236, 236)"}
                          title="Attach alias/username to image or press enter to skip"
                          placeholder={`${
                            alias || `A-Z and 0-9 (press submit to skip)`
                          }`}
                        />
                      </FormLabel>
                    </Flex>
                  </Flex>
                )}
              </Box>
            </Box>
          ) : (
            <div className="">
              <p className="">
                Local ID: '{props.tempID}'{/* created: {props.created}{" "} */}
              </p>
              <img src={imgEditable.imgSrc} alt="editableImage" />
              <span className="">
                <Button
                  className=""
                  backgroundColor={"black"}
                  color={"white"}
                  _hover={{
                    color: "black",
                    backgroundColor: "yellow",
                  }}
                  onClick={() => setToggleEdit((prevState) => !prevState)}
                >
                  cancel
                </Button>
                <Button
                  className=""
                  backgroundColor={"black"}
                  color={"white"}
                  _hover={{
                    color: "black",
                    backgroundColor: "yellow",
                  }}
                  onClick={(e) => handleEdit(e, props.tempID)}
                >
                  save
                </Button>
                <Button
                  className=""
                  backgroundColor={"black"}
                  color={"white"}
                  _hover={{
                    color: "black",
                    backgroundColor: "yellow",
                  }}
                  onClick={() => deleteMeme(props.tempID)}
                >
                  delete
                </Button>
                <input
                  required
                  className=""
                  name="topText"
                  placeholder="Replacement text one"
                  value={inputs.topText}
                  onChange={handleChangeEdit}
                />
                <input
                  required
                  className=""
                  name="bottomText"
                  placeholder="Replacement text two"
                  value={inputs.bottomText}
                  onChange={handleChangeEdit}
                />
              </span>
            </div>
          )}
        </Box>
      ) : (
        <LoadingComp />
      )}
    </>
  );
}

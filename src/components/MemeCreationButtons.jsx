import React, { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import axios from "axios";
import { BiSave, BiShuffle } from "react-icons/bi";
import { imgFlipAxios } from "../context/appContext";

export default function MemeCreationButtons({
  getRandom,
  inputs,
  topText,
  bottomText,
  _api_id,
}) {
  const [toggleButtons, setToggleButtons] = useState(false);

  const toggleButtonView = () => {
    setToggleButtons((prevState) => !prevState);
  };

  const onSubmit = async () => {
    const res = await imgFlipAxios(process.env.REACT_APP_POST_URL, {
      method: "POST",
      params: {
        username: process.env.REACT_APP_USERNAME,
        password: process.env.REACT_APP_PASSWORD,
        font: "arial",
        text0: topText,
        text1: bottomText,
        template_id: _api_id,
      },
    });
    console.log("response from submission", res);
  };

  return (
    <Box
      className="buttonContainer"
      as="span"
      display={"flex"}
      flexDir={"row"}
      gap={"1.5"}
      maxWidth={"360px"}
      width={"auto"}
      flexWrap={"wrap"}
      height={"auto"}
      justifyContent={"space-evenly"}
    >
      {!toggleButtons ? (
        <>
          <Button
            justifyContent={"space-evenly"}
            mt={"1"}
            type="button"
            onClick={getRandom}
            width={"165px"}
            backgroundColor={"black"}
            color={"white"}
            _hover={{
              color: "black",
              backgroundColor: "yellow",
            }}
          >
            <BiShuffle />
            Randomize
          </Button>
          <Button
            onClick={toggleButtonView}
            justifyContent={"space-evenly"}
            mt={"1"}
            width={"165px"}
            backgroundColor={"black"}
            color={"white"}
            _hover={{
              color: "black",
              backgroundColor: "yellow",
            }}
          >
            <BiSave />
            Preview
          </Button>
        </>
      ) : (
        <>
          <Button
            mt={"1"}
            type="button"
            onClick={getRandom}
            width={"165px"}
            backgroundColor={"black"}
            color={"white"}
            _hover={{
              color: "black",
              backgroundColor: "yellow",
            }}
          >
            <BiShuffle />
            Save to Clipboard
          </Button>
          <Button
            onClick={onSubmit}
            mt={"1"}
            width={"165px"}
            backgroundColor={"black"}
            color={"white"}
            _hover={{
              color: "black",
              backgroundColor: "yellow",
            }}
          >
            <BiSave />
            Save Locally
          </Button>
        </>
      )}
    </Box>
  );
}

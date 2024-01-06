import React, { useState, useContext } from "react";
import { Box, Button } from "@chakra-ui/react";
// import axios from "axios";
import { BiSave, BiShuffle } from "react-icons/bi";
import { AppContext } from "../context/appContext";
import { useForm } from "../utils/hooks";

export default function MemeCreationButtons(props) {
  const { setErrors, isLoading } = useContext(AppContext);
  const [toggleButtons, setToggleButtons] = useState(false);

  const toggleButtonView = (e) => {
    e.preventDefault();
    props.handlePreviewSubmit(e);
    setToggleButtons((prevState) => !prevState);
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
            onClick={props.getRandom}
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
            onClick={props.getRandom}
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
            onClick={props.addMemeCallback}
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
            Post
          </Button>
        </>
      )}
    </Box>
  );
}

import React, { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { BiSave, BiShuffle } from "react-icons/bi";

export default function MemeCreationButtons(props) {
  const [toggleButtons, setToggleButtons] = useState(false);

  const toggleButtonView = (e) => {
    e.preventDefault();
    props.handlePreviewSubmit(e);
    setToggleButtons((prevState) => !prevState);
  };

  return (
    <Box
      as="span"
      width={"100%"}
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"center"}
      gap={"2vw"}
    >
      {!toggleButtons ? (
        <>
          <Button
            onClick={props.getRandom}
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
            onClick={props.getRandom}
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

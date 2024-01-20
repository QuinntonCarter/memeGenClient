import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { BiSave, BiShuffle, BiTrash } from "react-icons/bi";

export default function MemeCreationButtons(props) {
  function toggleButtonView(e) {
    e.preventDefault();
    props.handlePreviewSubmit(e);
    props.setToggleButtons((prevState) => !prevState);
  }

  function resetForm() {
    props.setNewMeme({});
    props.setToggleButtons(false);
  }

  return (
    <Box
      as="span"
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
      gap={"2ch"}
      className="creationButtonsContainer"
    >
      {!props.toggleButtons ? (
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
          <Button
            onClick={resetForm}
            backgroundColor={"black"}
            color={"white"}
            _hover={{
              color: "black",
              backgroundColor: "yellow",
            }}
          >
            <BiTrash />
            Reset
          </Button>
        </>
      )}
    </Box>
  );
}

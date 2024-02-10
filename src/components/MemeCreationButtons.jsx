import React from "react";
import { BiSave, BiShuffle, BiTrash } from "react-icons/bi";

export default function MemeCreationButtons(props) {
  function toggleButtonView(e) {
    e.preventDefault();
    console.log("toggle button view");
    props.onSubmit(e);
    props.setToggleButtons(true);
  }

  function resetForm() {
    props.setNewMeme({});
    props.setToggleButtons(false);
  }

  function handleClipboardCopy() {
    navigator.clipboard.writeText(props.newMeme.imgSrc);
  }

  return (
    <div className="creationButtonsContainer">
      {!props.toggleButtons ? (
        <>
          <button onClick={toggleButtonView}>
            <BiSave />
            Preview
          </button>
          <button onClick={props.getRandom}>
            <BiShuffle />
            Randomize
          </button>
        </>
      ) : (
        <>
          <button onClick={props.addMemeCallback}>
            <BiSave />
            Post
          </button>
          <button onClick={resetForm}>
            <BiTrash />
            Reset
          </button>
          <button onClick={handleClipboardCopy} className="clipboardButton">
            <BiShuffle />
            Save to Clipboard
          </button>
        </>
      )}
    </div>
  );
}

import React from "react";
import { BiSave, BiShuffle, BiTrash } from "react-icons/bi";

export default function MemeCreationButtons(props) {
  function toggleButtonView(e) {
    e.preventDefault();
    // props.handlePreviewSubmit(e);
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
          <button onClick={props.getRandom}>
            <BiShuffle />
            Randomize
          </button>
          <button type="submit" onClick={toggleButtonView}>
            <BiSave />
            Preview
          </button>
        </>
      ) : (
        <>
          <button onClick={handleClipboardCopy} className="clipboardButton">
            <BiShuffle />
            Save to Clipboard
          </button>
          <button onClick={props.addMemeCallback}>
            <BiSave />
            Post
          </button>
          <button onClick={resetForm}>
            <BiTrash />
            Reset
          </button>
        </>
      )}
    </div>
  );
}

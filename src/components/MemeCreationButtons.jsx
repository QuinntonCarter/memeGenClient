import React from "react";
import { BiSave, BiShuffle, BiTrash } from "react-icons/bi";

export default function MemeCreationButtons(props) {
  function toggleButtonView(e) {
    e.preventDefault();
    props.onSubmit(e);
  }

  function resetForm(e) {
    e.preventDefault();
    // reset preview meme
    props.setNewMeme({});
    // reset toggle buttons
    props.setToggleButtons(false);
    // reset input values
    props.setValues(props.initInputs);
  }

  function handleClipboardCopy(e) {
    e.preventDefault();
    navigator.clipboard.writeText(props.newMeme.imgSrc);
    alert("Saved meme's link to clipboard!");
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

import { useContext } from "react";
import { AppContext } from "../context/appContext";

export default function MemesView() {
  const { getCreatedMemes, memes } = useContext(AppContext);
  console.log("meme date", memes.created);
  const mappedMemes = memes
    ? memes
        .map((meme) => (
          <div
            className=""
            key={meme._id}
          >
            <h5 className="">
              {" "}
              Created {meme.created.slice(0, 10)} by '
              {meme.alias || meme._id.slice(14)}'
            </h5>
            <img
              className=""
              src={meme.imgSrc}
              alt={`user meme: ${meme._id}`}
            />
          </div>
        ))
        .reverse()
    : getCreatedMemes();

  return mappedMemes ? (
    <div className="">{mappedMemes}</div>
  ) : (
    <h4> Memes will display here </h4>
  );
}

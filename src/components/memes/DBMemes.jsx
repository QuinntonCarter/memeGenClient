import { useContext, useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { MdOutlineBrokenImage } from "react-icons/md";
import { AppContext } from "../../context/appContext";

export default function DBMemes({ id, imgSrc, created, endOfMemeArray }) {
  const { setIsLoading, setErrors } = useContext(AppContext);
  const [missing, setMissing] = useState(false);

  // check if date object is valid
  const date = dayjs(created).format("MM-DD-YY hh:mmA");
  const formatDateForMobile = date !== "Invalid Date" ? date : created;
  // on mount, check meme for error
  useEffect(() => {
    (async function checkMemeAvailaibility() {
      setIsLoading(true);
      await axios
        .get(imgSrc)
        // if get response, leave missing state as false
        .then((response) => {
          setMissing((prevState) => prevState);
        })
        // if error response, setMissing(true)
        .catch((error) => {
          // maybe setup so small error modal returns # of missing memes
          setMissing(true);
          // setErrors(error);
        });
    })();
    // set isLoading state to false if at end of array
    if (endOfMemeArray) {
      setIsLoading(false);
    }
  }, []);

  // if meme not missing, return component otherwise return null
  return !missing ? (
    <div className="dbMemeContainer">
      <h3 className="dbMemeInfo" title={formatDateForMobile}>
        {`Posted on ${formatDateForMobile}`}
      </h3>
      <img
        className="dbMemeImg"
        src={imgSrc}
        alt={`user meme: ${id}`}
        fallback={<MdOutlineBrokenImage title="Missing Image" />}
      />
    </div>
  ) : null;
}

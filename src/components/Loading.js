import { Image } from "@chakra-ui/react";
import Trollface from "../images/Trollface.js";

const LoadingComp = () => {
  return (
    <div className="">
      <Image
        className=""
        alt="Loading..."
        src={Trollface}
      />
    </div>
  );
};

export default LoadingComp;

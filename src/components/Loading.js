import { useContext } from "react";
import { Spinner } from "@chakra-ui/react";
import { AppContext } from "../context/appContext";

const LoadingComp = () => {
  const { setIsLoading } = useContext(AppContext);
  // useEffect(() => {}, [loading]);
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  return <Spinner />;
};

export default LoadingComp;

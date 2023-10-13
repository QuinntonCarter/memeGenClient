import { useContext } from "react";
import { Spinner } from "@chakra-ui/react";
import { AppContext } from "../context/appContext";

const LoadingComp = () => {
  const { isLoading, setIsLoading } = useContext(AppContext);
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  return isLoading && <Spinner />;
};

export default LoadingComp;

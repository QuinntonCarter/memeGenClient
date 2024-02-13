import { useContext } from "react";
import { Spinner } from "@chakra-ui/react"; // import loader from somewhere
import { AppContext } from "../context/appContext";

const LoadingComp = ({ error, loading }) => {
  const { isLoading, errors } = useContext(AppContext);

  if (loading || isLoading)
    return (
      <div className="loaderContainer">
        <Spinner />
      </div>
    );
  if (error || errors) return <p>Please try reloading</p>;
};

export default LoadingComp;

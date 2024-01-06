import { useContext } from "react";
import { Container, Spinner } from "@chakra-ui/react";
import { AppContext } from "../context/appContext";

const LoadingComp = ({ error, loading }) => {
  const { isLoading, errors } = useContext(AppContext);
  // refactor ** CENTER LOADER IN CONTAINER
  if (loading || isLoading)
    return (
      <Container>
        <Spinner />
      </Container>
    );
  if (error || errors)
    return (
      <p>
        Please try reloading
        {console.log(error)}
        {errors.map(({ graphQLErrors }, i) => (
          <p> {graphQLErrors.message} </p>
        ))}
      </p>
    );
};

export default LoadingComp;

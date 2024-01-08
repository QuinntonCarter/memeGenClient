import { useContext } from "react";
import { Container, Spinner } from "@chakra-ui/react";
import { AppContext } from "../context/appContext";

const LoadingComp = ({ error, loading }) => {
  const { isLoading, errors } = useContext(AppContext);

  if (loading || isLoading)
    return (
      <Container display={"flex"} justifyContent={"center"}>
        <Spinner />
      </Container>
    );
  if (error || errors)
    return (
      <p>
        Please try reloading
        {errors.map(({ graphQLErrors }, i) => (
          <p> {graphQLErrors.message} </p>
        ))}
      </p>
    );
};

export default LoadingComp;

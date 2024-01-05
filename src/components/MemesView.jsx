import { useContext } from "react";
import { AppContext } from "../context/appContext";
import { Box } from "@chakra-ui/react";
import DBMemes from "./memes/DBMemes.jsx";
import LoadingComp from "./Loading";
import { GET_MEMES } from "../queries/meme";
import { useQuery } from "@apollo/client";

export default function MemesView() {
  const { setErrors, isLoading } = useContext(AppContext);
  const { loading, data, error } = useQuery(GET_MEMES, {
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors); // mappable **
    },
  });

  if (loading || isLoading || error) {
    return <LoadingComp error={error} loading={loading} />;
  } else {
    return (
      <Box className="memesView">
        {data.memes
          .map((meme, i) => (
            <DBMemes
              endOfMemeArray={data.memes.length - 1}
              alias={meme.alias}
              id={meme.id}
              imgSrc={meme.imgSrc}
              index={i}
              key={meme.id}
            />
          ))
          .reverse()}
      </Box>
    );
  }
}

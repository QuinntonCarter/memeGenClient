import { useContext } from "react";
import { AppContext } from "../context/appContext";
import { Text, Wrap } from "@chakra-ui/react";
import DBMemes from "./memes/DBMemes.jsx";
import LoadingComp from "./Loading";
import { GET_MEMES } from "../queries/meme";
import { useQuery } from "@apollo/client";

export default function MemesView() {
  const { setErrors, isLoading } = useContext(AppContext);
  const { loading, data, error } = useQuery(GET_MEMES, {
    onError(error) {
      console.log(error); // mappable **
    },
  });

  // if (loading || isLoading || error) {
  //   return <LoadingComp error={error} loading={loading} />;
  // } else {
  return (
    <Wrap
      margin={"auto"}
      justify={"center"}
      spacing={"0.5em"}
      pt={"12px"}
      pb={"12px"}
    >
      <Text as="h5"> Under construction: server issues </Text>
      {/* {data.memes
          .map((meme, i) => (
            <DBMemes
              {...meme}
              endOfMemeArray={data.memes.length - 1}
              key={meme.id}
              index={i}
            />
          ))
          .reverse()} */}
    </Wrap>
  );
  // }
}

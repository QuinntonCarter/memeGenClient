import { Box, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box
      title="Whatchumeme? Meme generator"
      width={"100%"}
      height={"5ch"}
      background={"white"}
      display={"flex"}
      flexWrap={"wrap"}
      justifyContent={"center"}
      alignContent={"center"}
    >
      <Text
        width={"auto"}
        display={"inline-block"}
        fontWeight={"600"}
        fontSize={"larger"}
      >
        Whatchumeme? Meme Generator
      </Text>
    </Box>
  );
};

export default Header;

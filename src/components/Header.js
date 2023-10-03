import { Box, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box
      title="Whatchumeme? Meme generator"
      display="flex"
      flexWrap="wrap"
      height="50px"
      alignContent="center"
    >
      <Text
        as="h1"
        className=""
      >
        {" "}
        Whatchumeme?{" "}
      </Text>
    </Box>
  );
};

export default Header;

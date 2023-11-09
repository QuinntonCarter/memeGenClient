import { Box, Icon, Image, Text } from "@chakra-ui/react";

export default function IconText({ Icon, children, svg = false }) {
  return (
    <Box
      as="span"
      display={"inline-flex"}
      alignItems={"center"}
      color={"rgb(83, 100, 113)"}
    >
      <Text>{children}</Text>
    </Box>
  );
}

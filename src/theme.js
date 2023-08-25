import { extendTheme } from "@chakra-ui/react";
import Button from "./reuseableComponents/Button.js";
import FormLabel from "./reuseableComponents/FormLabel.js";

export const theme = extendTheme({
  components: {
    Button,
    FormLabel,
  },
});

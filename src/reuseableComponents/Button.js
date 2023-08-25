import { defineStyleConfig } from "@chakra-ui/react";

const Button = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {
    fontWeight: "bold",
    textTransform: "capitalize",
    borderRadius: "base", // <-- border radius is same for all variants and sizes
    alignItems: "center",
    gap: "1.5",
  },
  // // Two sizes: sm and md
  // sizes: {
  //   sm: {
  //     fontSize: "sm",
  //     px: 4, // <-- px is short for paddingLeft and paddingRight
  //     py: 3, // <-- py is short for paddingTop and paddingBottom
  //   },
  //   md: {
  //     fontSize: "md",
  //     px: 6, // <-- these values are tokens from the design system
  //     py: 4, // <-- these values are tokens from the design system
  //   },
  // },
  // // Two variants: outline and solid
  // variants: {
  //   outline: {
  //     border: "2px solid",
  //     borderColor: "purple.500",
  //     color: "purple.500",
  //   },
  //   solid: {
  //     bg: "purple.500",
  //     // color: "red",
  //   },
  // },
  // The default size and variant values
  // defaultProps: {
  //   size: "md",
  //   variant: "outline",
  // },
});
export default Button;

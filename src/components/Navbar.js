// import { PlusCircleIcon } from "@heroicons/react/outline";
// import { ViewListIcon } from "@heroicons/react/outline";
import {
  Box,
  Flex,
  Tab,
  TabList,
  Tabs,
  VisuallyHidden,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const bg = useColorModeValue("white", "gray.800");
  return (
    <nav className="">
      <Box
        shadow="md"
        bg={bg}
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          mx={2}
          borderWidth={0}
          overflowX="auto"
        >
          <Tabs
            defaultIndex={0}
            borderBottomColor="transparent"
          >
            <TabList>
              <Tab
                py={4}
                m={0}
                _focus={{
                  boxShadow: "none",
                }}
              >
                <Link
                  to="/"
                  className=""
                >
                  Create
                </Link>
              </Tab>
              <Tab
                py={4}
                m={0}
                _focus={{
                  boxShadow: "none",
                }}
              >
                <Link
                  to="/memes"
                  className=""
                >
                  View All
                </Link>
              </Tab>
            </TabList>
          </Tabs>
        </Flex>
      </Box>
    </nav>
  );
}

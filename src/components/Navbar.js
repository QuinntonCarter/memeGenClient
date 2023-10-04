// import { PlusCircleIcon } from "@heroicons/react/outline";
// import { ViewListIcon } from "@heroicons/react/outline";
import { useEffect } from "react";
import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import MemesView from "./MemesView";
import MemeGenerator from "./MemeGen";

export default function Navbar({ routeOne, routeTwo }) {
  const bg = useColorModeValue("white", "gray.800");
  let { pathname } = useLocation();

  useEffect(() => {
    console.log("test params", pathname);
  }, [pathname]);

  return (
    <nav className="">
      <Box shadow="md" bg={bg}>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          mx={2}
          borderWidth={0}
          overflowX="auto"
        >
          <Tabs defaultIndex={0} borderBottomColor="transparent">
            <TabList>
              {/* <Link to="/" className=""> */}
              <Tab
                py={4}
                m={0}
                _focus={{
                  boxShadow: "none",
                }}
              >
                Create
              </Tab>
              {/* </Link> */}
              {/* <Link to="/memes" className=""> */}
              <Tab
                py={4}
                m={0}
                _focus={{
                  boxShadow: "none",
                }}
              >
                View All
              </Tab>
              {/* </Link> */}
            </TabList>
            <TabPanels>
              <TabPanel>{<MemeGenerator />}</TabPanel>
              <TabPanel>{<MemesView />}</TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Box>
    </nav>
  );
}

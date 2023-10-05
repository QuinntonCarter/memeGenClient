// import { PlusCircleIcon } from "@heroicons/react/outline";
// import { ViewListIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  TabIndicator,
  TabList,
  Tabs,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import MemesView from "./MemesView";
import MemeGenerator from "./MemeGen";

export default function Navbar() {
  const bg = useColorModeValue("white", "gray.800");
  const [tabIndex, setTabIndex] = useState();
  const styles = useColorModeValue(
    ["red.50", "teal.50", "blue.50"],
    ["red.900", "teal.900", "blue.900"]
  );
  let styleTest = styles[tabIndex];
  let { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("test params", pathname);
  }, [pathname]);
  // ** changing the tabs consistently (as far as i can see)
  // but not changing params to selection on every tab change **

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
          <Tabs
            defaultIndex={0}
            borderBottomColor="transparent"
            onChange={(index) => setTabIndex(index)}
          >
            <TabList>
              <NavLink to={"/"} tabindex={0}>
                <Tabs py={4} m={0}>
                  Create
                </Tabs>
              </NavLink>
              <NavLink to={"memes"} tabindex={0}>
                <Tabs py={4} m={0}>
                  View All
                </Tabs>
              </NavLink>
            </TabList>
            <TabIndicator bg="red.200" />
          </Tabs>
        </Flex>
      </Box>
    </nav>
  );
}

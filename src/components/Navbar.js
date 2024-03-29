import { useEffect, useState } from "react";
import { TabList, Tabs } from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const [tabIndex, setTabIndex] = useState();

  let { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/") {
      setTabIndex(0);
    } else if (pathname === "/memes") {
      setTabIndex(1);
    }
  }, [pathname]);

  return (
    <nav className="navbar">
      <Tabs defaultIndex={tabIndex}>
        <TabList border={"none"}>
          <NavLink
            to={"/"}
            tabIndex={0}
            onMouseOver={() => setTabIndex(0)}
            onMouseOut={() => setTabIndex(pathname === "/" ? 0 : 1)}
            onFocus={() => setTabIndex(0)}
            onBlur={() => setTabIndex(pathname === "/" ? 0 : 1)}
            style={{
              padding: "0.7em",
              color: tabIndex === 0 && "white",
              backgroundColor: tabIndex === 0 && "black",
              fontWeight: tabIndex === 0 && "bold",
              transition: "background-color 0.2s, color .2s",
            }}
          >
            Create
          </NavLink>

          <NavLink
            to={"/memes"}
            tabIndex={0}
            onMouseOver={() => setTabIndex(1)}
            onMouseOut={() => setTabIndex(pathname === "/memes" ? 1 : 0)}
            onFocus={() => setTabIndex(1)}
            onBlur={() => setTabIndex(pathname === "/memes" ? 1 : 0)}
            style={{
              padding: "0.7em",
              color: tabIndex === 1 && "white",
              backgroundColor: tabIndex === 1 && "black",
              fontWeight: tabIndex === 1 && "bold",
              transition: "background-color 0.2s, color .2s",
            }}
          >
            View All
          </NavLink>
        </TabList>
      </Tabs>
    </nav>
  );
};

export default Navbar;

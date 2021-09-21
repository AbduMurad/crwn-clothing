import React from "react";
import DirectoryMenu from "../../components/directory-menu/directory-menu.component";
import { HomepageComponent } from "./homepage.styles";

const Homepage = () => {
  return (
    <HomepageComponent>
      <DirectoryMenu />
    </HomepageComponent>
  );
};

export default Homepage;

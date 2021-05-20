import React, { useState } from "react";

import Header from "../Header/Header";
import Searchpage from "../Searchpage/SearchPage";

const Homepage = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showCat, setShowCat] = useState(false);
  const [userToken, setUserToken] = useState("");

  // if (isSearchVisible)
  // setShowCat(false);

  return (
    <React.Fragment>
      <Header
        setIsSearchVisible={setIsSearchVisible}
        isSearchVisible={isSearchVisible}
        showCat={showCat}
        userToken={userToken}
        setUserToken={setUserToken}
        setShowCat={setShowCat}
      />

      <Searchpage
        showCat={showCat}
        userToken={userToken}
        setIsSearchVisible={setIsSearchVisible}
        isSearchVisible={isSearchVisible}
        isSearching={isSearching}
        setIsSearching={setIsSearching}
      />
    </React.Fragment>
  );
};

export default Homepage;

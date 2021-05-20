import React, { useState } from "react";

// Import icons
import { IconArmani } from "../../assets/icons";
import Select from "react-select";

import { Link } from "react-router-dom";

const options = [
  { value: "kassim", label: "Kassim" },
  { value: "yixuan", label: "Yixuan" },
  { value: "", label: "None" },
];

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    width: state.selectProps.width,
    borderBottom: "1px dotted pink",
    color: state.selectProps.menuColor,
    padding: 20,
    textAlign: "center",
  }),

  control: (_, { selectProps: { width } }) => ({
    width: width,
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 400ms";

    return { ...provided, opacity, transition };
  },
};

const DummyHeader = ({ userToken, setUserToken }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const switchPersoToken = (selectedOption) => {
    setSelectedOption(selectedOption);
    setUserToken(selectedOption.value);
  };

  return (
    <div
      className="header"
      style={{
        backgroundColor: "white",
        position: "sticky",
        top: "0px",
        left: "0px",
      }}
    >
      <div className="header-logo">
        <Link to="/">
          <IconArmani />
        </Link>
      </div>
      <div className="header-cats">
        <div className="header-cats-item">
          <span style={{ color: "red" }}>SALDI</span>
          <div className="header-cats-item-box"></div>
        </div>

        <div className="header-cats-item">
          <span>Donna</span>
          <div className="header-cats-item-box"></div>
        </div>

        <div className="header-cats-item">
          <span>Unisex</span>
          <div className="header-cats-item-box"></div>
        </div>

        <div className="header-cats-item">
          <span>Uomo</span>
          <div className="header-cats-item-box"></div>
        </div>

        <div className="header-cats-item">
          <span>Bambino</span>
          <div className="header-cats-item-box"></div>
        </div>

        <div className="header-cats-item">
          <span>Casa</span>
          <div className="header-cats-item-box"></div>
        </div>

        <Select
          options={options}
          value={selectedOption}
          onChange={switchPersoToken}
          styles={customStyles}
          width="250px"
        />
      </div>
    </div>
  );
};

export default DummyHeader;

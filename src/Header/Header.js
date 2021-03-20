import React from "react";
import styles from "./Header.module.css";
import HeaderLeft from "./HeaderLeft";
import HeaderMiddle from "./HeaderMiddle";
import HeaderRight from "./HeaderRight";

export default function Header() {
  return (
    <div className={`${styles.header} secondary_bg`}>
      <HeaderLeft />
      <HeaderMiddle />
      <HeaderRight />
    </div>
  );
}

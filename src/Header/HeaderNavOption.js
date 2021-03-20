import React, { useState } from "react";
import styles from "./Header.module.css";

export default function HeaderNavOption({ startingState, outline, filled }) {
  let [selected, setSelected] = useState(startingState);

  return (
    <li onClick={() => setSelected(true)} className={selected && styles.selected}>
      {selected ? filled : outline}
    </li>
  );
}

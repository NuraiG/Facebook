import React from "react";
import Tooltip from "@material-ui/core/Tooltip";

import styles from "./Header.module.scss";

export default function HeaderNavOption({ selected, outline, filled, tooltip, onClick, className }) {
  return (
    <Tooltip title={tooltip} placement="bottom">
      <div onClick={onClick} className={`${className} ${selected ? (styles.selected) : ""}`}>
        {selected ? filled : outline}
      </div>
    </Tooltip>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";

import styles from "./Header.module.scss";

export default function HeaderNavOption({
  selected,
  outline,
  filled,
  tooltip,
  onClick,
  className,
  linkTo
}) {
  return (
    <Tooltip title={tooltip} placement="bottom">
      <Link to={linkTo || "/"}>
        <div
          onClick={onClick}
          className={`${className} ${selected ? styles.selected : ""}`}
        >
          {selected ? filled : outline}
        </div>
      </Link>
    </Tooltip>
  );
}

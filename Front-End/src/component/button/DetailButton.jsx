import React from "react";
import { Link } from "react-router-dom";
import DetailBranch from "../branch/DetailBranch";

export default function DetailButton(props) {
  const handleClick = () => <DetailBranch id={props.id} url={props.url} />;
  return (
    <div className="genric-btn" style={{ padding: "0px" }}>
      <Link
        as={Link}
        className="dropdown-item"
        to={`/${props.url}/${props.id}`}
        style={{ paddingLeft: "0px" }}
      >
        <button className="genric-btn primary radius" onClick={handleClick}>
          <i className="fa fa-eye" aria-hidden="true"></i>
        </button>
      </Link>
    </div>
  );
}

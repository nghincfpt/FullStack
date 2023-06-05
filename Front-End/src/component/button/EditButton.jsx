import React from "react";
import { Link } from "react-router-dom";
import EditBranch from "../branch/EditBranch";

export default function EditButton(props) {
  return (
    <div className="genric-btn" style={{ padding: "0px" }}>
      <Link
        as={Link}
        className="dropdown-item"
        to={`/${props.url}/${props.id}`}
      >
        <div className="genric-btn success radius">
          <i className="fas fa-pencil-alt"></i>
        </div>
      </Link>
    </div>
  );
}

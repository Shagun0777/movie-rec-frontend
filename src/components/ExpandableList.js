import "./../App.css";
import React, { useState, useEffect } from "react";
import Movies from "./Movies";
import { BsChevronDoubleDown } from "react-icons/bs";
import { BsChevronDoubleUp } from "react-icons/bs";
import { HiOutlineExternalLink } from "react-icons/hi";

const ExpandableList = ({ data, header }) => {
  // const [isActive, setIsActive] = useState(false);

  return (
    <div className="accordion-item">
      <div
        className="accordion-title"
        style={{ color: "black", backgroundColor: "silver" }}
      >
        <h3>{header}</h3>

      </div>
      {(
        <div className="accordion-content">{<Movies list_movies={data} />}</div>
      )}
  
    </div>
  );
};

export default ExpandableList;

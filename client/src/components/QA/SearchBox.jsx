import React, { useState } from "react";
import style from "./QuestionList.module.css";

const SearchBox = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    let term = event.target.value;

    setSearchTerm(term);

    props.searchQuestionList(term);
  };

  return (
    <div>
      <div className={style.searchBoxSection}>
        <input
          className={style.searchBar}
          type="text"
          placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
          onChange={handleSearch}
        ></input>
        <div style={{ marginTop: "15px" }}>
          <i className="fas fa-search"></i>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;

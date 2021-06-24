import React from "react";
import style from "../QA/QuestionList.module.css";

const Search = (props) => {
  return (
    <div>
      <div className={style.searchBoxSection}>
        <input
          className={style.searchBar}
          type="text"
          placeholder="SEARCH REVIEWS"
          onChange={(e) => props.handleSearch(e)}
        ></input>
        <div style={{ marginTop: "15px" }}>
          <i className="fas fa-search"></i>
        </div>
      </div>
    </div>
  );
};

export default Search;

import React, { useState } from "react";
import styles from ".././style.css";

const Navbar = (props) => {
  return (
    <div>
      <div className={styles.topSearchBar}>
        <div className={styles.fireLogo}>
          <i className="fas fa-fire"></i>
        </div>
        
        <div className={styles.searchInput} type="text"></div>
       
        <div className={styles.searchBarIcon}>
          <i className="fas fa-search"></i>
        </div>
        <div className={props.darkModeStyle} onClick={props.toggleDarkMode}>
          {props.darkModeText}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

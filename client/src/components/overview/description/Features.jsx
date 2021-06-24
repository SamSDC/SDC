import React from "react";
import style from "../MainOverview.module.css";

const Features = ({ prod }) => {
  // create checkmarks before each feature
  return (
    <div>
      <div className={style.features}>
        {prod &&
          prod.features.map((item, i) => {
            return (
              <div key={i}>
                <svg
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fillRule="evenodd"
                  clipRule="evenodd"
                >
                  <path d="M24 6.278l-11.16 12.722-6.84-6 1.319-1.49 5.341 4.686 9.865-11.196 1.475 1.278zm-22.681 5.232l6.835 6.01-1.314 1.48-6.84-6 1.319-1.49zm9.278.218l5.921-6.728 1.482 1.285-5.921 6.756-1.482-1.313z" />
                </svg>
                {item.feature}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Features;

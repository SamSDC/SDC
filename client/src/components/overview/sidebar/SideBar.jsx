import React from "react";
import style from "../MainOverview.module.css";
import Star from '../../reviews/Stars.jsx'
const SideBar = ({ prices, name, category, price, salePrice, prod, meta }) => {

  if (price) {
    price = "$" + price;
  }

  if (salePrice) {
    salePrice = "$" + salePrice;
  }
let average
  if (meta) {
    let sum = 0
    let total = 0
    for (let key in meta.ratings) {
      sum += parseInt(key) * meta.ratings[key]
      total += parseInt(meta.ratings[key])
    }
  average = sum / total
  }

  return (
    <div>
      <a href="#reviews" className={style.reviews}>Read all reviews</a>
      <div> <Star rating={average}/></div>
      <div>{category}</div>
      <div className={style.name}>{name}</div>
    <div><br></br></div>
      <div className={style.defaultPrice}>
        {prices && !price && `$${prod.default_price}`}
      </div>
      <div className={salePrice ? style.changeSale : style.price}>
        {prices && price}
      </div>
      <div className={style.price}>{prices && salePrice}</div>
      
    </div>
  );
};

export default SideBar;

import React, { useState, useRef } from "react";
import style from "../MainOverview.module.css";

const Checkout = ({ product, currentStyles }) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedAmount, setSelectedAmount] = useState([]);
  const [buttonText, setButtonText] = useState("Add to Cart");
  const [amount, setAmount] = useState("");
  const [defaultAmount, setDefaultAmount] = useState("-");
  const [value, setValue] = useState(false);
  const selectDiv = useRef(null)

  const handleSize = (e) => {
    setSelectedSize(e.target.value);
    let count = 1;
    let array = [];
    if (currentStyles) {
      currentStyles.map((item) => {
        if (item.size === e.target.value) {
          while (count <= item.quantity) {
            if (count <= 15) {
              array.push(count);
            }
            count++;
          }
        }
      });
      setAmount("-");
    }
    setValue(true);
    setSelectedAmount(array);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
    setValue(false);
  };

  const handleNoSize = (e) => {
    if(selectDiv.current) {

      selectDiv.current.focus()
    }
    
  };

  const handleButtonText = () => {
    setButtonText("**Added items to cart**");
    setTimeout(() => {
      setValue("false");
      setAmount("");
      setSelectedSize("");
      setButtonText("Add to Cart");
      setDefaultAmount("-");
    }, 1500);
  };

  return (
    <div>
      <br></br>
      <div>
        <select
           ref={selectDiv}
          value={selectedSize}
          className={style.buttons}
          onChange={(e) => {
            handleSize(e);
          }}
        >
          <option 
          
          
          value=''  >
            Select Size
          </option>
          {currentStyles &&
            currentStyles.map((item, i) => (
              <option key={i}>{item.size ? item.size : "OUT OF STOCK"}</option>
            ))}
        </select>

        <select
        value={amount}
          className={style.buttoner}
          onChange={(e) => {
            handleAmount(e);
          }}
        >
        
          <option value="" >
            {defaultAmount}
          </option>
          {currentStyles &&
            selectedAmount.map((current, i) => (
              <option key={i}> {amount ? current : amount} </option>
            ))}
        </select>
      </div>
      <br></br>
      <div>
        {!selectedSize || value ? (
          <button
            className={style.cart}
            
            onClick={(e) => handleNoSize(e)}
          >
            Select Size
          </button>
        ) : (
          <button
            className={style.cart}
            onClick={() => {
              handleButtonText();
            }}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Checkout;

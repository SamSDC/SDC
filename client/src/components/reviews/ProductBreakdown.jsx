import React from "react";
import styles from "./Reviews.module.css";
import Stars from "./Stars.jsx";

class ProductBreakdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var recommended =
      this.props.total === null
        ? null
        : this.props.meta === null
        ? null
        : Number(this.props.meta.recommended.true) / Number(this.props.total) * 100;

    return (
      <div>
        <div>RATINGS & REVIEWS</div>
        <span
          style={{
            fontSize: "60px",
            padding: "10px",
            fontWeight: "bold",
          }}
        >
          {this.props.rounded}
        </span>
        <Stars rating={this.props.rating} />
        <div>{`${Math.floor(
          recommended
        )}% of reviews recommend this product`}</div>
      </div>
    );
  }
}

export default ProductBreakdown;

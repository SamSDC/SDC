import React from "react";
import styles from "./Reviews.module.css";
const selectionMeanings = require('./selectionMeanings.js')

class CharacteristicButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Fit: "",
      Length: "",
      Comfort: "",
      Quality: "",
      Size: "",
      Width: "",
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick(e, characteristic) {
    var val = e.target.value;

    var selection = selectionMeanings[characteristic][val - 1];

    this.setState({
      [characteristic]: selection,
    });
  }

  render() {
    var characteristics = Object.keys(this.props.characteristics);

    var ids = {
      Fit: this.props.characteristics && this.props.characteristics["Fit"],
      Length:
        this.props.characteristics && this.props.characteristics["Length"],
      Comfort:
        this.props.characteristics && this.props.characteristics["Comfort"],
      Quality:
        this.props.characteristics && this.props.characteristics["Quality"],
      Size: this.props.characteristics && this.props.characteristics["Size"],
      Width: this.props.characteristics && this.props.characteristics["Width"],
    };

    var rows = characteristics.map((characteristic) => {
      return (
        <div key={characteristic}>
          <form className={styles.characteristicRow}>
            <span
              style={{ width: "5%", display: "inline-block" }}
            >{`${characteristic}:  `}</span>
            <label className={styles.characteristic}>
              1{" "}
              <input
                type="radio"
                onClick={(e) => {
                  this.props.onClick(e), this.onClick(e, characteristic);
                }}
                value={1}
                name={ids[characteristic].id}
              />
            </label>
            <label className={styles.characteristic}>
              2{" "}
              <input
                type="radio"
                onClick={(e) => {
                  this.props.onClick(e), this.onClick(e, characteristic);
                }}
                value={2}
                name={ids[characteristic].id}
              />
            </label>
            <label className={styles.characteristic}>
              3{" "}
              <input
                type="radio"
                onClick={(e) => {
                  this.props.onClick(e), this.onClick(e, characteristic);
                }}
                value={3}
                name={ids[characteristic].id}
              />
            </label>
            <label className={styles.characteristic}>
              4{" "}
              <input
                type="radio"
                onClick={(e) => {
                  this.props.onClick(e), this.onClick(e, characteristic);
                }}
                value={4}
                name={ids[characteristic].id}
              />
            </label>
            <label className={styles.characteristic}>
              5{" "}
              <input
                type="radio"
                onClick={(e) => {
                  this.props.onClick(e), this.onClick(e, characteristic);
                }}
                value={5}
                name={ids[characteristic].id}
              />
            </label>
          </form>

          {this.state[characteristic] ? (
            <div className={styles.characteristicSelection}>
              {this.state[characteristic]}
            </div>
          ) : (
            <div className={styles.characteristicSelection}>None selected</div>
          )}
        </div>
      );
    });

    return rows;
  }
}

export default CharacteristicButtons;

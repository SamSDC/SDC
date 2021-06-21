import React from "react";
import Modal from "./Modal.jsx";
import styles from "./Reviews.module.css";

class Thumbnail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      clicked: !this.state.clicked,
    });
  }

  render() {
    var modal = this.state.clicked ? (
      <Modal>
        <div className={styles.modal}>
          <img alt='modal-thumbnail' src={`${this.props.source}`} onClick={this.handleClick} />
        </div>
      </Modal>
    ) : null;

    return (
      <div className={styles.thumbnails}>
        {/* <div className={styles.smallImg} onClick={this.handleClick} style={{background: this.props.source ? `url(${this.props.source}') center / cover` : null}}>

        </div> */}
        <img
          height='70'
          width='70'
          alt='review-thumbnail'
          className={styles.smallImg}
          src={`https://cdn.filestackcontent.com/AWs7LcKPWTNKPac9vsWCQz/resize=width:70/${this.props.source}}`}
          onClick={this.handleClick}
        />
        {modal}
      </div>
    );
  }
}

export default Thumbnail;

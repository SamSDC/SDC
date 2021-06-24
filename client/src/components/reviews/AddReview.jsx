import React from "react";
import Modal from "../QA/Modal.jsx";
import styles from "./Reviews.module.css";
import Star from "./Star.jsx";
import CharacteristicButtons from "./CharacteristicButtons.jsx";
import submitForm from "./helpers/submitForm.js";
import characteristicsObj from "./helpers/characteristicsObj.js";
import validateForm from "./helpers/validateForm.js";

class AddReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      fields: {
        summary: "",
        body: "",
        nickname: "",
        email: "",
      },
      recommend: null,
      ratings: [0, 0, 0, 0, 0],
      characteristics: [],
      ratingText: "",
      errors: [],
      images: [],
      submitted: false,
    };
  }

  handleRate(n) {
    var rating = [0, 0, 0, 0, 0];
    var descriptions = ["Poor", "Fair", "Average", "Good", "Great"];
    var description = descriptions[n];

    while (n >= 0) {
      rating[n] = 1;
      n--;
    }

    this.setState({
      ratings: rating,
      ratingText: description,
    });
  }

  handleRateCharacteristic(e) {
    var id = e.target.getAttribute("name");
    var val = e.target.value;

    this.setState({
      characteristics: [...this.state.characteristics, { [id]: Number(val) }],
    });
  }

  handleAdd() {
    this.setState({
      clicked: true,
    });
  }

  handleClose() {
    this.setState({
      clicked: false,
      ratings: [0, 0, 0, 0, 0],
      fields: {
        summary: "",
        body: "",
        nickname: "",
        email: "",
      },
      ratingText: "",
      images: [],
      submitted: false,
      errors: [],
    });
  }

  handleImageUpload(e) {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append(0, file);

    fetch(`/api/reviews/image-upload`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((url) => {
        this.setState({
          images: [...this.state.images, url.secure_url],
        });
      })
      .catch((err) => console.log(err));
  }

  handleChange(field, e) {
    var fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({
      fields,
    });
  }

  handleRecommend(e) {
    if (e.target.value === "Yes") {
      this.setState({
        recommend: true,
      });
    } else {
      this.setState({
        recommend: false,
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    var rating = this.state.ratings.reduce((acc, curr) => acc + curr, 0);
    var id = this.props.meta && this.props.meta.product_id;
    var characteristics = characteristicsObj(this.state.characteristics);

    var form = {
      product_id: id,
      rating: rating,
      summary: this.state.fields.summary,
      body: this.state.fields.body,
      recommend: this.state.recommend,
      name: this.state.fields.nickname,
      email: this.state.fields.email,
      photos: this.state.images,
      characteristics: characteristics,
    };
    if (validateForm(form, this.props.meta).length === 0) {
      this.setState(
        {
          errors: [],
          submitted: true,
        },
        () => submitForm(form)
      );
    } else {
      this.setState({
        errors: validateForm(form, this.props.meta),
      });
    }
  }

  render() {
    var characteristics = this.props.meta && this.props.meta.characteristics;

    var error =
      this.state.errors.length === 0 && this.state.submitted ? (
        <div style={{ color: "#D96C06", margin: "10px" }}>Submitted!</div>
      ) : this.state.errors.length === 0 ? null : (
        <div style={{ color: "red", margin: "10px" }}>
          Error: {this.state.errors[0]}
        </div>
      );

    var images = this.state.images.map((image) => (
      <img alt='add-review-image' key={image} className={styles.smallImg} src={image} />
    ));

    var charsLeft = 50 - this.state.fields["body"].length;

    var minMessage =
      charsLeft > 0
        ? `Minimum required characters left: ${charsLeft}`
        : "Minimum reached.";

    var starRating = this.state.ratings.map((star, index) => {
      return (
        <Star
          rating={star}
          key={index}
          onClick={() => this.handleRate(index)}
        />
      );
    });

    var uploadPhotos =
      this.state.images.length < 5 ? (
        <div>
          <h4 className={styles.formTitle}>Upload your photos </h4>
          <input
            type="file"
            id="single"
            onChange={(e) => this.handleImageUpload(e)}
          />
        </div>
      ) : (
        <div>Maximum number of photos uploaded</div>
      );

    var modal = this.state.clicked ? (
      <Modal size="50%" closeOnClick={() => this.handleClose()}>
        <div>
          <div className={styles.reviewForm}>
            <h2 className={styles.formTitle}>Write Your Review</h2>
            <h3 className={styles.formTitle}>About the {this.props.name}</h3>

            <h4 className={styles.formTitle}>Overall Rating* </h4>
            <span>{starRating}</span>
            <span> {this.state.ratingText}</span>

            <h4 className={styles.formTitle}>Characteristics* </h4>
            <CharacteristicButtons
              characteristics={characteristics}
              onClick={(e) => this.handleRateCharacteristic(e)}
            />
          </div>

          <form
            className={styles.reviewForm}
            name="reviewform"
            onSubmit={(e) => this.handleSubmit(e)}
          >
            <label>
              <h4 className={styles.formTitle}>
                Do you recommend this product?*
              </h4>

              <div onChange={(e) => this.handleRecommend(e)}>
                <input type="radio" value="Yes" name="recommend" />
                Yes
                <input type="radio" value="No" name="recommend" />
                No
              </div>
            </label>

            <label>
              <h4 className={styles.formTitle}>Review summary </h4>

              <input
                className={styles.fields}
                style={{ width: "90%", height: "20px" }}
                type="text"
                placeholder="Example: Best purchase ever!"
                maxLength="60"
                onChange={(e) => this.handleChange("summary", e)}
                value={this.state.fields["summary"]}
              ></input>
            </label>

            <label>
              <h4 className={styles.formTitle}>Review body* </h4>

              <textarea
                className={styles.fields}
                style={{ width: "90%", height: "200px" }}
                type="textarea"
                placeholder="Why did you like the product or not?"
                maxLength="1000"
                onChange={(e) => this.handleChange("body", e)}
                value={this.state.fields["body"]}
              ></textarea>
              <br />

              <div className={styles.formTitle}>{minMessage}</div>
            </label>

            <label>
              <h4 className={styles.formTitle}>Your nickname* </h4>

              <input
                className={styles.fields}
                style={{ width: "90%", height: "20px" }}
                type="text"
                placeholder="Example: jackson11!"
                maxLength="60"
                onChange={(e) => this.handleChange("nickname", e)}
                value={this.state.fields["nickname"]}
              ></input>
              <br />

              <div className={styles.formTitle}>
                For privacy reasons, do not use your full name or email address.
              </div>
            </label>

            <label>
              <h4 className={styles.formTitle}>Your email* </h4>

              <input
                className={styles.fields}
                style={{ width: "90%", height: "20px" }}
                type="text"
                placeholder="Example: jackson11@gmail.com"
                maxLength="60"
                onChange={(e) => this.handleChange("email", e)}
                value={this.state.fields["email"]}
              ></input>
              <br />

              <div className={styles.formTitle}>
                For authentication reasons, you will not be emailed.
              </div>
            </label>

            <label>
              {uploadPhotos}
              <div>{images}</div>
              <br />
            </label>

            <button type="submit">Submit Review</button>
            {error}
          </form>
        </div>
      </Modal>
    ) : null;

    return (
      <div style={{ display: "inline" }}>
        <button
          className={styles.reviewButtons}
          onClick={() => this.handleAdd()}
        >
          ADD A REVIEW
          <span style={{ marginTop: "30px", marginLeft: "10px" }}>
            <i className="fas fa-plus"></i>
          </span>
        </button>
        {modal}
      </div>
    );
  }
}

export default AddReview;

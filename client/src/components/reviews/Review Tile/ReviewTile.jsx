import React, { Suspense } from "react";
import styles from "../Reviews.module.css";
import Thumbnail from "../Thumbnail.jsx";
import Stars from "../Stars.jsx";
import { DateTime } from "luxon";

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRest: false,
      markedHelpful: false,
      reported: false,
      helpful: this.props.review && this.props.review.helpfulness,
    };

    this.showMore = this.showMore.bind(this);
    this.updateHelpfulness = this.updateHelpfulness.bind(this);
    this.markHelpful = this.markHelpful.bind(this);
    this.handleReport = this.handleReport.bind(this);
  }

  showMore() {
    this.setState({
      showRest: !this.state.showRest,
    });
  }

  markHelpful() {
    if (!this.state.markedHelpful) {
      this.setState(
        {
          helpful: this.state.helpful + 1,
          markedHelpful: true,
        },
        this.updateHelpfulness
      );
    }
  }

  handleReport() {
    if (!this.state.reported) {
      this.setState(
        {
          reported: true,
        },
        this.report()
      );
    }
  }

  updateHelpfulness() {
    fetch(`/api/reviews/${this.props.review.review_id}/helpful`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  report() {
    fetch(`/api/reviews/${this.props.review.review_id}/report`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  formatDate() {
    var date =
      this.props.review &&
      new Date(this.props.review.date.replace(/-/g, "/").replace(/T.+/, ""));
    var month = date && date.toLocaleString("us-PT", { month: "long" });
    var formatted = date && date.toDateString().split(" ");
    var day =
      formatted &&
      (formatted[2][0] === "0" ? formatted[2].slice(1) : formatted[2]);
    date = month && day && formatted && `${month} ${day}, ${formatted[3]}`;
    return date;
  }

  render() {
    var date =
      this.props.review &&
      DateTime.fromISO(this.props.review.date, { zone: "utc" }).toFormat("DDD");

    var shortened = this.props.review && this.props.review.body.slice(0, 250);

    var bodyText =
      this.props.review && this.props.review.body.length < 250 ? (
        <div>{this.props.review.body}</div>
      ) : this.state.showRest ? (
        <div>
          <span>{this.props.review.body} </span>
          <span className={styles.showMore} onClick={this.showMore}>
            Show less
          </span>
        </div>
      ) : (
        <div>
          <span>{shortened}</span>
          <span className={styles.showMore} onClick={this.showMore}>
            ...Show more
          </span>
        </div>
      );

    var recommend =
      this.props.review && this.props.review.recommend ? (
        <div style={{ marginBottom: "10px" }}>
          <i className="fas fa-check-circle"></i>
          <span style={{ marginLeft: "10px" }}>I recommend this product</span>
        </div>
      ) : null;

    var response =
      this.props.review && this.props.review.response ? (
        <div className={styles.response}>
          <div style={{ fontWeight: "bold" }}>Response from seller:</div>
          <br />
          <div>{JSON.parse(this.props.review.response)}</div>
        </div>
      ) : null;

    var thumbnails =
      this.props.review &&
      this.props.review.photos.map((photo) => (
        <Thumbnail key={photo.id} source={photo.url} />
      ));

    var reported = this.state.reported ? (
      <span style={{ fontStyle: "italic", fontWeight: "700" }}>Reported!</span>
    ) : (
      <span
        style={{
          textDecoration: "underline",
          cursor: "pointer",
          color: "#d96c06",
          marginLeft: "5px",
        }}
      >
        Report
      </span>
    );

    return (
      <div className={styles.reviewTile}>
        <Stars rating={this.props.review && this.props.review.rating} />
        <div className={styles.userDate}>
          {this.props.review && `${this.props.review.reviewer_name}, ${date}`}
        </div>
        <div className={styles.reviewSummary}>
          {this.props.review && this.props.review.summary}
        </div>
        <div>
          {bodyText}
          <br />
          {recommend}
          {response}
        </div>
        <div>{thumbnails}</div>
        <div style={{ marginTop: "10px", fontSize: "16px" }}>
          <span>Was this review helpful?</span>
          <span
            onClick={this.markHelpful}
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              color: "#d96c06",
              marginLeft: "5px",
              marginRight: "5px",
            }}
          >
            {`Yes (${this.state.helpful})`}
          </span>
          <span onClick={this.handleReport} style={{ marginLeft: "5px" }}>
            | {reported}
          </span>
        </div>
      </div>
    );
  }
}

export default ReviewTile;

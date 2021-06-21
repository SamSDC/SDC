import React from "react";
import styles from "../Reviews.module.css";
import ReviewTile from "../Review Tile/ReviewTile.jsx";
import AddReview from "../AddReview.jsx";
import Search from "../Search.jsx";

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      display: [],
      sort: "relevant",
    };

    this.getReviews = this.getReviews.bind(this);
    this.getMore = this.getMore.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.total !== prevProps.total) {
      this.getReviews();
    }

    if (
      (JSON.stringify(this.props.filters) !== JSON.stringify(prevProps.filters)) ||
      (JSON.stringify(this.props.search) !== JSON.stringify(prevProps.search))
    ) {
      var display = this.filter(this.state.reviews);

      this.setState({
        display: display.slice(0, Math.max(this.state.display.length, 2)),
      });
    }
  }

  filter(reviews) {
    var filters = this.props.filters;
    var searchTerm = this.props.search;
    // No star rating filters, no search term
    if (filters.length === 0 && searchTerm.length < 3) {
      return reviews;
      // Filter by star rating, no search term
    } else if (searchTerm.length < 3 && filters.length > 0) {
      return reviews.filter(
        (review) => filters.indexOf(String(review.rating)) > -1
      );
      // Filter by star rating and search term
    } else if (filters.length > 0) {
      return reviews
        .filter((review) => filters.indexOf(String(review.rating)) > -1)
        .filter((review) =>
          review.body
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
      // Filter by search term, no star rating filters
    } else {
      return reviews.filter((review) =>
        review.body.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  getReviews() {
    fetch(`/api/reviews/meta/${this.props.id}?format=json`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        var total =
          (Number(data.recommended.true) || 0) +
          (Number(data.recommended.false) || 0);
          this.props.handleUpdate(data)
        fetch(
          `/api/reviews/${this.props.id}/${1}/${total}/${
            this.state.sort
          }?format=json`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then((data) =>
            this.setState({
              reviews: data,
              display: this.filter(data).slice(0, 2),
            })
          )
          .catch((err) => console.log("err", err));
      })
      .catch((err) => console.log("err", err));
  }

  getMore() {
    var current = this.state.display.length;
    var reviews = this.filter(this.state.reviews);
    this.setState({
      display: this.state.display.concat(reviews.slice(current, current + 2)),
    });
  }

  handleSort(e) {
    var sort = e.target.value;

    this.setState(
      {
        sort: sort,
      },
      this.getReviews
    );
  }

  render() {
    var reviews = this.state.display.map((review) => (
      <ReviewTile key={review.review_id} review={review} />
    ));

    var dropDown = (
      <select
        className={styles.dropDown}
        value={`${this.state.sort}`}
        onChange={(e) => this.handleSort(e)}
      >
        <option value="relevant">relevant</option>
        <option value="helpful">helpful</option>
        <option value="newest">newest</option>
      </select>
    );

    var total =
      this.state.reviews.length > 0 ? (
        <span>
          {`${this.state.reviews.length} reviews, sorted by `}
          {dropDown}
        </span>
      ) : (
        <div></div>
      );

    var moreReviews =
      this.state.display.length < this.filter(this.state.reviews).length ? (
        <button className={styles.reviewButtons} onClick={this.getMore}>
          MORE REVIEWS
        </button>
      ) : (
        <div></div>
      );

    return (
      <div>
        {total}
        <br />
        <br />
        <Search handleSearch={this.props.handleSearch} />
        <div className={styles.reviewsList}>{reviews}</div>
        {moreReviews}
        <AddReview name={this.props.name} meta={this.props.meta} />
      </div>
    );
  }
}

export default ReviewsList;

import React from "react";
import { render, screen } from "@testing-library/react";
import ReviewTile from "./ReviewTile.jsx";

describe("Review Tile Component", () => {
  it("Review Tile should allow users to recommend a review", () => {
    const { getByText } = render(<ReviewTile />);
    expect(getByText("Was this review helpful?")).
    toMatchInlineSnapshot(`
    <span>
      Was this review helpful?
    </span>
  `);
  });
});

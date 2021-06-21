import React from "react";
import { render, screen } from "@testing-library/react";
import ReviewsList from "./ReviewsList.jsx";

describe("ReviewsList Component", () => {
  it("ReviewsList should render an Add Review button", () => {
    const { getByText } = render(<ReviewsList />);
    const button = getByText("ADD A REVIEW +");
    expect(button).toBeTruthy();
  });
});
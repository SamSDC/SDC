import React from "react";
import { render, screen } from "@testing-library/react";
import QuestionList from "./QuestionList.jsx";

describe("QuestionList Component", () => {
  it("QuestionList should have a title",  () => {
    const { getByText } = render(<QuestionList />);
    expect(getByText("QUESTIONS & ANSWERS")).toMatchInlineSnapshot(`
      <div>
        QUESTIONS & ANSWERS
      </div>
    `);
  });

  it("QuestionList should render a button", () => {
    const { getByText } = render(<QuestionList />);
    const button = getByText("ADD QUESTIONS +");
    expect(button).toBeTruthy();
  })
});
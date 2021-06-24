import React from "react";
import { render, screen } from "@testing-library/react";
import SideBar from "./sidebar/SideBar";
import Checkout from './sidebar/Checkout'

describe("sideBar", () => {
  it("sideBar should have a some text",  () => {
    const { getByText } = render(<SideBar />);
    expect(getByText("Read all reviews")).toMatchInlineSnapshot(`
    <div>Read all reviews</div>
    `);
  });

  it("QuestionList should render a button", () => {
    const { getByText } = render(<Checkout />);
    const button = getByText("Select Size");
    expect(button).toBeTruthy();
  })
});
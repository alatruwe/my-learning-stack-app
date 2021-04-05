import React from "react";
import ReactDOM from "react-dom";
import Tech from "./Tech";
import renderer from "react-test-renderer";

describe(`Tch component`, () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Tech />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders the UI as expected", () => {
    const tree = renderer.create(<Tech />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

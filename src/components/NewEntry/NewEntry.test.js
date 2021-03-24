import React from "react";
import ReactDOM from "react-dom";
import NewEntry from "./NewEntry";
import renderer from "react-test-renderer";

describe(`NewEntry component`, () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<NewEntry />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders the UI as expected", () => {
    const tree = renderer.create(<NewEntry />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

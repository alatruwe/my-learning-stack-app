import React from "react";
import ReactDOM from "react-dom";
import EntryList from "./EntryList";
import renderer from "react-test-renderer";

describe(`EntryList component`, () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<EntryList />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders the UI as expected", () => {
    const tree = renderer.create(<EntryList />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

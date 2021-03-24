import React from "react";
import Entry from "./Entry";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

describe(`Entry component`, () => {
  it("renders the component by default", () => {
    const wrapper = shallow(<Entry />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
